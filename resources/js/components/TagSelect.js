import React, { Component } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { emphasize, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import PropTypes from 'prop-types';
import { apiEndpointResolver } from '../helpers.js';

const styles = theme => ({
    input: {
        display: 'flex',
        height: 'auto'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    chip: {
        margin: theme.spacing(0.5, 0.25)
    },
    chipFocused: {
        backgroundColor: emphasize(
          theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
          0.08
        )
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2)
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: 'relative'
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing(2)
    }
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

NoOptionsMessage.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

function Control(props) {
    const {
        children,
        innerProps,
        innerRef,
        selectProps: { classes, TextFieldProps }
    } = props;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: classes.input,
                    ref: innerRef,
                    children,
                    ...innerProps
                }
            }}
            {...TextFieldProps}
            variant="outlined"
        />
    );
}

Control.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    selectProps: PropTypes.object.isRequired
};

function Option(props) {
    return (
        <MenuItem
            ref={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

Option.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    isFocused: PropTypes.bool,
    isSelected: PropTypes.bool
};

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

Placeholder.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

function SingleValue(props) {
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

SingleValue.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object.isRequired
};

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

ValueContainer.propTypes = {
    children: PropTypes.node,
    selectProps: PropTypes.object.isRequired
};

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

MultiValue.propTypes = {
    children: PropTypes.node,
    isFocused: PropTypes.bool,
    removeProps: PropTypes.object.isRequired,
    selectProps: PropTypes.object.isRequired
};

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

Menu.propTypes = {
    children: PropTypes.node,
    innerProps: PropTypes.object,
    selectProps: PropTypes.object
};

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class TagSelect extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tagsEndpoint: apiEndpointResolver('/tag/all'),
            suggestions: [],
            valueTags: null
        }
    }

    render() {
        const { classes } = this.props;

        if(this.props.auth != null && typeof this.props.auth != 'undefined' && this.state.suggestions.length == 0){
            this.loadSuggestions();
        }

        return(
            <Select
                classes={classes}
                inputId="selectTags"
                TextFieldProps={{
                        label: 'Tags',
                        InputLabelProps: {
                        htmlFor: 'selectTags',
                        shrink: true,
                    }
                }}
                options={this.state.suggestions}
                components={components}
                value={this.state.valueTags}
                onChange={this.handleChange}
                isMulti
                placeholder="Select one or more tags..."
            />
        );
    }

    loadSuggestions = () => {
        axios
            .get(this.state.tagsEndpoint + '?token=' + this.props.auth.authToken)
            .then(response => {
                let tags = response.data.data;

                if(tags !== null && typeof tags !== 'undefined'){
                    this.setState({
                        suggestions: tags.map(tag => ({ value: tag.id, label: tag.name }))
                    });
                }
            });
    }

    handleChange = (value) => {
        this.setState({
            valueTags: value
        });

        this.props.handleChange(value);
    }
}

TagSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.object,
    handleChange: PropTypes.func
}

export default withStyles(styles)(TagSelect);
