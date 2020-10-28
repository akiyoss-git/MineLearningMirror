import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { DeleteCourse } from '../../services/api/study/courses_service';


class Delete_Course_Modal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(event) {
        event.preventDefault();
        DeleteCourse(this.props.data).then(response => {
            console.log('success');
        })
        /*Logout().then(response => {
            window.location.reload();
        })*/
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <>
                <button type="button" onClick={this.handleShow}>
                    Удалить курс
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить документ/запрос</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Вы уверенны что хотите удалить курс?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={this.handleSubmit}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default Delete_Course_Modal;