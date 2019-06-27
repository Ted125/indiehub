import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import Category from './Category';
import CommentForm from './forms/CommentForm';
import CommentList from './CommentList';
import TagList from './TagList';
import { apiEndpointResolver } from '../helpers.js';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500]
    },
    card: {
        flex: 1
    },
    cardActions: {
        padding:theme.spacing(1, 3, 1, 3)
    },
    commentCount: {
        marginLeft: theme.spacing(1)
    },
    likeCount: {
        marginLeft: theme.spacing(1)
    },
    media: {
        height: 250
    }
});

class GamePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            setExpanded: false,
            likeEndpoint: apiEndpointResolver('/entity/like'),
            unlikeEndpoint: apiEndpointResolver('/entity/unlike'),
            commentEndpoint: apiEndpointResolver('/entity/comment'),
            project: this.props.project,
            entity: this.props.project.entity
        };
    }

    render() {
        const { classes } = this.props;

        if(this.props.project == null || typeof this.props.project == 'undefined'){
            return (
                <React.Fragment />
            );
        }

        var likeState;

        if(this.state.entity.data.likes.data.length > 0 && this.state.entity.data.likes.data.map(like => like.userId).includes(this.props.auth.id)){
            likeState = (
                <IconButton size="small" color="primary" aria-label="Like" onClick={this.unlike}>
                    <ThumbUpIcon />
                    <Typography variant="body2" color="textSecondary" className={classes.likeCount}>
                        {this.state.entity.data.likeCount}
                    </Typography>
                </IconButton>
            );
        }else{
            likeState = (
                <IconButton size="small" color="default" aria-label="Like" onClick={this.like}>
                    <ThumbUpOutlinedIcon />
                    <Typography variant="body2" color="textSecondary" className={classes.likeCount}>
                        {this.state.entity.data.likeCount}
                    </Typography>
                </IconButton>
            );
        }

        return (
            <Card className={classes.card}>
                <CardHeader
                    action = {
                        <Category label={this.state.entity.data.category.data.name} />
                    }
                    avatar = {
                        <Avatar aria-label={this.state.entity.data.user.data.username} className={classes.avatar}>
                            {this.state.entity.data.user.data.firstName.charAt(0) + this.state.entity.data.user.data.lastName.charAt(0)}
                        </Avatar>
                    }
                    title = {
                        <Link href={'/profile/' + this.state.entity.data.user.data.id}>
                            <Typography variant="body1" color="primary">
                                {this.state.entity.data.user.data.firstName + ' ' + this.state.entity.data.user.data.lastName}
                            </Typography>
                        </Link>
                    }
                    subheader={<Moment format="MMM D, YYYY">{this.state.project.createdAt}</Moment>}
                />
                <CardActionArea onClick={this.openModal}>
                    <Link href={'/games/' + this.state.project.id} color="inherit" underline="none">
                        <CardMedia
                            className={classes.media}
                            image={this.state.project.coverPhotoUrl}
                            title={this.state.project.title}
                        />
                        <CardContent>
                            <Typography gutterBottom component="h2" variant="h5">
                                {this.state.project.title}
                            </Typography>
                            <Typography>
                                {this.state.project.tagline}
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <TagList tags={this.state.entity.data.tags.data} />
                <CardActions className={classes.cardActions}>
                    <Grid container justify="flex-start">
                        <Grid item xs={4} md={2}>
                            {likeState}
                        </Grid>
                        <Grid item xs={4} md={2}>
                            <IconButton
                                size="small"
                                color="default"
                                aria-label="Comment"
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                            >
                                <ModeCommentOutlinedIcon />
                                <Typography variant="body2" color="textSecondary" className={classes.commentCount}>
                                    {this.state.entity.data.comments.data.length}
                                </Typography>
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Divider light />
                    <CardContent>
                        <CommentForm handleSubmit={this.handleCommentFormSubmit}/>
                        <CommentList comments={this.state.entity.data.comments.data} />
                    </CardContent>
                </Collapse>
            </Card>
        );
    }

    handleExpandClick = () => {
        this.setState(prevState => ({
            expanded: !prevState.expanded
        }));
    }

    like = () => {
        var endpoint = this.state.likeEndpoint + '/' + this.props.project.id;

        var formData = new FormData();
        formData.append('token', this.props.auth.authToken);

        axios
            .post(endpoint, formData)
            .then(response => {
                let entity = response.data.data;

                if(entity != null && typeof entity != 'undefined'){
                    this.setState({
                        entity: { data: entity }
                    });
                }
            });
    }

    unlike = () => {
        var endpoint = this.state.unlikeEndpoint + '/' + this.props.project.id;

        var formData = new FormData();
        formData.append('token', this.props.auth.authToken);

        axios
            .post(endpoint, formData)
            .then(response => {
                let entity = response.data.data;

                if(entity != null && typeof entity != 'undefined'){
                    this.setState({
                        entity: { data: entity }
                    });
                }
            });
    }

    handleCommentFormSubmit = (e, comment) => {
        e.preventDefault();

        var endpoint = this.state.commentEndpoint + '/' + this.props.project.id;

        var formData = new FormData();
        formData.append('comment', comment);
        formData.append('token', this.props.auth.authToken);

        axios
            .post(endpoint, formData)
            .then(response => {
                let entity = response.data.data;

                if(entity != null && typeof entity != 'undefined'){
                    this.setState({
                        entity: { data: entity }
                    });
                }
            });
    }
}

GamePost.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object,
    project: PropTypes.object
}

export default withStyles(styles)(GamePost);
