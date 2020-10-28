import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel'
import "./panels.css"

class PanelPage extends Component {
  render() {
  return (
    <div className="crs">
    <Carousel>
    <Carousel.Item>
      <a href="/about">
      <img
        className="d-block w-100"
        src="/static/frontend/img/p1.png"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Minelearning</h3>
        <p>Уникальный проект на основе Minecraft.</p>
      </Carousel.Caption>
      </a>
    </Carousel.Item>
    <Carousel.Item>
      <a href="/school">
      <img
        className="d-block w-100"
        src="/static/frontend/img/p2.png"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Обучение</h3>
        <p>Наш сервер предлагает пространство для обучения красному камню и командным блокам</p>
      </Carousel.Caption>
      </a>
    </Carousel.Item>
    <Carousel.Item>
      <a href="/signup">
      <img
        className="d-block w-100"
        src="/static/frontend/img/p3.png"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Развлечение</h3>
        <p>Но тем не менее это игровой сервер! Скорее регистрируйся!</p>
      </Carousel.Caption>
      </a>
    </Carousel.Item>
  </Carousel>
  </div>
);
  }

}

export default PanelPage;