import React, { Component } from "react";
import { GetLessons } from './../../../services/api/study/lessons_service';
import "./lessons.css"
import { Link } from "react-router-dom";

class Lessons_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: null,
            lessons: null,
            lessons_filter: null,
            lessons_ordering: null,
            course: null,
        };
        this.handleGetLessons = this.handleGetLessons.bind(this);
    }


    /*Получение всех новостей*/
    handleGetLessons(course) {
        course = Number(course);
        GetLessons().then(response => {
            this.setState({
                lessons: response.data.map((post, i) => (
                    <>
                    {post.course == course+1 &&
                    <Link to={`/school/${course}/${i}/`}><tr className="lesson">
                        <td><div className="lessonname">{post.title}</div></td>
                        <td><div className="lessonpreview">{post.preview}</div></td>
                    </tr></Link>
                        }
                    
                    </>
                ))
            })
        })
    };

    componentDidMount() {
        this.handleGetLessons(this.props.match.params.pk);
    }

    render() {
        return (
            <>
            <div className="lessonsblock">
                {this.state.lessons}
            </div>
            </>
        )
    }
}

export default Lessons_Component_Mobile;