import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { GetUserCurrent } from './../services/api/user/edit/edit_service'

function Admin_Valid() {
    let flag = true;
    localStorage.getItem("access_token")
    const token = localStorage.getItem("access_token");
    if (token == null) {
        return true;
    }
    GetUserCurrent().then(response => {
        if (response.data.status == 'Administrator') {
            flag = false;
        }
        else {
            flag = true;
        }
    })
    return flag;
}

export const Admin_Route = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Admin_Valid() ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

            