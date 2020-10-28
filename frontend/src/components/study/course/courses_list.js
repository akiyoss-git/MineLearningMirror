import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./courses.css";
import { GetUserCurrent } from "./../../../services/api/user/edit/edit_service";
import { GetCourseList } from '../../../services/api/study/courses_service';

class Courses_List_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: null,
            coursesAdmin: null,
            status: null,
        };
        this.handleRenderCoursesBlock = this.handleRenderCoursesBlock.bind(this);
    } 

    handleRenderCoursesBlock() {
        GetCourseList().then(response => {
            this.setState({
                courses: response.data.map((post, i) => (
                    <>
                        <table className="panel">
                            <tr>
                                <td>
                                    <div className="picdiv"><img className="pic" src={post.poster} /></div>
                                </td>
                                <td>
                                    <Link to={'/lessons/list/'+ post.slug}><div className="title">{post.title}</div></Link>
                                    <div className="text"dangerouslySetInnerHTML={{__html: post.preview}}/>
                                </td>
                            </tr>
                        </table>  
                    </>
                )),
                coursesAdmin: response.data.map((post, i) => (
                    <>
                        <table className="panel">
                            <tr>
                                <td>
                                    <div className="picdiv"><img className="pic" src={post.poster} /></div>
                                </td>
                                <td>
                                    <Link to={'/lessons/list/'+ post.slug}><div className="title">{post.title}</div></Link>
                                    <div className="text"dangerouslySetInnerHTML={{__html: post.preview}}/>
                                </td>
                                <td>
                                    <a href={"/courses/edit/"+post.slug} classname="changenew">Изменить</a>
                                </td>
                            </tr>
                        </table>  
                    </>
                ))
            }) 
        })
    }

    handleGetUserCurrent() {
        GetUserCurrent().then(response => {
            this.setState({
                status: response.data.status,
            }) 
        })
    }

    componentDidMount() {
        this.handleRenderCoursesBlock();
        this.handleGetUserCurrent();
    }

    render() {
        let isAdmin;
        if(this.state.status == "Administrator"){
                isAdmin=true;
        }
        return (
            <div>
                {isAdmin ? this.state.coursesAdmin : this.state.courses}
            </div>
        );
    }
}

export default Courses_List_Component;
