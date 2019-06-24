import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid  from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Comment from './Comment';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
});

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify-content="flex-start" direction="column" spacing={2} className={classes.root}>
                <Grid item>
                    <Comment
                        text="Great game! I can't wait to see more from this. Good luck!"
                    />
                </Grid>
                <Grid item>
                    <Comment
                        text="Wow, cool post! Thanks for sharing!"
                    />
                </Grid>
                <Grid item>
                    <Comment
                        text="Hello! How may I contact you? I am trying to build a similar game. I need help with something. Please pm me. Thanks."
                    />
                </Grid>
            </Grid>
        );
    }
}

CommentList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CommentList);
