import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Logout } from './../../services/api/user/auth/auth_service'

class Test_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        Logout().then(response => {
            location.reload();
        })
    };

    render() {
        return (
            <div>
                <h1>Test buttuons</h1>
                <button onClick={this.handleLogout}>Выйти</button>
            </div>
        )
    }
}

export default Test_Component;
