import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./about.css"

class About_Component extends Component {
    constructor(props) {
        super(props);
        this.state;
    }

    render() {
        return (
            <>
                <table className="abouttable">
                    <tr>
                        <td>
                            <div className="abouttitle">
                                Кто мы?
                            </div>
                            <div className="abouttext">
                                Мы майнкрафтеры
                            </div>
                        </td>
                        <td>
                            <img src="/static/frontend/img/4panel.jpg" className="aboutimg" />
                        </td>
                    </tr>
                </table>
                <table className="abouttable">
                    <tr>
                        <td>
                            <img src="/static/frontend/img/good.jpg" className="aboutimg" />
                        </td>
                        <td>
                            <div className="abouttitle">
                                Что за проект?
                            </div>
                            <div className="abouttext">
                                Майнкрафт
                            </div>
                        </td>
                    </tr>
                </table>
                <table className="abouttable">
                    <tr>
                        <td>
                            <div className="abouttitle">
                                Я люблю
                            </div>
                            <div className="abouttext">
                                Майнкрафт
                            </div>
                        </td>
                        <td>
                            <img src="/static/frontend/img/mine.jpg" className="aboutimg" />
                        </td>
                    </tr>
                </table>
                <table className="abouttable">
                    <tr>
                        <td>
                            <img src="/static/frontend/img/redstone.jpg" className="aboutimg" />
                        </td>                        
                        <td>
                            <div className="abouttitle">
                                Ой мама пришла
                            </div>
                            <div className="abouttext">
                                Зачем? ладно.
                            </div>
                        </td>
                    </tr>
                </table>
            </>
        )
    }
}

export default About_Component;