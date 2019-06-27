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
                { this.props.tags.map(tag => {
                    return(<Tag key={tag.id} label={tag.name} />)
                }) }
            </div>
        );
    }
}

TagList.propTypes = {
    classes: PropTypes.object.isRequired,
    tags: PropTypes.array
}

export default withStyles(styles)(TagList);
