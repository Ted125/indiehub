import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserListItem from './UserListItem';

const styles = theme => ({
    paper: {
        flex: 1
    }
});

class FollowerList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        if(this.props.user == null){
            return (
                <React.Fragment />
            );
        }

        return (
            <Paper className={classes.paper}>
                <List component="nav" aria-label="Follow Suggestions">
                    {
                        this.props.user.followers.data.map((value, index) => {
                            return <UserListItem key={value.id} auth={this.props.auth} user={value} />
                        })
                    }
                </List>
            </Paper>
        );
    }
}

FollowerList.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object,
    user: PropTypes.object
}

export default withStyles(styles)(FollowerList);
