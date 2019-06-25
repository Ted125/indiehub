import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header />
                <Container maxWidth="md" className={classes.container}>
                    <Paper className={classes.paper}>
                        <CoverPhoto src="/img/Fez.jpg" />
                        <Grid container justify="space-between" className={classes.details}>
                            <Grid item container justify="flex-start">
                                <Grid item container direction="column">
                                    <Grid item container justify="space-between">
                                        <Grid item xs={12} md={6}>
                                            <Typography variant="h4" gutterBottom align="left">
                                                Fez
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Button
                                                color="primary"
                                                fullWidth
                                                size="small"
                                                variant="contained"
                                            >
                                                Download
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item container justify="space-between">
                                        <Grid item container xs={12} md={3} justify="flex-start">
                                            <Typography color="textSecondary" variant="caption">
                                                Last updated on January 1, 2019
                                            </Typography>
                                        </Grid>
                                        <Grid item container xs={12} md={6} justify="flex-end">
                                            <Grid container justify="space-between">
                                                <Grid item xs={11}>
                                                    <Link href="#">
                                                        <Typography variant="body2" color="textSecondary" align="right">
                                                            Indiemesh
                                                        </Typography>
                                                    </Link>
                                                </Grid>
                                                <Grid item xs={1}>
                                                    <Avatar aria-label="Indiemesh" className={classes.avatar}>
                                                        IM
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
                                <Category label="2D Game" />
                            </Grid>
                        </Grid>
                        <Divider />
                        <Typography color="textSecondary" variant="subtitle1" className={classes.details} align="center">
                            Fez is a two-dimensional (2D) puzzle platform game set in a three-dimensional (3D) world.
                        </Typography>
                        <Carousel>
                            <div>
                                <img src="img/Fez_1.jpg" />
                            </div>
                            <div>
                                <img src="img/Fez_2.jpg" />
                            </div>
                            <div>
                                <img src="img/Fez_3.jpg" />
                            </div>
                        </Carousel>
                        <Typography color="textSecondary" variant="body1" className={classes.details} align="justify" paragraph>
                            Fez is a two-dimensional (2D) puzzle platform game set in a three-dimensional (3D) world. The player-character Gomez lives peacefully on a 2D plane until he receives a red fez and witnesses the breakup of a giant, golden hexahedron that tears the fabric of spacetime and reveals a third dimension. After the game appears to glitch, reset, and reboot, the player can rotate between four 2D views of the 3D world, as four sides around a cube-like space. This rotation mechanic reveals new paths through the levels by connecting otherwise inaccessible platforms, and is the basis of Fez's puzzles. For example, floating platforms become a solid road, discontinuous ladders become whole, and platforms that move along a track stay on course. The object of the game is to collect cubes and cube fragments, which accrete to restore order to the universe. In search of these cubes, Gomez traverses the game environment by jumping between ledges. Other platforming elements change with the level themes, including crates that activate switches, bombs that reveal passages, and pistons that launch Gomez airborne.
                        </Typography>
                        <TagList />
                        <Grid container justify="flex-start" className={classes.details}>
                            <Grid item xs={1}>
                                <IconButton size="small" color="default" aria-label="Like">
                                    <ThumbUpOutlinedIcon />
                                    <Typography variant="body2" color="textSecondary" className={classes.likeCount}>
                                        100
                                    </Typography>
                                </IconButton>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                    size="small"
                                    color="default"
                                    aria-label="Comment"
                                >
                                    <ModeCommentOutlinedIcon />
                                    <Typography variant="body2" color="textSecondary" className={classes.commentCount}>
                                        10
                                    </Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container direction="column" justify="center" spacing={2} className={classes.details}>
                            <Grid item>
                                <CommentForm />
                            </Grid>
                            <Grid item>
                                <CommentList />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

GameDetailsPage.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GameDetailsPage);
