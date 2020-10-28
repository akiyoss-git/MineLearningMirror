import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./news.css";
import { GetUserCurrent } from "./../../../services/api/user/edit/edit_service";
import { GetNewList } from '../../../services/api/news/news_service';

class News_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            newsAdmin: null,
            status: null,
        };
        this.handleRenderNewsBlock = this.handleRenderNewsBlock.bind(this);
    }
    handleRenderNewsBlock() {
        GetNewList().then(response => {
            this.setState({
                news: response.data.map((post, i) => (
                    <>
                        <table className="block">
                            <tr>
                                <td>
                                    <div className="picdiv"><img className="pic" src={post.poster} /></div>
                                </td>
                                <td>
                                    <div className="title">{post.title}</div>
                                    <div className="text" dangerouslySetInnerHTML={{__html: post.preview}}/>
                                </td>
                            </tr>
                        </table>
                    </>
                )),
                newsAdmin: response.data.map((post, i) => (
                    <>
                        <table className="block">
                            <tr>
                                <td>
                                    <div className="picdiv"><img className="pic" src={post.poster} /></div>
                                </td>
                                <td>
                                    <div className="title">{post.title}</div>
                                    <div className="text" dangerouslySetInnerHTML={{__html: post.preview}}/>
                                </td>
                                <td>
                                    <a href={"/news/edit/"+post.slug} classname="changenew">Изменить</a>
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
        this.handleRenderNewsBlock();
        this.handleGetUserCurrent();
    }
    

      render() {
        let news;
        if(this.state.status == "Administrator"){
            news = this.state.newsAdmin;
        }
        else{
            news = this.state.news;
        }
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <div className="newsblock"><h2>Новости</h2></div>
                    {news}
                </ul>
            </div>
        );
      }
}

export default News_Component;
