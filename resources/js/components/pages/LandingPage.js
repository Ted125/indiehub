import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Header from '../layouts/Header';
import FeaturedGame from '../FeaturedGame';
import Footer from '../layouts/Footer';
import GameList from '../GameList';

const styles = theme => ({
    lists: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(10)
    }
});

class LandingPage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <Header user={this.props.user} />
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
                <Footer />
            </React.Fragment>
        );
    }
}

LandingPage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(LandingPage);
