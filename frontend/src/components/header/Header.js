import React, { Component } from "react";
import { Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";
import { Logout } from "../../services/api/user/auth/auth_service"
import { GetUserCurrent } from "./../../services/api/user/edit/edit_service";
import "./Header.css"

class Header extends React.Component {
        constructor(props){
                super(props);
                this.state = {
                        hidden:true,    
                        showList: false,
                        highlightedHobby: false,
                        hiddenAdmin:true,    
                        showListAdmin: false,
                        highlightedHobbyAdmin: false,
                        status: "",
                }
                this.changestate = this.changestate.bind(this);
                this.listSwitch = this.listSwitch.bind(this);
                this.changestateAdmin = this.changestateAdmin.bind(this);
                this.listSwitchAdmin = this.listSwitchAdmin.bind(this);
                this.logout = this.logout.bind(this);

                this.handleGetUserCurrent = this.handleGetUserCurrent.bind(this);
        }
        
        changestate(){
        this.setState(prevState => ({
                showList: !prevState.showList
              }));
        }
            
        listSwitch()  {
                this.setState(state => ({
                  highlightedHobby: !state.highlightedHobby
                }));
              };

        changestateAdmin(){
        this.setState(prevState => ({
                showListAdmin: !prevState.showListAdmin
                }));
        }
                
        listSwitchAdmin()  {
                this.setState(state => ({
                        highlightedHobbyAdmin: !state.highlightedHobbyAdmin
                }));
                };

        logout(event) {
                Logout().then(response => {
                        this.props.history.push("/login/");
                        window.location.reload();
                })
        }

        handleGetUserCurrent() {
                GetUserCurrent().then(response => {
                    this.setState({
                        status: response.data.status,
                    })
                })
            }
        
        componentDidMount(){
                this.handleGetUserCurrent();
        }

    render() {
        let loggedIn=localStorage.getItem("access_token");
        let isAdmin;
        if(this.state.status == "Administrator"){
                isAdmin=true;
        }
        return (
            <>
            <div className="header-body">
                <a href="/"><img src="/static/frontend/back/logo.png" className="header-logo" /></a>
            <form action="http://minelearning.frmbb.ru/">
                    <button type="submit" className="header-forum">Форум</button>
            </form>
            <form action="/about">
                    <button type="submit" className="header-about">О проекте</button>
            </form>
                <form action="/courses/list/">
                        <button type="submit" className="header-school" >Обучение</button>
                </form>
                <form action="/map/">
                        <button type="submit" className="header-map" >Карта мира</button>
                </form>
                <button type="submit" className="header-cabinet" onClick={this.changestate} >Кабинет</button>
                {loggedIn ?
                        <CSSTransition
                                in={this.state.showList}
                                timeout={400}
                                classNames="list-transition"
                                unmountOnExit
                                appear
                                onEntered={this.listSwitch}
                                onExit={this.listSwitch}
                                >
                                <div className="list-body">
                                <ul className="list">
                                <li className="list-item"><form action="/cabinet">
                                <button type="submit" className="header-login">Кабинет</button>
                                </form></li>
                                <li className="list-item">
                                <button type="submit" className="header-signup" onClick={this.logout}>Выйти</button>
                                </li>
                                </ul>
                                </div>
                        </CSSTransition>
                :                         
                        <CSSTransition
                                in={this.state.showList}
                                timeout={400}
                                classNames="list-transition"
                                unmountOnExit
                                appear
                                onEntered={this.listSwitch}
                                onExit={this.listSwitch}
                                >
                                <div className="list-body">
                                <ul className="list">
                                <li className="list-item"><form action="/login">
                                <button type="submit" className="header-login">Логин</button>
                                </form></li>
                                <li className="list-item"><form action="/signup">
                                <button type="submit" className="header-signup">Регистрация</button>
                                </form></li>
                                </ul>
                                </div>
                        </CSSTransition>
                }
                {isAdmin && 
                <>
                        <button type="submit" className="header-adminpanel" onClick={this.changestateAdmin} >AdminPanel</button>
                        <CSSTransition
                                in={this.state.showListAdmin}
                                timeout={400}
                                classNames="list-transition-admin"
                                unmountOnExit
                                appear
                                onEntered={this.listSwitchAdmin}
                                onExit={this.listSwitchAdmin}
                                >
                                <div className="list-body-admin">
                                <ul className="list-admin">
                                <li className="list-item-admin">
                                        <form action="/news/create/">
                                                <button type="submit" className="header-login">Создать новость</button>
                                        </form>
                                </li>
                                <li className="list-item-admin">
                                        <form action="/courses/create/">
                                                <button type="submit" className="header-login">Создать курс</button>
                                        </form>
                                </li>
                                <li className="list-item-admin">
                                        <form action="/lessons/create/">
                                                <button type="submit" className="header-login">Создать урок</button>
                                        </form>
                                </li>
                                </ul>
                                </div>
                        </CSSTransition>
                </>
                }
            </div>
            </>
        );
    }
}


export default withRouter(Header);