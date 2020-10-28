import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetUserCurrent, ChangeUser } from "../../../services/api/user/edit/edit_service";
import Delete_User_Modal from './../../../modals/auth/delete_user_form';

class Edit_Profile_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            surname: "",
            second_name: "",
            email: "",
            bio: "",
            new_password: "",
            old_password: "",
            error_status: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGetUserCurrent = this.handleGetUserCurrent.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let options = {
            username: this.state.username,
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname,
            second_name: this.state.second_name,
            bio: this.state.bio,
            new_password: this.state.new_password,
            old_password: this.state.old_password,
        };
        ChangeUser(options).then(response => {
            window.location.reload();
        })
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
            <div className="simple-login-container">
                <form className="form-edit-profile" onSubmit={this.handleSubmit}>
                    <h2>Изменить</h2>
                    {this.state.error_status}
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="name" type="text" placeholder="Имя" className="form-control" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="surname" type="text" placeholder="Фамилия" className="form-control" value={this.state.surname} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="second_name" type="text" placeholder="Отчество" className="form-control" value={this.state.second_name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="username" type="text" className="form-control" placeholder="Логин" value={this.state.username} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="email" type="text" className="form-control" placeholder="Почта" value={this.state.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="bio" type="textarea" className="form-control" placeholder="Биография" value={this.state.bio} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="old_password" type="password" placeholder="Старый Пароль" className="form-control" value={this.state.old_password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="new_password" type="password" placeholder="Новый Пароль" className="form-control" value={this.state.new_password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn btn-block btn-login" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/login/">Сохранить</Link>
                        </div>
                    </div>
                </form>
                <h2>Удалить пользователя</h2>
                <Delete_User_Modal data={this.state.username} />
            </div>
        )
    }
}

export default Edit_Profile_Component;