import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500],
        width: 32,
        height: 32
    },
    comment: {
        flex: 1
    }
});

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container justify="space-between" spacing={2}>
                    <Grid item container xs={1} justify="flex-start">
                        <Avatar aria-label="Indiemesh" className={classes.avatar}>
                            IM
                        </Avatar>
                    </Grid>
                    <Grid item container xs={11} justify="flex-start" spacing={1}>
                        <Grid item container xs={12} justify="space-between">
                            <Grid item container xs={4} justify="flex-start">
                                <Typography variant="body1" color="primary">
                                    Indiemesh
                                </Typography>
                            </Grid>
                            <Grid item container xs={4} justify="flex-end">
                                <Typography variant="body2" color="textSecondary">
                                    January 1, 2019
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container justify="flex-start">
                            <Typography paragraph className={classes.comment}>
                                 {this.props.text}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

Comment.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
}

export default withStyles(styles)(Comment);
