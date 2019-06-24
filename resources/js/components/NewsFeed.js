import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import GamePost from './GamePost';

export default class NewsFeed extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid container direction="column" justify="flex-start" spacing={3}>
                <Grid item>
                    <GamePost />
                </Grid>
                <Grid item>
                    <GamePost />
                </Grid>
                <Grid item>
                    <GamePost />
                </Grid>
            </Grid>
        );
    }
}
