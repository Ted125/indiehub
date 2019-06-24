import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RssFeedIcon from '@material-ui/icons/RssFeed';

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
    }

    render() {
        const { classes } = this.props;

        return (
            <ListItem>
                <Grid container justify="space-between">
                    <Grid item xs={2}>
                        <Avatar aria-label="Indiemesh" className={classes.avatar}>
                            IM
                        </Avatar>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body2" color="textSecondary">
                            Indiemesh
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton
                            size="small"
                            color="default"
                            aria-label="Follow"
                        >
                            <RssFeedIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </ListItem>
        );
    }
}

UserListItem.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserListItem);
