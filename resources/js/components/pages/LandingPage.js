import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Header from '../layouts/Header';
import { makeStyles } from '@material-ui/core/styles';
import FeaturedGame from '../FeaturedGame';
import GameList from '../GameList';

const useStyles = makeStyles(theme => ({
    lists: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(10)
    }
}));

export default function LandingPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Header />
            <FeaturedGame />
            <Container maxWidth="lg" className={classes.lists}>
                <Grid container spacing={5} direction="column">
                    <Grid item>
                        <GameList title="Hot Games" caption="Discover what's trending in the community" displayCount={8} />
                    </Grid>
                    <Grid item>
                        <GameList title="New Games" caption="Discover new releases" displayCount={8} />
                    </Grid>
                    <Grid item>
                        <GameList title="Unity Games" caption="Games made with Unity engine" displayCount={4} />
                    </Grid>
                    <Grid item>
                        <GameList title="Unreal Games" caption="Games made with Unreal engine" displayCount={4} />
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
}
