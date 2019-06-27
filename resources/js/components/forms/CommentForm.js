import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    textField: {
        flex: 1,
        width: '100%'
    }
});

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueComment: ''
        };
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <form onSubmit={this.submit} className={classes.root}>
                    <TextField
                        id="outlined-textarea"
                        className={classes.textField}
                        label="Add a Comment..."
                        placeholder="Add a comment..."
                        multiline
                        margin="normal"
                        variant="outlined"
                        onChange={this.setComment}
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
                </form>
            </React.Fragment>
        );
    }

    setComment = (e) => {
        this.setState({
            valueComment: e.target.value
        });
    }

    submit = (e) => {
        e.preventDefault();
        var comment = this.state.valueComment;
        this.setState({
            valueComment: ''
        });
        this.props.handleSubmit(e, comment);
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func
}

export default withStyles(styles)(CommentForm);
