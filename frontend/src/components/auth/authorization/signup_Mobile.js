import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SingUp } from './../../../services/api/user/auth/auth_service';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback,
} from 'reactstrap';
import "./../css/signup.css"

class Signup_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            name: "",
            surname: "",
            second_name: "",
            errors: {},
            error_status: "",
            validate: {
                emailState: '',
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        let options = {
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            name : this.state.name,
            surname : this.state.surname,
            second_name : this.state.second_name,
        };
        SingUp(options).then(response => {
            this.props.history.push("/login/");
        }).catch(error => {
            console.log(error);
            this.setState({
                error_status: error.response.data.title,
            });
        });
    } 
    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    render() {
        const { username, password, email, name, surname, second_name } = this.state;
        return (
            <>
                <Container className="login-m">
                    <div className="name"><h2>Регистрация</h2></div>
                    {this.state.error_status}
                    <Form className="form" onSubmit={(e) => this.handleSubmit(e)}>
                        <Col>
                            <FormGroup>
                                <Label>Имя</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Имя"
                                    value={name}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Фамилия</Label>
                                <Input
                                    type="text"
                                    name="surname"
                                    id="surname"
                                    placeholder="Фамилия"
                                    value={surname}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Отчество</Label>
                                <Input
                                    type="text"
                                    name="second_name"
                                    id="second_name"
                                    placeholder="Отчество"
                                    value={second_name}
                                    onChange={(e) => {
                                        this.handleChange(e)
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>Имя пользователя</Label>
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
                                <Label>Почта</Label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="username"
                                    value={email}
                                    valid={this.state.validate.emailState === 'has-success'}
                                    invalid={this.state.validate.emailState === 'has-danger'}
                                    onChange={(e) => {
                                        this.validateEmail(e)
                                        this.handleChange(e)
                                    }}
                                />
                            </FormGroup>
                            <FormFeedback>
                                Введите действующий почтовый ящик.
              </FormFeedback>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Пароль</Label>
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
                        <Col>
                            <FormGroup>
                                <Label for="examplePassword">Повторите пароль</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="examplePassword"
                                    placeholder="********"
                                />
                            </FormGroup>
                        </Col>
                        <Button>Зарегистрироваться</Button>
                    </Form>
                </Container>
                <div className="ccc" />
            </>
        );
    }
}

export default Signup_Component_Mobile;
