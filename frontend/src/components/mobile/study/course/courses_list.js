import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./courses.css";
import { GetCourseList } from '../../../../services/api/study/courses_service';

class Courses_List_Component_Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: null,
        };
        this.handleRenderCoursesBlock = this.handleRenderCoursesBlock.bind(this);
    }

    handleRenderCoursesBlock() {
        GetCourseList().then(response => {
            this.setState({
                courses: response.data.map((post, i) => (
                    <>
                        <table className="panel-m">
                            <tr>
                                <td>
                                    <div className="picdiv-m"><img className="pic" src={post.poster} /></div>
                                </td>
                                <td>
                                    <Link to={'/lessons/list/'+ post.slug}><div className="title">{post.title}</div></Link>
                                    <div className="text-m"dangerouslySetInnerHTML={{__html: post.preview}}/>
                                </td>
                            </tr>
                        </table>  
                    </>
                ))
            }) 
        })
    }

    componentDidMount() {
        this.handleRenderCoursesBlock();
    }

    render() {
        return (
            <div>
                {this.state.courses}
            </div>
        );
    }
}

export default Courses_List_Component_Mobile;
