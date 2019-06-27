import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { apiEndpointResolver } from '../helpers.js';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500],
        width: 24,
        height: 24
    },
});

class UserListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            followEndpoint: apiEndpointResolver('/user/follow'),
            unfollowEndpoint: apiEndpointResolver('/user/unfollow'),
            profileEndpoint: apiEndpointResolver('/user'),
            user: this.props.user
        }
    }

    render() {
        const { classes } = this.props;

        if(this.state.user == null){
            return (
                <React.Fragment />
            );
        }

        if(this.state.user.followers == null && typeof this.state.user.followers == 'undefined'){
            this.loadUser(this.state.user.id, this.props.auth.authToken);
        }

        var followState;

        if(this.state.user.id == this.props.auth.id){
            followState = (
                <React.Fragment />
            );
        }else if(this.state.user.followers != null && typeof this.state.user.followers != 'undefined' && this.state.user.followers.data.map(user => user.id).includes(this.props.auth.id)){
            followState = (
                <Button
                    color="primary"
                    size="small"
                    variant="outlined"
                    onClick={() => {this.unfollowUser(this.state.user.id)}}
                >
                    <RssFeedIcon />
                    Unfollow
                </Button>
            );
        }else{
            followState = (
                <Button
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={() => {this.followUser(this.state.user.id)}}
                >
                    <RssFeedIcon />
                    Follow
                </Button>
            );
        }

        return (
            <ListItem>
                <Grid container justify="space-between" spacing={1}>
                    <Grid item xs={2} md={1}>
                        <Avatar aria-label="Indiemesh" className={classes.avatar}>
                            {this.state.user.firstName.charAt(0) + this.state.user.lastName.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={6} md={8}>
                        <Link color="inherit" variant="body2" href={'/profile/' + this.props.user.id}>
                            <Typography variant="body2" color="textSecondary" align="left">
                                {this.state.user.firstName + ' ' + this.state.user.lastName}
                            </Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4} md={2}>
                        {(this.props.showFollowButton) ? followState : <React.Fragment/>}
                    </Grid>
                </Grid>
            </ListItem>
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

    followUser = (id) => {
        var endpoint = this.state.followEndpoint + '/' + id;

        var formData = new FormData();
        formData.append('token', this.props.user.authToken);

        axios
            .post(endpoint, formData)
            .then(response => {
                let user = response.data.data;

                if(user !== null && typeof user !== 'undefined'){
                    this.setState({
                        user: user
                    });
                }
            });
    }

    unfollowUser = (id) => {
        var endpoint = this.state.unfollowEndpoint + '/' + id;

        var formData = new FormData();
        formData.append('token', this.props.user.authToken);

        axios
            .post(endpoint, formData)
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

UserListItem.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object,
    user: PropTypes.object,
    showFollowButton: PropTypes.bool
}

export default withStyles(styles)(UserListItem);
