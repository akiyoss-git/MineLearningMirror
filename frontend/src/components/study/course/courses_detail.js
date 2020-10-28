import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./courses.css";
import { GetCourseDetail } from '../../../services/api/study/courses_service';

class Courses_Detail_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: null,
        };
        this.handleRenderCourse = this.handleRenderCourse.bind(this);
    }

    handleRenderCourse(slug) {
        GetCourseDetail(slug).then(response => {
            this.setState({
                new: 
                    <>
                        <div className="block">
                            <div className="title"><h4>{response.data.title}</h4></div>
                            <div className="text"><h5>{response.data.preview}</h5></div>
                            <div className="line">{response.data.content}</div>
                            <div className="picdiv"><img className="pic" src={response.data.poster} /></div>
                        </div>

                    </>
            })
        })
    }

    componentDidMount() {
        this.handleRenderCourse(this.props.match.params.course);
    }

    render() {
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <div className="newsblock"><h2>Новости</h2></div>
                    <div className="news" >
                        {this.state.new}
                        <div className="block"></div>
                    </div>
                </ul>
            </div>
        );
    }
}

export default Courses_Detail_Component;
