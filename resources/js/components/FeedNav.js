import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import GamepadIcon from '@material-ui/icons/Gamepad';
import VideoGameAssetIcon from '@material-ui/icons/VideoGameAsset';
import TagList from './TagList';

const styles = theme => ({
    avatar: {
        backgroundColor: theme.palette.grey[500],
        width: 24,
        height: 24
    },
    card: {
        flex: 1
    },
    cardActionArea: {
        padding: theme.spacing(2)
    }
});

class FeedNav extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                    <Grid container direction="column" justify="center" spacing={2}>
                        <Grid item container justify="space-between">
                            <Grid item xs={2}>
                                <Avatar aria-label="Indiemesh" className={classes.avatar}>
                                    IM
                                </Avatar>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body1" color="primary">
                                    Indiemesh
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardActionArea>
                <Divider />
                <List component="nav" aria-label="Categories">
                    <ListItem button>
                        <ListItemIcon>
                            <GamepadIcon />
                        </ListItemIcon>
                        <ListItemText primary="Games" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <VideoGameAssetIcon />
                        </ListItemIcon>
                        <ListItemText primary="Assets" />
                    </ListItem>
                </List>
                <Divider />
                <CardContent>
                    <Typography variant="body2" color="textSecondary">
                        Hot Tags
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

FeedNav.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FeedNav);
