/**
 * Created by ardi-pc on 09/24/16.
 */
import React from 'react';

import './details.mainimage.scss';
import './details.mainimage.modal.scss';

import image_cam from './../../../../static/images/standard/camera@2x.png';
import image_360 from './../../../../static/apple-touch-icon.png';
import {Row, Col, Button, Carousel, Modal} from 'react-bootstrap';

class CarouselModalBtn extends React.Component {
  constructor(){
    super();
    this.state = {isShowModal: false};
  }
  onShowModal = () => {
    this.setState({isShowModal: true})
  };

  onHideModal = () => {
    this.setState({isShowModal: false})
  };

  render() {

    return (<span>
      <Button onClick={this.onShowModal}>
        <div className="image-btn-content-wrapper">
          <img src={image_cam}></img>
          <span>View Photos</span>
        </div>
      </Button>

      <Modal
        bsClass="modal2"
        show={this.state.isShowModal}
        onHide={this.onHideModal}
        bsSize="lg"
      >
        <Modal.Header
          closeButton
          bsClass="modal2-header"
        >
        </Modal.Header>
        <Modal.Body
          bsClass="modal2-body"
        >
          <div>
            <Carousel>
              {this.props.images.map(function(row, i) {
                return (
                  <Carousel.Item className="modal-2-minimal-img-item-height" key={i}>
                    <img width={900} height={500} alt="900x500" src={row.original}/>
                    <Carousel.Caption>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </Modal.Body>
        <Modal.Footer
          bsClass="modal2-footer"
        >
        </Modal.Footer>
      </Modal>
    </span>)
  }
}

class CarDetailsMainImage extends React.Component {
  constructor() {
    super();
    this.state = {isShowModal: false}
  }

  render() {

    const {src, year, brand, model, engine, horsepower, images} = this.props.car;

    return (
      <div classID="car_detail_image" className="car-details-main-image">

        <div className='image-preview'>
          <a>
            <img src={src} className='main-image'/>
          </a>

          <div className='info-panel-bg'>
          </div>

          <div className='info-panel'>
            <Row className="info-panel-primary-row ">
              <Col sm={12}>
                <span style={{margin: "0 15px 0 0"}}>{year}</span>
                <span style={{margin: "0 15px 0 0"}}>{brand}</span>
                <span style={{margin: "0 15px 0 0"}}>{model}</span>
                <span style={{margin: "0 15px 0 0"}}>{engine}</span>
                <span style={{margin: "0 15px 0 0"}}>({horsepower})</span>
              </Col>
            </Row>
            <Row className="image-buttons">
              <Col sm={12}>
                <span style={{margin: "0 25px 0 0"}}>
                  <CarouselModalBtn images={images}/>
                </span>
                <span style={{margin: "0 25px 0 0"}}>
                  <Button>
                    <div className="image-btn-content-wrapper">
                      <img src={image_360}></img>
                      <span>360 View</span>
                    </div>
                  </Button>
                </span>


              </Col>
            </Row>
          </div>

        </div>
      </div>

    )
  }
}

CarDetailsMainImage.propTypes = {
  car: React.PropTypes.shape({
    src: React.PropTypes.string.isRequired,
    year: React.PropTypes.number.isRequired,
    brand: React.PropTypes.string,
    model: React.PropTypes.string,
    engine: React.PropTypes.string,
    horsepower: React.PropTypes.string,
    images: React.PropTypes.array
  }).isRequired
};

export default CarDetailsMainImage
