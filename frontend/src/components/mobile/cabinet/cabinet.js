import React, { Component } from "react";
import { Link } from 'react-router-dom'
import "./cabinet.css";
import { GetUserCurrent } from "./../../../services/api/user/edit/edit_service";

class Cabinet_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            surname: "",
            second_name: "",
            email: "",
            bio: "",
            avatar: "",
            error_status: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleGetUserCurrent = this.handleGetUserCurrent.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleGetUserCurrent() {
        GetUserCurrent().then(response => {
            this.setState({
                username: response.data.username,
                name: response.data.name,
                surname: response.data.surname,
                second_name: response.data.second_name,
                email: response.data.email,
                bio: response.data.bio,
                avatar: response.data.avatar,
            })
        }).catch(error => {
            console.log(error);
            this.setState({
                error_status: error.response.data.title,
            });
        });
    }

    componentDidMount() {
        this.handleGetUserCurrent();
    }
    render() {
        return (
            <table className="cabinetbody">
                <tr>
                    <td>
                        <table className="avatartable">
                            <tr>
                                <img className="avatar" src={this.state.avatar} />
                            </tr>
                            <tr><a href="/cabinet/" className="changeava">Изменить</a></tr>
                            {this.state.error_status}
                        </table>
                        
                    </td>
                    <table className="info">
                        <tr>
                            <td>
                                <div className="username">{this.state.username}<a href="">
                                        <img className="pen" src="/static/frontend/cabinet/pen.png" />
                                    </a>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="email">{this.state.email}<a href="/cabinet/">
                                        <img className="pen" src="/static/frontend/cabinet/pen.png" />
                                    </a>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="password">************<a href="/cabinet/">
                                        <img className="pen" src="/static/frontend/cabinet/pen.png" />
                                    </a>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="FIO">{this.state.surname} {this.state.name} {this.state.second_name}<a href="/cabinet/">
                                        <img className="pen" src="/static/frontend/cabinet/pen.png" />
                                    </a>
                                    </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="compc">Completed Courses</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="coursess">Lorem Ipsum</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="coursess">Lorem Ipsum #2</div>
                            </td>
                        </tr>
                    </table>
                </tr>
            </table>
        )
    }
}

export default Cabinet_Component_Mobile;