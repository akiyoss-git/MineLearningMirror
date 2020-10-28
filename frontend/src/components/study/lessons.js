import React, { Component } from "react";
import { GetLessons } from './../../services/api/study/lessons_service';
import { GetCourse } from './../../services/api/study/courses_service';
import { GetUserCurrent } from "./../../../services/api/user/edit/edit_service";
import "./lessons.css"
import { Link } from "react-router-dom";

class Lessons_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: null,
            lessons: null,
            lessonsAdmin: null,
            lessons_filter: null,
            lessons_ordering: null,
            course: null,
            status: null,
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
                        <td>
                                    <a href={"/lessons/edit/"+post.slug} classname="changenew">Изменить</a>
                                </td>
                    </tr></Link>
                        }
                    
                    </>
                )),
                lessonsAdmin: response.data.map((post, i) => (
                    <>
                    {post.course == course+1 &&
                    <Link to={`/school/${course}/${i}/`}><tr className="lesson">
                        <td><div className="lessonname">{post.title}</div></td>
                        <td><div className="lessonpreview">{post.preview}</div></td>
                        <td>
                                    <a href={"/lessons/edit/"+post.slug} classname="changenew">Изменить</a>
                                </td>
                    </tr></Link>
                        }
                    
                    </>
                ))
            })
        })
    };

    handleGetUserCurrent() {
        GetUserCurrent().then(response => {
            this.setState({
                status: response.data.status,
            }) 
        })
    }

    componentDidMount() {
        this.handleGetLessons(this.props.match.params.pk);
        this.handleGetUserCurrent();
    }

    render() {
        let isAdmin;
        if(this.state.status == "Administrator"){
                isAdmin=true;
        }
        return (
            <>
            <div className="lessonsblock">
                {isAdmin ? this.state.lessonsAdmin : this.state.lessons}
            </div>
            </>
        )
    }
}

export default Lessons_Component;