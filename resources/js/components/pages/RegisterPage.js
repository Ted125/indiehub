import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import RegisterForm from '../forms/RegisterForm';

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

class RegisterPage extends Component {
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
                        Join the community!
                    </Typography>
                    <RegisterForm onRegisterSuccess={this.props.onRegisterSuccess} />
                </div>
            </Container>
        );
    }
}

RegisterPage.propTypes = {
    classes: PropTypes.object.isRequired,
    onRegisterSuccess: PropTypes.func.isRequired
}

export default withStyles(styles)(RegisterPage);
