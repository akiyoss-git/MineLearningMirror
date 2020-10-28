import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import axiosInstance from "./../../axios/axiosAPI";
import { GetLessons, GetLesson } from './../../../services/api/study/lessons_service';
import "./lesson/lesson.css"

function createMarkup(desc){
    return { __html: desc}
}

class Lesson_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: null,
            lessons: null,
            lessons_filter: null,
            lessons_ordering: null,
        };
        this.handleGetLesson = this.handleGetLesson.bind(this);
    }
    /*Получение одной новости*/
    handleGetLesson(course, id) {
        course = Number(course);
        id = Number(id)
        GetLessons().then(response => {
            this.setState({
                lesson: response.data.map((post, i) => (
                    <>
                    {post.id == id+1 &&
                        <tr>
                        <td><img src={post.poster} className="lessimg-m"/>
                        </td>
                        <td><div className="lesson_name-m">{post.title}</div>
                        <div className="lesson_preview-m" dangerouslySetInnerHTML={createMarkup(post.description)}></div>
                        </td>
                        </tr>
                        }
                    
                    </>
                ))
            })
        })
    };

    componentDidMount() {
        this.handleGetLesson(this.props.match.params.course, this.props.match.params.id);
    }

    render() {
        return (
            <table className="lessonbody">
                {this.state.lesson}
            </table>
        )
    }
}

export default Lesson_Component_Mobile;