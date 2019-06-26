import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button';
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

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            endpoint: apiEndpointResolver('/user/login'),
            email: '',
            password: ''
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <form className={classes.form} onSubmit={this.onSubmit} noValidate>
                <Grid container spacing={2}>
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
                            autoComplete="current-password"
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
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign in
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link variant="body2" component={RouterLink} to="/register">
                            New to the community? Register here.
                        </Link>
                    </Grid>
                </Grid>
            </form>
        );
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

    onSubmit = (e) => {
        e.preventDefault();

        var formData = new FormData();

        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        axios
            .post(this.state.endpoint, formData)
            .then(response => {
                let user = response.data.data;

                if(user !== null && typeof user !== 'undefined'){
                    this.props.onLoginSuccess(user);
                    this.props.history.push('/home');
                }
            });
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    onLoginSuccess: PropTypes.func.isRequired
}

export default withRouter(withStyles(styles)(LoginForm));
