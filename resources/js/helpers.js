import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const apiEndpointResolver = (url) => {
    var baseUrl = window.location.protocol + '//' + window.location.host;
    var endpointPrefix = '/api/v1';

    return baseUrl + endpointPrefix + url;
}

export const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render = { props =>
            (localStorage.getItem('appState')) ? (
                <Component {...props} {...rest} />
            ) : (
                <Redirect to={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }}
                />
            )
        }
    />
)
