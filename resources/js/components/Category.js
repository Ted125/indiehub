import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    chip: {
        margin: theme.spacing(1)
    }
});

class Category extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Chip
                label={this.props.label}
                className={classes.chip}
                color="primary"
            />
        );
    }
}

Category.propTypes = {
    classes: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired
}

export default withStyles(styles)(Category);
