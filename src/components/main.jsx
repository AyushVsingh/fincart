import React from "react";
import { Carousel } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

const Home = () => {
  return (
    <div className="hero border-1 pb-3">
      <Carousel className="mx-3">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/Image3.jpg"
            alt="First slide"
            height={250}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/Image2.jpg"
            alt="Second slide"
            height={250}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./assets/girl.jpg"
            alt="Third slide"
            height={250}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Home;
