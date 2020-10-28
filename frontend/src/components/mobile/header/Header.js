import React, { Component } from "react";
import { Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Sidebar from "react-sidebar";
import { CSSTransition } from "react-transition-group";
import { Logout } from "../../../services/api/user/auth/auth_service"
import { GetUserCurrent } from "./../../../services/api/user/edit/edit_service";
import "./Header.css"

class Header_Mobile extends React.Component {
        constructor(props){
                super(props);
                this.state = {
                        sidebarOpen: false
                      };
                this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
                this.logout = this.logout.bind(this);
        }

        logout(event) {
            Logout().then(response => {
                    this.props.history.push("/login/");
                    window.location.reload();
            })
    }

        onSetSidebarOpen(open) {
                this.setState({ sidebarOpen: open });
              }
    render() {
        let loggedIn=localStorage.getItem("access_token");
        return (
            <>
            <div className="header-body-mobile">
                <a href="/"><img src="/static/frontend/back/logo.png" className="header-logo-mobile" /></a>
            </div>
            <Sidebar
                sidebar={
                <div>
                    <table>
                    <tr>
                                <button type="submit" className="sidebarbutton" onClick={() =>{document.location.href = "/"}}>Главная</button>
                                </tr>
                    {loggedIn ? 
                    <>
                        <tr>
                                <button type="submit" className="sidebarbutton" onClick={() =>{document.location.href = "/cabinet"}}>Кабинет</button>
                                </tr>
                        <tr><button type="submit" className="sidebarbutton" onClick={this.logout}>Выйти</button></tr>
                    </>
                :
                <tr>
                
                                <button type="submit" className="sidebarbutton" onClick={() => {document.location.href = "/login"}}>Логин</button>
                                
                </tr>
                    }
                <tr>
                        <button type="submit" className="sidebarbutton" onClick={() => {document.location.href = "/courses/list"}}>Обучение</button></tr>
                <tr>
                    <button type="submit" className="sidebarbutton" onClick={() => {document.location.href = "/about"}}>О проекте</button></tr>
                <tr>
                    <button type="submit" className="sidebarbutton" onClick={() => {document.location.href = "http://forum.minelearning.ru"}}>Форум</button></tr>
                <tr>
                        <button type="submit" className="sidebarbutton" onClick={() => {window.location.href = "/map"}}>Карта мира</button>
                        </tr>
                </table>
                </div>
                }
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "#F4EBDB", height: "100%" } }}
                >
                <button onClick={() => this.onSetSidebarOpen(true)} className="sidebarbuttons">
                <img src="https://img.icons8.com/ios-filled/50/000000/menu.png" className="sidebarbuttons-img"/>
                </button>
            </Sidebar>
            </>
        );
    }
}


export default withRouter(Header_Mobile);