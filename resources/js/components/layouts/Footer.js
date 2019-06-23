import React from 'react';
import { Link as RouterLink } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2, 0, 2, 0),
        marginTop: 'auto',
        backgroundColor: theme.palette.grey[200]
    }
}));

export default function Footer(){
    const classes = useStyles();

    return (
        <div>
            <CssBaseline />
            <footer className={classes.footer}>
                <Container maxWidth="lg">
                    <Grid container spacing={2} justify="space-between">
                        <Grid item container spacing={2} xs={12} sm={6} md={3}>
                            <Grid item xs={2}>
                                <Link component={RouterLink} to="/">
                                    <img
                                        src="/img/Indiemesh Logo.png"
                                        width="32"
                                        height="32"
                                    />
                                </Link>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body1" color="textSecondary">
                                    &copy; {(new Date().getFullYear())} Indiemesh
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2} xs={12} sm={6} md={3}>
                            <Grid item xs={3}>
                                <Link href="#" color="textSecondary" variant="body2">
                                    About
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link href="#" color="textSecondary" variant="body2">
                                    Contact
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link href="#" color="textSecondary" variant="body2">
                                    Terms
                                </Link>
                            </Grid>
                            <Grid item xs={3}>
                                <Link href="#" color="textSecondary" variant="body2">
                                    Privacy
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </footer>
        </div>
    );
}
