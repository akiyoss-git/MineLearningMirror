import React, { Component } from "react";
import { CreateNew } from '../../../services/api/news/news_service';
import { GetUserCurrent } from './../../../services/api/user/edit/edit_service';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Dropzone from 'react-dropzone';
import { imageUploadApi } from './../../../services/api/cloud/image/imageUploader';

class News_Create_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: '',
            title: '',
            preview: '',
            poster: '',
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
            preview:data
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
        if (this.state.posterUploading) {
            let options = {
                slug: this.state.slug,
                title: this.state.title,
                preview: this.state.preview,
                poster: this.state.poster,
                content: this.state.content,
                creator: this.state.creator,
            };
            CreateNew(options).then(response => {
                alert("Готово!");
            }).catch(error => {
                console.log(error);
                this.setState({
                    error_status: error.response.data.title,
                });
            });
        }
        else {
            imageUploadApi(file)
                .then(response => {
                    this.setState({
                        poster: response.data.secure_url,
                        posterUploading: true,
                    });
                    let options = {
                        slug: this.state.slug,
                        title: this.state.title,
                        preview: this.state.preview,
                        poster: this.state.poster,
                        content: this.state.content,
                        creator: this.state.creator,
                    };
                    CreateNew(options).then(response => {
                        document.location.href = "/"
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
    }

    render() {
        return (
            <div className="simple-login-container">
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="title">Создание новости</div>
                    {this.state.error_status}
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="slug" type="text" placeholder="Метка(для поиска в бд)" className="inputtext" value={this.state.slug} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group">
                            <input name="title" type="text" placeholder="Заголовок" className="inputtext" value={this.state.title} onChange={this.handleChange} />
                        </div>
                    </div>
                    <label>Profile picture</label>
                    <Dropzone onDrop={this.handleonImageDrop} multiple={false} accept="image/*">
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p className="inputtext">Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={editor => {
                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={this.handlePreviewCkeditorState}
                        value={this.state.preview}
                    />
                    <div />
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onInit={editor => {
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
            </div>
        )
    }
}

export default News_Create_Component;
