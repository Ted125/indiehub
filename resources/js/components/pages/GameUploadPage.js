import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import GameUploadForm from '../forms/GameUploadForm';

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3)
    }
});

class GameUploadPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <Header user={this.props.auth} />
                <Container maxWidth="md" className={classes.container}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" paragraph>
                            Upload a Game
                        </Typography>
                        <GameUploadForm auth={this.props.auth} />
                    </Paper>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}

GameUploadPage.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object
}

export default withStyles(styles)(GameUploadPage);
