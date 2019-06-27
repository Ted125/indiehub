import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GamePost from './GamePost';
import { apiEndpointResolver } from '../helpers.js';

const styles = theme => ({
    card: {
        flex: 1,
        height: 'auto',
        maxHeight: 325,
        paddingBottom: 10
    },
    media: {
        height: 250
    }
});

class NewsFeed extends Component {
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
        const {classes} = this.props;

        if(this.props.auth != null && this.props.userIds != null && this.state.posts.length == 0){
            this.loadPosts();
        }

        if(this.state.posts.length == 0){
            return (
                <Card className={classes.card}>
                    {
                        this.props.emptyMessageCover != null ? <CardMedia
                            className={classes.media}
                            image={this.props.emptyMessageCover}
                            title={this.props.emptyMessage}
                        /> : <React.Fragment />
                    }
                    <CardContent>
                        <Typography color="textSecondary" variant="h5" align="center">
                            {this.props.emptyMessage}
                        </Typography>
                    </CardContent>
                </Card>
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
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object,
    userIds: PropTypes.array,
    emptyMessage: PropTypes.string,
    emptyMessageCover:PropTypes.string
}

export default withStyles(styles)(NewsFeed);
