import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./lesson.css"
import { GetLessonDetail } from '../../../../services/api/study/lessons_service';

class Lessons_Detail_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: null,
        };
        this.handleRenderLesson = this.handleRenderLesson.bind(this);
    }

    handleRenderLesson(slug) {
        GetLessonDetail(slug).then(response => {
            this.setState({
                lesson: 
                    <>
                        
                            <div className="lesson_name-m">{response.data.title}</div>
                                <div className="lesson_preview-m" dangerouslySetInnerHTML={{__html : response.data.content}}></div>
                                <img src={response.data.poster} className="lessimg-m" />
                    </>
            })
        })
    } 

    componentDidMount() {
        this.handleRenderLesson(this.props.match.params.lesson);
    }

    render() {
        return (
            <table className="lessonbody-m">
                {this.state.lesson}
            </table>
        );
    }
}

export default Lessons_Detail_Component_Mobile;
