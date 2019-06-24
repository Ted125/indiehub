import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    textField: {
        flex: 1,
        width: '100%'
    }
});

class CommentForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <TextField
                    id="outlined-textarea"
                    className={classes.textField}
                    label="Add a Comment..."
                    placeholder="Add a comment..."
                    multiline
                    margin="normal"
                    variant="outlined"
                />
                <Grid container justify="flex-end">
                    <Grid item xs={12} md={3}>
                        <Button
                            color="primary"
                            fullWidth
                            type="submit"
                            variant="outlined"
                        >
                            Comment
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CommentForm);
