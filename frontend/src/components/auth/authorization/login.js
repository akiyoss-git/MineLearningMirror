import React, { Component } from "react";
import { Redirect, Route, Link } from "react-router-dom";
import "./../css/login.css";
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import { Login } from './../../../services/api/user/auth/auth_service'

class Login_Component extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", error_status: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    } 

    handleSubmit(event) {
        event.preventDefault();
        let options = {
            username: this.state.username,
            password: this.state.password
        };
        Login(options).then(response => {
            this.props.history.push("/");
        }).catch(error => {
            alert("WRONG!!")
            console.log(error);
            this.setState({
                error_status: error.response.data.title,
            });
        });
    }

    render() {
        const { username, password } = this.state;
        return (
            <div className="cont">
                <Container className="login">
                    <div className="name"><h2>Авторизация</h2></div>
                    {this.state.error_status}
                    <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="username"
                                    value={username}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </FormGroup>
                        </Col>
                        <Button>Войти</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}
export default Login_Component;
