import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import GameDetailsPage from './pages/GameDetailsPage';
import GameUploadPage from './pages/GameUploadPage';
import LogoutPage from './pages/LogoutPage';
import Error404Page from './pages/Error404Page';
import { PrivateRoute } from '../helpers';

export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            user: null,
            isLoggedIn: false
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={props => (
                        <LoginPage
                            user={this.state.user}
                            onLoginSuccess={this.onLoginSuccess}
                        />
                    )} />
                    <Route exact path="/login" render={props => (
                        <LoginPage
                            user={this.state.user}
                            onLoginSuccess={this.onLoginSuccess}
                        />
                    )} />
                    <Route exact path="/register" render={props => (
                        <RegisterPage
                            user={this.state.user}
                            onRegisterSuccess={this.onRegisterSuccess}
                        />
                    )} />
                    <PrivateRoute exact path="/home" component={HomePage} user={this.state.user} />
                    <PrivateRoute exact path="/upload" component={GameUploadPage} auth={this.state.user} />
                    <PrivateRoute exact path="/logout" component={LogoutPage} user={this.state.user} />
                    <PrivateRoute path="/profile/:id" component={ProfilePage} user={this.state.user} />
                    <PrivateRoute path="/games/:id" component={GameDetailsPage} auth={this.state.user} />
                    <Route component={Error404Page} />
                </Switch>
            </BrowserRouter>
        );
    }

    componentDidMount() {
        this.initializeAppState();
    }

    onLoginSuccess = (user) => {
        this.saveAppState(user);
    }

    onRegisterSuccess = (user) => {
        this.saveAppState(user);
    }

    initializeAppState = () => {
        let state = localStorage.getItem('appState');

        if (state) {
            let appState = JSON.parse(state);

            this.setState({
                isLoggedIn: appState.isLoggedIn,
                user: appState.user
            });
        }
    }

    saveAppState = (user) => {
        let appState = {
            isLoggedIn: true,
            user: user
        };

        localStorage.setItem('appState', JSON.stringify(appState));

        this.setState({
            isLoggedIn: appState.isLoggedIn,
            user: appState.user
        });
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
