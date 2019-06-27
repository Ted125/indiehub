import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import { Carousel } from 'react-responsive-carousel';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Category from '../Category';
import CommentForm from '../forms/CommentForm';
import CommentList from '../CommentList';
import CoverPhoto from '../CoverPhoto';
import TagList from '../TagList';
import { apiEndpointResolver } from '../../helpers.js';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500],
        width: 16,
        height: 16,
        marginLeft: theme.spacing(1)
    },
    details: {
        padding: theme.spacing(3, 2, 3, 2)
    },
    paper: {
        marginBottom: theme.spacing(3)
    }
});

class GameDetailsPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectEndpoint: apiEndpointResolver('/project'),
            likeEndpoint: apiEndpointResolver('/entity/like'),
            unlikeEndpoint: apiEndpointResolver('/entity/unlike'),
            commentEndpoint: apiEndpointResolver('/entity/comment'),
            project: null,
            entity: null
        }
    }

    render() {
        const { classes } = this.props;

        if(this.props.auth != null && this.state.project == null){
            this.loadGame();
        }

        if(this.props.auth == null || this.state.project == null){
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
            <React.Fragment>
                <Header user={this.props.auth} />
                <Container maxWidth="md" className={classes.container}>
                    <Paper className={classes.paper}>
                        <CoverPhoto src={this.state.project.coverPhotoUrl}/>
                        <Grid container justify="space-between" className={classes.details}>
                            <Grid item container justify="flex-start">
                                <Grid item container direction="column">
                                    <Grid item container justify="space-between">
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="h4" gutterBottom align="left">
                                                {this.state.project.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Button
                                                color="primary"
                                                fullWidth
                                                size="small"
                                                variant="contained"
                                                href={this.state.project.fileUrl}
                                            >
                                                Download
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item container justify="space-between">
                                        <Grid item container xs={12} md={3} justify="flex-start">
                                            <Typography color="textSecondary" variant="caption">
                                                Last updated on <Moment format="MMM D, YYYY">{this.state.project.createdAt}</Moment>
                                            </Typography>
                                        </Grid>
                                        <Grid item container xs={12} md={6} justify="flex-end">
                                            <Grid container justify="space-between">
                                                <Grid item xs={11}>
                                                    <Link href="#">
                                                        <Typography variant="body2" color="textSecondary" align="right">
                                                            {this.state.entity.data.user.data.firstName + ' ' + this.state.entity.data.user.data.lastName}
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Avatar aria-label="Indiemesh" className={classes.avatar}>
                                                        {this.state.entity.data.user.data.firstName.charAt(0) + this.state.entity.data.user.data.lastName.charAt(0)}
                                                    </Avatar>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justify="center" className={classes.details}>
                            <Grid item>
                                <Category label={this.state.entity.data.category.data.name} />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Typography color="textSecondary" variant="subtitle1" className={classes.details} align="center">
                            {this.state.project.tagline}
                        </Typography>
                        <Carousel>
                            {this.state.entity.data.photos.data.map(photo => {
                                return (
                                    <div key={photo.id}>
                                        <img src={photo.fileUrl} />
                                    </div>
                                )
                            })}
                        </Carousel>
                        <Typography color="textSecondary" variant="body1" className={classes.details} align="justify" paragraph>
                            {this.state.project.description}
                        </Typography>
                        <TagList tags={this.state.entity.data.tags.data} />
                        <Grid container justify="flex-start" className={classes.details}>
                            <Grid item xs={1}>
                                {likeState}
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                    size="small"
                                    color="default"
                                    aria-label="Comment"
                                >
                                    <ModeCommentOutlinedIcon />
                                    <Typography variant="body2" color="textSecondary" className={classes.commentCount}>
                                        {this.state.entity.data.comments.data.length}
                                    </Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container direction="column" justify="center" spacing={2} className={classes.details}>
                            <Grid item>
                                <CommentForm handleSubmit={this.handleCommentFormSubmit}/>
                            </Grid>
                            <Grid item>
                                <CommentList comments={this.state.entity.data.comments.data} />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }

    loadGame = () => {
        var endpoint = this.state.projectEndpoint + '/' + this.props.match.params.id + '?token=' + this.props.auth.authToken;

        axios
            .get(endpoint)
            .then(response => {
                let game = response.data.data;

                if(game !== null && typeof game !== 'undefined'){
                    this.setState({
                        project: game,
                        entity: game.entity
                    });
                }
            });
    }

    like = () => {
        var endpoint = this.state.likeEndpoint + '/' + this.props.match.params.id;

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
        var endpoint = this.state.unlikeEndpoint + '/' + this.props.match.params.id;

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

        var endpoint = this.state.commentEndpoint + '/' + this.props.match.params.id;

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

GameDetailsPage.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object
}

export default withStyles(styles)(GameDetailsPage);
