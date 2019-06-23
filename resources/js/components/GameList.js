import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GameCard from './GameCard';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1)
    }
}));

export default class GameList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        var games = [];

        for(var i = 0; i < this.props.displayCount; i++){
            games.push(
                <Grid item xs={3} key={i}>
                    <GameCard />
                </Grid>
            );
        }

        return(
            <Grid container justify="center">
                <Grid container justify="space-between">
                    <Grid item xs={4}>
                        <Typography component="h1" variant="h5" color="inherit" gutterBottom>
                            {this.props.title}
                        </Typography>
                    </Grid>
                    <Grid container item xs={2} justify="flex-end">
                        <Button variant="outlined" className={useStyles.button}>
                            See More
                        </Button>
                    </Grid>
                </Grid>
                <Grid container item justify="flex-start">
                    {
                        (this.props.caption !== null) ?
                            <Typography variant="body1" color="textSecondary" paragraph>
                                {this.props.caption}
                            </Typography>
                            : ''
                    }
                </Grid>
                <Grid container justify="center" spacing={2}>
                    {games}
                </Grid>
            </Grid>
        );
    }
}

GameList.propTypes = {
    title: PropTypes.string.isRequired,
    caption: PropTypes.string,
    displayCount: PropTypes.number.isRequired
}
