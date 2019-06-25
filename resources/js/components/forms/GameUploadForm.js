import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {DropzoneArea} from 'material-ui-dropzone'
import TagSelect from '../TagSelect';

const styles = theme => ({

});

class GameUploadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valueScreenshots: [],
            valueCoverPhoto: null
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="tagline"
                            variant="outlined"
                            required
                            fullWidth
                            id="tagline"
                            label="Tagline"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="description"
                            variant="outlined"
                            required
                            fullWidth
                            id="description"
                            label="Description"
                            multiline
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="filePath"
                            variant="outlined"
                            required
                            fullWidth
                            id="filePath"
                            label="Download Link"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TagSelect />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            onChange={this.setCoverPhoto}
                            dropzoneText="Cover Photo"
                            filesLimit={1}
                            maxFileSize={5000000}
                            acceptedFiles={['image/png', 'image/jpeg']}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            onChange={this.setScreenshots}
                            dropzoneText="Screenshots (Max 10)"
                            filesLimit={10}
                            maxFileSize={50000000}
                            acceptedFiles={['image/png', 'image/jpeg']}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Upload
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }

    setCoverPhoto = (files) => {
        this.setState({
            valueCoverPhoto: files[0]
        });
    }

    setScreenshots = (files) => {
        this.setState({
            valueScreenshots: files
        });
    }
}

GameUploadForm.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(GameUploadForm);
