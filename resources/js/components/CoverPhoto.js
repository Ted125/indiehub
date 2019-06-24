import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

const styles = themes => ({
    media: {
        height: 250
    }
});

class CoverPhoto extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <CardMedia
                className={classes.media}
                image={this.props.src}
                title="Cover"
            />
        );
    }
}

CoverPhoto.propTypes = {
    classes: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired
}

export default withStyles(styles)(CoverPhoto);
