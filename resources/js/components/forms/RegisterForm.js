import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { apiEndpointResolver } from '../../helpers.js';

const styles = theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
});

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: apiEndpointResolver('/user/register'),
            firstName: '',
            lastName: '',
            birthdate: '',
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            termsCheckbox: false
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.form} onSubmit={this.onSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="given-name"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            onChange={this.onChangeFirstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            autoComplete="family-name"
                            name="lastName"
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            onChange={this.onChangeLastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="bday"
                            name="birthdate"
                            variant="outlined"
                            type="date"
                            required
                            fullWidth
                            id="birthdate"
                            label="Birthdate"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={this.onChangeBirthdate}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            onChange={this.onChangeUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            type="email"
                            onChange={this.onChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="new-password"
                            name="password"
                            variant="outlined"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            onChange={this.onChangePassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="new-password"
                            name="confirmPassword"
                            variant="outlined"
                            required
                            fullWidth
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            onChange={this.onChangePasswordConfirmation}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={this.termsCheckbox}
                                    color="primary"
                                    onChange={this.onChangeTerms}
                                />
                            }
                            label="I have read the terms of service."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link variant="body2" component={RouterLink} to="/login">
                            Already have an account? Log in
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
    }

    onChangeFirstName = (e) => {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName = (e) => {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangeBirthdate = (e) => {
        this.setState({
            birthdate: e.target.value
        });
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    onChangePasswordConfirmation = (e) => {
        this.setState({
            passwordConfirmation: e.target.value
        });
    }

    onChangeTerms = (e) => {
        this.setState({
            termsCheckbox: !this.state.termsCheckbox
        });
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this.state.password == this.state.passwordConfirmation && this.state.termsCheckbox){
            var formData = new FormData();

            formData.append('firstName', this.state.firstName);
            formData.append('lastName', this.state.lastName);
            formData.append('birthdate', this.state.birthdate);
            formData.append('username', this.state.username);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);

            axios
                .post(this.state.endpoint, formData)
                .then(response => {
                    let user = response.data.data;

                    if(user !== null && typeof user !== 'undefined'){
                        this.props.onRegisterSuccess(user);
                        this.props.history.push('/home');
                    }
                });
        }

    }
}

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onRegisterSuccess: PropTypes.func.isRequired
}

export default withRouter(withStyles(styles)(RegisterForm));
