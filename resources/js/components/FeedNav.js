import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
                <CardActionArea className={classes.cardActionArea} onClick={()=>{
                    this.props.history.push('/profile/' + this.props.auth.id)
                }
                }>
                    <Grid container direction="column" justify="center" spacing={2}>
                        <Grid item container justify="space-between">
                            <Grid item xs={2}>
                                <Avatar aria-label="Indiemesh" className={classes.avatar}>
                                {classes.avatar}>
                                    {this.props.auth.firstName.charAt(0) + this.props.auth.lastName.charAt(0)}
                                </Avatar>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="body1" color="primary">
                                    {this.props.auth.firstName + ' ' + this.props.auth.lastName}
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
            </Card>
        );
    }
}

FeedNav.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object
}

export default withRouter(withStyles(styles)(FeedNav));
