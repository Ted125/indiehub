import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500]
    },
    card: {
        flex: 1
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
            setExpanded: false
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    action = {
                        <Category label="2D Game" />
                    }
                    avatar = {
                        <Avatar aria-label="Indiemesh" className={classes.avatar}>
                            IM
                        </Avatar>
                    }
                    title = {
                        <Typography variant="body1" color="primary">
                            Indiemesh
                        </Typography>
                    }
                    subheader="January 1, 2019"
                />
                <CardActionArea onClick={this.openModal}>
                    <Link href="/games" color="inherit" underline="none">
                        <CardMedia
                            className={classes.media}
                            image="/img/Fez.jpg"
                            title="Fez"
                        />
                        <CardContent>
                            <Typography gutterBottom component="h2" variant="h5">
                                Fez
                            </Typography>
                            <Typography>
                                Fez is a two-dimensional (2D) puzzle platform game set in a three-dimensional (3D) world.
                            </Typography>
                        </CardContent>
                    </Link>
                </CardActionArea>
                <TagList />
                <CardActions>
                    <Grid container justify="flex-start">
                        <Grid item xs={2}>
                            <IconButton size="small" color="default" aria-label="Like">
                                <ThumbUpOutlinedIcon />
                                <Typography variant="body2" color="textSecondary" className={classes.likeCount}>
                                    100
                                </Typography>
                            </IconButton>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton
                                size="small"
                                color="default"
                                aria-label="Comment"
                                onClick={this.handleExpandClick}
                                aria-expanded={this.state.expanded}
                            >
                                <ModeCommentOutlinedIcon />
                                <Typography variant="body2" color="textSecondary" className={classes.commentCount}>
                                    10
                                </Typography>
                            </IconButton>
                        </Grid>
                    </Grid>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Divider light />
                    <CardContent>
                        <CommentForm />
                        <CommentList />
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
}

GamePost.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GamePost);
