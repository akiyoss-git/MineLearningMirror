import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./news.css";
import { GetUserCurrent } from "./../../../../services/api/user/edit/edit_service";
import { GetNewList } from '../../../../services/api/news/news_service';

class News_Component extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            newsAdmin: null,
        };
        this.handleRenderNewsBlock = this.handleRenderNewsBlock.bind(this);
    }
    handleRenderNewsBlock() {
        GetNewList().then(response => {
            this.setState({
                news: response.data.map((post, i) => (
                    <>
                        <table className="block-m">
                            <tr>
                                <td>
                                    <div className="title-m">{post.title}</div>
                                    <div className="text-m" dangerouslySetInnerHTML={{__html: post.preview}}/>
                                    <div className="picdiv-m"><img className="pic" src={post.poster} /></div>
                                </td>
                            </tr>
                        </table>
                    </>
                )),
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
            news = this.state.news;
        return (
            <div>
                <ul className="list-group list-group-flush">
                    <div className="newsblock-m"><h2>Новости</h2></div>
                    {news}
                </ul>
            </div>
        );
      }
}

export default News_Component;
