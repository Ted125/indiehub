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
import { apiEndpointResolver } from '../../helpers.js';

const styles = theme => ({
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    }
});

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            profileEndpoint: apiEndpointResolver('/user'),
            user: null
        }
    }

    render(){
        const { classes } = this.props;

        if(this.props.user != null && this.state.user == null){
            this.loadUser(this.props.user.id, this.props.user.authToken);
        }

        if(this.props.user == null || this.state.user == null){
            return (
                <React.Fragment />
            );
        }

        return (
            <React.Fragment>
                <Header user={this.props.user} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container direction="row" justify="center" spacing={5}>
                        <Grid item xs={12} md={3}>
                            <FeedNav auth={this.props.user} />
                        </Grid>
                        <Grid item container xs={12} md={5} justify="center">
                            <NewsFeed auth={this.props.user} userIds={this.state.user.following.data} emptyMessage={'Start following other indies!'} emptyMessageCover={'/img/feed_empty.png'} />
                        </Grid>
                        <Grid item container xs={12} md={4} direction="column" spacing={3}>
                            <Grid item>
                                <FollowSuggestionsList auth={this.props.user} showFollowButton="false" />
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

    loadUser = (id, token) => {
        var endpoint = this.state.profileEndpoint + '/' + id + '?token=' + token;

        axios
            .get(endpoint)
            .then(response => {
                let user = response.data.data;

                if(user !== null && typeof user !== 'undefined'){
                    this.setState({
                        user: user
                    });
                }
            });
    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(HomePage);
