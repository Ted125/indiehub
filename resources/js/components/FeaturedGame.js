import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(img/Fez.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0
        }
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    }
}));

export default function FeaturedGame(){
    const classes = useStyles();

    return (
        <Grid container justify="center" className={classes.mainFeaturedPost}>
            <div className={classes.overlay} />
            <Grid container>
                <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        FEZ
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                        Fez is a two-dimensional (2D) puzzle platform game set in a three-dimensional (3D) world.
                    </Typography>
                    <Link color="inherit" variant="subtitle1" href="#">
                        Learn more...
                    </Link>
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}
