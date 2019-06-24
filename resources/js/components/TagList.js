import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
    }
});

class TagList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Tag label="Unity" />
                <Tag label="Platformer" />
                <Tag label="Puzzle" />
                <Tag label="PC" />
                <Tag label="Pixel Art" />
                <Tag label="Solo dev" />
                <Tag label="Indie" />
            </div>
        );
    }
}

TagList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TagList);
