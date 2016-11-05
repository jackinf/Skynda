/**
 * Created by ardi-pc on 09/24/16.
 */
import React from "react";

import "./Details.mainimage.scss";
import "./Details.mainimage.modal.scss";

import {Row, Col} from "react-bootstrap";

// Local components
import ModalBtnCarousel from "./components/ModalBtnCarousel";
import ModalBtn360 from "./components/ModalBtn360";

class MainImage extends React.Component {
  constructor() {
    super();
    this.state = {isShowModal: false};
  }

  render() {
    const {src, year, brand, model, engine, horsepower} = this.props.car.general;
    const images = this.props.car.images ? this.props.car.images
      .filter(image => image.imageContainer)
      .map(image => ({original: image.imageContainer.imageUrl})) : [];
    const source360 = "https://www.panono.com/p/jmr7n52eIbDn/embed?autorotate=false";

    return (
      <div classID='car_detail_image' className='car-details-main-image'>

        <div className='image-preview'>
          <a>
            <img src={src} className='main-image'/>
          </a>

          <div className='info-panel-bg'/>

          <div className='info-panel'>
            <Row className='info-panel-primary-row '>
              <Col sm={12}>
                <span style={{margin: "0 15px 0 0"}}>{year}</span>
                <span style={{margin: "0 15px 0 0"}}>{brand}</span>
                <span style={{margin: "0 15px 0 0"}}>{model}</span>
                <span style={{margin: "0 15px 0 0"}}>{engine}</span>
                <span style={{margin: "0 15px 0 0"}}>({horsepower})</span>
              </Col>
            </Row>
            <Row className='image-buttons'>
              <Col sm={12}>
                <span style={{margin: "0 25px 0 0"}}>
                  <ModalBtnCarousel images={images}/>
                </span>
                <span style={{margin: "0 25px 0 0"}}>
                  <ModalBtn360 src={source360}/>
                </span>

              </Col>
            </Row>
          </div>

        </div>
      </div>

    );
  }
}

MainImage.propTypes = {
  car: React.PropTypes.shape({
    mainImageUrl: React.PropTypes.string.isRequired,
    general: React.PropTypes.shape({
      src: React.PropTypes.string,
      year: React.PropTypes.number.isRequired,
      brand: React.PropTypes.string,
      model: React.PropTypes.string,
      engine: React.PropTypes.string,
      horsepower: React.PropTypes.string
    }),
    images: React.PropTypes.array
  }).isRequired
};

export default MainImage;
