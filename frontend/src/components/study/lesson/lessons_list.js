import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./lessons.css";
import { GetLessonListByCourse } from '../../../services/api/study/lessons_service';
 
class Lessons_List_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lessons: null,
        };
        this.handleRenderLessonsBlock = this.handleRenderLessonsBlock.bind(this);
    }

    handleRenderLessonsBlock(course) {
        GetLessonListByCourse(course).then(response => {
            this.setState({
                lessons: response.data.map((post, i) => (
                    <>
                        <Link to={'/lessons/detail/'+ post.slug}><tr className="lesson">
                            <td><div className="lessonname">{post.title}</div></td>
                            <td><div className="lessonpreview" dangerouslySetInnerHTML={{ __html: post.preview }}/></td>
                        </tr></Link>
                    </>
                ))
            })
        })
    }

    componentDidMount() {
        this.handleRenderLessonsBlock(this.props.match.params.course);
    }

    render() {
        return (
            <>
            <div className="lessonsblock">
                {this.state.lessons}
            </div>
            </>
        );
    }
}

export default Lessons_List_Component;
