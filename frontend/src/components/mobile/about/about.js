import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./about.css"

class About_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state;
    }

    render() {
        return (
            <>
                <table className="abouttable-m">
                    <tr>
                        <td>
                            <div className="abouttitle-m">
                                Кто мы?
                            </div>
                            <div className="abouttext-m">
                                Мы майнкрафтеры
                            </div>
                        </td> 
                        <td>
                            
                            <img src="/static/frontend/img/4panel.jpg" className="aboutimg-m" />
                        </td>
                    </tr>
                </table>
                <table className="abouttable-m">
                    <tr>
                        <td>
                            
                            <img src="/static/frontend/img/good.jpg" className="aboutimg-m" />
                        </td>
                        <td>
                            <div className="abouttitle-m">
                                Что за проект?
                            </div>
                            <div className="abouttext-m">
                                Майнкрафт
                            </div>
                        </td>
                    </tr>
                </table>
                <table className="abouttable-m">
                    <tr>
                        <td>
                            <div className="abouttitle-m">
                                Я люблю
                            </div>
                            <div className="abouttext-m">
                                Майнкрафт
                            </div>
                        </td>
                        <td>
                            
                            <img src="/static/frontend/img/mine.jpg" className="aboutimg-m" />
                        </td>
                    </tr>
                </table>
                <table className="abouttable-m">
                    <tr>
                        <td>
                            
                            <img src="/static/frontend/img/redstone.jpg" className="aboutimg-m" />
                        </td>                        
                        <td>
                            <div className="abouttitle-m">
                                Ой мама пришла
                            </div>
                            <div className="abouttext-m">
                                Зачем? ладно.
                            </div>
                        </td>
                    </tr>
                </table>
            </>
        )
    }
}

export default About_Component_Mobile;