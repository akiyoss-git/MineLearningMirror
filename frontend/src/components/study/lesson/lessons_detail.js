import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./lesson.css"
import { GetLessonDetail } from '../../../services/api/study/lessons_service';

class Lessons_Detail_Component extends Component {
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
                        <tr>
                            <td><img src={response.data.poster} className="lessimg" />
                            </td>
                            <td><div className="lesson_name">{response.data.title}</div>
                                <div className="lesson_preview" dangerouslySetInnerHTML={{__html : response.data.content}}></div>
                            </td>
                        </tr>
                    </>
            })
        })
    } 

    componentDidMount() {
        this.handleRenderLesson(this.props.match.params.lesson);
    }

    render() {
        return (
            <table className="lessonbody">
                {this.state.lesson}
            </table>
        );
    }
}

export default Lessons_Detail_Component;
