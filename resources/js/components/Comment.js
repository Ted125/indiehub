import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500],
        width: 32,
        height: 32,
        marginRight: theme.spacing(1)
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
                        <Avatar aria-label={this.props.comment.user.data.firstName + ' ' + this.props.comment.user.data.lastName} className={classes.avatar}>
                            {this.props.comment.user.data.firstName.charAt(0) + this.props.comment.user.data.lastName.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item container xs={11} justify="flex-start" spacing={1}>
                        <Grid item container xs={12} justify="space-between">
                            <Grid item container xs={4} justify="flex-start">
                                <Link href={'/profile/' + this.props.comment.user.data.id}>
                                    <Typography variant="body1" color="primary">
                                        {this.props.comment.user.data.firstName + ' ' + this.props.comment.user.data.lastName}
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item container xs={4} justify="flex-end">
                                <Typography variant="body2" color="textSecondary">
                                    <Moment format="MMM D, YYYY">{this.props.comment.createdAt}</Moment>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} container justify="flex-start">
                            <Typography paragraph className={classes.comment}>
                                 {this.props.comment.comment}
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
    comment: PropTypes.object
}

export default withStyles(styles)(Comment);
