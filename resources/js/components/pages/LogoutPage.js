import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Logout extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.onLogout();
    }

    render(){
        return(
            <React.Fragment>
                Logging out...
            </React.Fragment>
        );
    }

    onLogout = () => {
        localStorage.removeItem('appState');
        this.props.history.push('/');
    }
}

export default withRouter(Logout);
