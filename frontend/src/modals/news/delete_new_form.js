import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { DeleteNew } from '../../services/api/news/news_service';


class Delete_New_Modal extends React.Component {
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
        DeleteNew(this.props.data).then(response => {
            document.location.href = "/"
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
                <button type="button-delete" className="butt" onClick={this.handleShow}>
                    Удалить новость
                </button>
                <Modal show={this.state.show} onHide={this.handleClose} className="text-dark">
                    <Modal.Header closeButton>
                        <Modal.Title>Изменить документ/запрос</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Вы уверенны что хотите удалить новость?
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


export default Delete_New_Modal;