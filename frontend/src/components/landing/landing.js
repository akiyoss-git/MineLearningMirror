import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import News_Component from "../news/display/news"
import PanelPage from "./panels/panels"

class Landing_Component extends Component {
    constructor(props) {
        super(props);
        this.state;
    }

    render() {
        return (
            <div>             
               <PanelPage />
               <News_Component />
            </div>
        )
    }
}

export default Landing_Component;
