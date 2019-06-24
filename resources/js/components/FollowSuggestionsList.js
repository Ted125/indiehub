import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserListItem from './UserListItem';

const styles = theme => ({

});

class FollowSuggestionsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
                <CardContent>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Indies you may know
                    </Typography>
                    <List component="nav" aria-label="Follow Suggestions">
                        <UserListItem />
                        <UserListItem />
                        <UserListItem />
                    </List>
                </CardContent>
            </Card>
        );
    }
}

FollowSuggestionsList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FollowSuggestionsList);
