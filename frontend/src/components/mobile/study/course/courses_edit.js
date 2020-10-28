import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ChangeCourse, GetCourseDetail } from '../../../services/api/study/courses_service';
import { GetUserCurrent } from '../../../services/api/user/edit/edit_service';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Dropzone from 'react-dropzone';
import { imageUploadApi } from '../../../services/api/cloud/image/imageUploader';
import Delete_Course_Modal from '../../../modals/courses/delete_course_form';

class Courses_Edit_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: '',
            slug_old: '',
            title: '',
            preview: '',
            poster: '',
            poster_old: '',
            content: '',
            creator: '',
            posterFile: null,
            posterError: null,
            posterUploading: false,
            errors: {},
            error_status: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handlePreviewCkeditorState = this.handlePreviewCkeditorState.bind(this);
        this.handleContentCkeditorState = this.handleContentCkeditorState.bind(this);
        this.handleonImageDrop = this.handleonImageDrop.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handlePreviewCkeditorState(event, editor) {
        const data = editor.getData();
        this.setState({
            preview: data
        })
    }

    handleContentCkeditorState(event, editor) {
        const data = editor.getData();
        this.setState({
            content: data
        })
    }

    handleonImageDrop(event) {
        this.setState({
            posterFile: event[0],
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        let file = this.state.posterFile;
        if (this.state.poster_old == this.state.poster) {
            let options = {
                slug: this.state.slug,
                slug_old: this.state.slug_old,
                title: this.state.title,
                preview: this.state.preview,
                poster: this.state.poster,
                content: this.state.content,
                creator: this.state.creator,
            };
            ChangeCourse(options).then(response => {
                alert("Готово!");
            }).catch(error => {
                console.log(error);
                this.setState({
                    error_status: error.response.data.title,
                });
            });
        }
        else {
            if (this.state.posterUploading) {
                ChangeCourse(options).then(response => {
                    alert("Готово!");
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        error_status: error.response.data.title,
                    });
                });
            }
            else {

            }
            imageUploadApi(file)
                .then(response => {
                    this.setState({
                        poster: response.data.secure_url,
                        posterUploading: false,
                    });
                    let options = {
                        slug: this.state.slug,
                        slug_old: this.state.slug_old,
                        title: this.state.title,
                        preview: this.state.preview,
                        poster: this.state.poster,
                        content: this.state.content,
                        creator: this.state.creator,
                    };
                    ChangeCourse(options).then(response => {
                        alert("Готово!");
                    })
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        posterError: 'Image Upload Error',
                        error_status: 'Image Upload Error',
                        posterFile: null,
                        posterUploading: false,
                    });
                });
        }
    }

    componentDidMount() {
        GetUserCurrent().then(response => {
            this.setState({
                creator: response.data.username
            })
        })
        GetCourseDetail(this.props.match.params.course).then(response => {
            this.setState({
                slug: response.data.slug,
                slug_old: response.data.slug,
                title: response.data.title,
                preview: response.data.preview,
                poster: response.data.poster,
                poster_old: response.data.poster,
                content: response.data.content,
                creator: response.data.creator,
            })
        })
    }

    render() {
        return (
            <div className="simple-login-container">
                <form className="form" onSubmit={this.handleSubmit}>
                    <h2>Изменить Курс</h2>
                    {this.state.error_status}
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="slug" type="text" placeholder="Метка(для поиска в бд)" className="form-control" value={this.state.slug} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="title" type="text" placeholder="Заголовок" className="form-control" value={this.state.title} onChange={this.handleChange} />
                        </div>
                    </div>
                    <label>Profile picture</label>
                    <Dropzone onDrop={this.handleonImageDrop} multiple={false} accept="image/*">
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <label>Старое изображение</label>
                    <img src={this.state.poster_old}/>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.preview}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={this.handlePreviewCkeditorState}
                        value={this.state.preview}
                    />
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.content}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={this.handleContentCkeditorState}
                        value={this.state.content}
                    />
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input type="submit" className="btn btn-block btn-login" />
                        </div>
                    </div>
                </form>
                <h2>Удалить новость</h2>
                <Delete_Course_Modal data={this.state.slug_old} />
            </div>
        )
    }
}

export default Courses_Edit_Component;