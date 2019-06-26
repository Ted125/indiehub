import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import CoverPhoto from '../CoverPhoto';
import NewsFeed from '../NewsFeed';
import { apiEndpointResolver } from '../../helpers.js';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500],
        width: 128,
        height: 128,
        position: 'relative',
        marginTop: -64
    },
    bio: {
        padding: theme.spacing(2)
    },
    container: {
        marginBottom: theme.spacing(5)
    },
    followIcon: {
        marginRight: theme.spacing(1)
    },
    paper: {
        marginBottom: theme.spacing(3)
    }
});

class ProfilePage extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'games',
            endpoint: apiEndpointResolver('/user'),
            user: null
        };
    }

    render() {
        const { classes } = this.props;

        if(this.props.user != null && this.state.user == null){
            this.loadUser(this.props.match.params.id, this.props.user.authToken);
        }

        if(this.props.user == null || this.state.user == null){
            return (
                <React.Fragment />
            )
        }

        console.log(this.props);

        return (
            <React.Fragment>
                <Header user={this.props.user} />
                <Container maxWidth="md" className={classes.container}>
                    <Paper className={classes.paper}>
                        <CoverPhoto src="/img/Stardew Valley Cover.jpg" />
                        <Grid container justify="center">
                            <Grid item>
                                <Avatar aria-label="Indiemesh" className={classes.avatar}>
                                    {this.state.user.firstName.charAt(0) + this.state.user.lastName.charAt(0)}
                                </Avatar>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justify="center" spacing={1} className={classes.bio}>
                            <Grid item container justify="center">
                                <Grid item container direction="column">
                                    <Grid item container justify="center">
                                        <Typography variant="h5">
                                            {this.state.user.firstName + ' ' + this.state.user.lastName}
                                        </Typography>
                                    </Grid>
                                    <Grid item container justify="center">
                                        <Typography color="textSecondary" variant="caption" gutterBottom>
                                            Game Developer
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item container justify="center">
                                <Button
                                    color="primary"
                                    size="small"
                                    variant="contained"
                                >
                                    <RssFeedIcon className={classes.followIcon} />
                                    Follow
                                </Button>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Tabs
                            value={this.state.currentTab}
                            onChange={this.changeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab value='games' label="Games (3)" />
                            <Tab value='followers' label="Followers (100)" />
                            <Tab value='following' label="Following (10)" />
                        </Tabs>
                    </Paper>

                    { this.state.currentTab == 'games' && (
                        <Grid container justify="center">
                            <NewsFeed />
                        </Grid>
                    ) }
                </Container>
                <Footer />
            </React.Fragment>
        );
    }

    changeTab = (event, newValue) => {
        this.setState(prevState => ({
            currentTab: newValue
        }));
    }

    loadUser = (id, token) => {
        var endpoint = this.state.endpoint + '/' + id + '?token=' + token;
        console.log(endpoint);
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

ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(ProfilePage);
