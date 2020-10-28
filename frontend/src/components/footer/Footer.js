import React, { Component } from "react";
import "./Footer.css"

class Footer extends React.Component {
    render() {
        return (
            <>
            <div className="footer-body">
                <div className="lorem" />
                <table className="links">
                    <tr>
                        <td>
                            <a href="https://vk.com/minelearning"><img src="/static/frontend/back/vk.png" className="icons"/></a>
                        </td>
                        <td>
                            <a href="https://www.youtube.com/channel/UC6xQ0sCbRy8bT-wHZUg93aA/"><img src="/static/frontend/back/yt.png" className="icons"/></a>
                        </td>
                    </tr>
                </table>
            </div>
            </>
        );
    }
}


export default Footer;