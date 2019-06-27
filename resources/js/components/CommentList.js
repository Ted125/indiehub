import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid  from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Comment from './Comment';

const styles = theme => ({
    root: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        padding: theme.spacing(3)
    }
});

class CommentList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        var comments = []

        this.props.comments.forEach(comment => {
            comments.push(<Comment key={comment.id} comment={comment}></Comment>);
        });

        return (
            <Grid container justify-content="flex-start" direction="column" spacing={2} className={classes.root}>
                {comments}
            </Grid>
        );
    }
}

CommentList.propTypes = {
    classes: PropTypes.object.isRequired,
    comments: PropTypes.array
}

export default withStyles(styles)(CommentList);
