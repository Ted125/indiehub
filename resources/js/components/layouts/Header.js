import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Link from '@material-ui/core/Link';
import { fade, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    grow: {
        flexGrow: 1
    },
    brand: {
        marginRight: theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(5),
            width: 'auto'
        }
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputRoot: {
        color: 'inherit'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 750
        },
    }
});

class Header extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;

        var navButtons;

        if(this.props.user){
            navButtons = (
                <Link color="inherit" variant="body2" className={classes.menuButton} href="/logout">
                    Logout
                </Link>
            );
        }else{
            navButtons = (
                <React.Fragment>
                    <Link color="inherit" variant="body2" className={classes.menuButton} href="/login">
                        Login
                    </Link>
                    <Link color="inherit" variant="body2" className={classes.menuButton} href="/register">
                        Register
                    </Link>
                </React.Fragment>
            )
        }

        return (
            <div className={classes.grow}>
                <AppBar position="static">
                    <Container maxWidth="lg">
                        <Toolbar>
                            <Link className={classes.brand} component={RouterLink} to="/">
                                <img
                                    src="/img/Indiemesh Logo.png"
                                    width="32"
                                    height="32"
                                />
                            </Link>
                            <Link color="inherit" variant="h6" className={classes.title} href="/">
                                Indiemesh
                            </Link>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Look for something..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'Search' }}
                                />
                            </div>
                            <div className={classes.grow} />
                            {navButtons}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object
}

export default withStyles(styles)(Header);
