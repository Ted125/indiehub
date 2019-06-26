import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../forms/LoginForm';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        margin: theme.spacing(1)
    }
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Container maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Grid container justify="center" className={classes.logo}>
                        <Grid item xs={3}>
                            <Link component={RouterLink} to="/">
                                <img
                                    src="/img/Indiemesh Logo.png"
                                    width="64"
                                    height="64"
                                />
                            </Link>
                        </Grid>
                    </Grid>
                    <Typography component="h1" variant="h5">
                        Welcome back!
                    </Typography>
                    <LoginForm onLoginSuccess={this.props.onLoginSuccess} />
                </div>
            </Container>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    onLoginSuccess: PropTypes.func.isRequired
}

export default withStyles(styles)(LoginPage);
