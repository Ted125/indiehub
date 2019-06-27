import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import GamePost from './GamePost';
import { apiEndpointResolver } from '../helpers.js';

export default class NewsFeed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: apiEndpointResolver('/project/list'),
            userIds: this.props.userIds,
            recentFirst: true,
            lastProjectId: 0,
            posts: []
        }
    }

    render() {
        if(this.props.auth != null && this.props.userIds != null && this.state.posts.length == 0){
            this.loadPosts();
        }

        if(this.state.posts.length == 0){
            return (
                <React.Fragment />
            );
        }

        var posts = [];

        this.state.posts.forEach(post => {
            posts.push(
                <Grid item key={post.id}>
                    <GamePost auth={this.props.auth} project={post} />
                </Grid>
            );
        })

        return (
            <Grid container direction="column" justify="flex-start" spacing={3}>
                {posts}
            </Grid>
        );
    }

    loadPosts = () => {
        var endpoint = this.state.endpoint +
                        '?token=' + this.props.auth.authToken +
                        '&recentFirst=' + this.state.recentFirst +
                        '&lastProjectId=' + this.state.lastProjectId;

        this.state.userIds.forEach((id, index) => {
            endpoint += '&userIds[' + index + ']=' + id;
        });

        axios
            .get(endpoint)
            .then(response =>{
                this.setState({
                    posts: response.data.data
                });
            });
    }
}

NewsFeed.propTypes = {
    auth: PropTypes.object,
    userIds: PropTypes.array
}
