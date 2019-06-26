import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import FeedNav from '../FeedNav';
import FollowSuggestionsList from '../FollowSuggestionsList';
import NewsFeed from '../NewsFeed';
import SidebarAd from '../SidebarAd';

const styles = theme => ({
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    }
});

class HomePage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Header user={this.props.user} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container direction="row" justify="center" spacing={5}>
                        <Grid item xs={12} md={3}>
                            <FeedNav />
                        </Grid>
                        <Grid item container xs={12} md={5} justify="center">
                            <NewsFeed />
                        </Grid>
                        <Grid item container xs={12} md={4} direction="column" spacing={3}>
                            <Grid item>
                                <FollowSuggestionsList />
                            </Grid>
                            <Grid item>
                                <SidebarAd />
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(HomePage);
