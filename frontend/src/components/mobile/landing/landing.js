import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import News_Component_Mobile from "../news/display/news"

class Landing_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state;
    }

    render() {
        return (
            <div>             
               <News_Component_Mobile />
            </div>
        )
    }
}

export default Landing_Component_Mobile;
