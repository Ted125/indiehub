import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({

});

class SidebarAd extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Card>
                <CardHeader
                    title = {
                        <Typography variant="caption" color="textSecondary" gutterBottom>
                            Sponsored
                        </Typography>
                    }
                 />
                 <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="ad"
                        height="200"
                        image="/img/ad.jpg"
                        title="Ad"
                    />
                 </CardActionArea>
                 <CardContent>
                     <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium ligula bibendum lacus tempus, in.
                     </Typography>
                 </CardContent>
            </Card>
        );
    }
}

SidebarAd.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SidebarAd);
