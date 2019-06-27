import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import UserListItem from './UserListItem';
import { apiEndpointResolver } from '../helpers.js';

const styles = theme => ({

});

class FollowSuggestionsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: apiEndpointResolver('/user/list'),
            suggestions: null
        }
    }

    render() {
        const { classes } = this.props;

        if(this.props.auth != null && this.state.suggestions == null){
            this.loadSuggestions();
        }

        if(this.state.suggestions == null){
            return (
                <React.Fragment />
            );
        }

        var suggestions = []

        this.state.suggestions.forEach(suggestion => {
            suggestions.push(<UserListItem key={suggestion.id} auth={this.props.auth} user={suggestion} />);
        });

        return (
            <Card>
                <CardContent>
                    <Typography variant="body1" color="textSecondary" gutterBottom>
                        Indies you may know
                    </Typography>
                    <List component="nav" aria-label="Follow Suggestions">
                        {suggestions}
                    </List>
                </CardContent>
            </Card>
        );
    }

    loadSuggestions = () => {
        var endpoint = this.state.endpoint + '?token=' + this.props.auth.authToken;

        axios
            .get(endpoint)
            .then(response => {
                this.setState({
                    suggestions: response.data.data
                });
            });
    }
}

FollowSuggestionsList.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object
}

export default withStyles(styles)(FollowSuggestionsList);
