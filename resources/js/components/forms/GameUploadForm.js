import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {DropzoneArea} from 'material-ui-dropzone'
import TagSelect from '../TagSelect';
import { apiEndpointResolver } from '../../helpers.js';

const styles = theme => ({

});

class GameUploadForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadEndpoint: apiEndpointResolver('/project/upload'),
            photoUploadEndpoint: apiEndpointResolver('/photo/store'),
            valueTitle: null,
            valueTagline: null,
            valueDescription: null,
            valueDownloadLink: null,
            valueTags: [],
            valueCoverPhoto: null,
            valueScreenshots: []
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <form className={classes.form} onSubmit={this.upload} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            name="title"
                            variant="outlined"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            onChange={this.setTitle}
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
                            onChange={this.setTagline}
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
                            onChange={this.setDescription}
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
                            onChange={this.setDownloadLink}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TagSelect auth={this.props.auth} handleChange={this.setTags} />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            onChange={this.setCoverPhoto}
                            dropzoneText="Cover Photo"
                            filesLimit={1}
                            maxFileSize={4000000}
                            acceptedFiles={['image/png', 'image/jpeg']}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DropzoneArea
                            onChange={this.setScreenshots}
                            dropzoneText="Screenshots (Max 10)"
                            filesLimit={4}
                            maxFileSize={16000000}
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

    setTitle = (e) => {
        this.setState({
            valueTitle: e.target.value
        });
    }

    setTagline = (e) => {
        this.setState({
            valueTagline: e.target.value
        });
    }

    setDescription = (e) => {
        this.setState({
            valueDescription: e.target.value
        });
    }

    setDownloadLink = (e) => {
        this.setState({
            valueDownloadLink: e.target.value
        });
    }

    setTags = (value) => {
        this.setState({
            valueTags: value
        });
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

    upload = (e) => {
        e.preventDefault();

        var formData = new FormData();
        formData.append('token', this.props.auth.authToken);
        formData.append('photo', this.state.valueCoverPhoto);

        axios
            .post(this.state.photoUploadEndpoint, formData)
            .then(response => {
                var path = response.data.path;

                if(path != null && typeof path != 'undefined'){
                    formData = new FormData();
                    formData.append('token', this.props.auth.authToken);
                    formData.append('categoryId', 1);
                    formData.append('title', this.state.valueTitle);
                    formData.append('tagline', this.state.valueTagline);
                    formData.append('description', this.state.valueDescription);
                    formData.append('fileUrl', this.state.valueDownloadLink);
                    formData.append('coverPhotoUrl', path);

                    this.state.valueTags.forEach((tag, index) => {
                        formData.append('tags[' + index + ']', tag.value);
                    });

                    this.state.valueScreenshots.forEach((photo, index) => {
                        formData.append('photos[' + index + ']', photo);
                    });

                    return axios
                        .post(this.state.uploadEndpoint, formData)
                        .then(response => {
                            var project = response.data.data;

                            if(project != null && typeof project != 'undefined'){
                                this.props.history.push('/profile/' + this.props.auth.id);
                            }
                        });
                }
            });
    }
}

GameUploadForm.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object
}

export default withRouter(withStyles(styles)(GameUploadForm));
