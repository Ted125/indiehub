import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

});

class Error404Page extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                404
            </React.Fragment>
        );
    }
}

Error404Page.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Error404Page);
