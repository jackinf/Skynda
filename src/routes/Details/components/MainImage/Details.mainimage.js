/**
 * Created by ardi-pc on 09/24/16.
 */
import React from "react";

import "./Details.mainimage.scss";
import "./Details.mainimage.modal.scss";

import image_cam from "./assets/camera@2x.png";
import image_360 from "./assets/group-78@2x.png";
import { Row, Col, Button, Carousel, Modal } from "react-bootstrap";
import translations from "../../../../store/locales/et";

class ModalBtnCarousel extends React.Component {
  constructor () {
    super();
    this.state = { isShowModal: false };
  }
  onShowModal = () => {
    this.setState({ isShowModal: true });
  };

  onHideModal = () => {
    this.setState({ isShowModal: false });
  };

  render () {
    return (<span>
      <Button onClick={this.onShowModal}>
        <div className='image-btn-content-wrapper'>
          <img src={image_cam} />
          <span>{translations.routes.details.components.main_image.btn_txt_view_photos}</span>
        </div>
      </Button>

      <Modal
        bsClass='modal2'
        show={this.state.isShowModal}
        onHide={this.onHideModal}
        bsSize='lg'
      >
        <Modal.Header
          closeButton
          bsClass='modal2-header'
         />
        <Modal.Body
          bsClass='modal2-body'
        >
          <div>
            <Carousel>
              {this.props.images.map(function (row, i) {
                return (
                  <Carousel.Item className='modal-2-minimal-item-height' key={i}>
                    <img width={900} height={500} alt='900x500' src={row.original} />
                    <Carousel.Caption />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </Modal.Body>
        <Modal.Footer
          bsClass='modal2-footer'
         />
      </Modal>
    </span>);
  }
}

class ModalBtn360 extends React.Component {
  constructor () {
    super();
    this.state = { isShowModal: false };
  }
  onShowModal = () => {
    this.setState({ isShowModal: true });
  };

  onHideModal = () => {
    this.setState({ isShowModal: false });
  };

  render () {
    return (<span>
      <Button onClick={this.onShowModal}>
        <div className='image-btn-content-wrapper'>
          <img src={image_360} />
          <span>{translations.routes.details.components.main_image.btn_txt_360}</span>
        </div>
      </Button>

      <Modal
        bsClass='modal2'
        show={this.state.isShowModal}
        onHide={this.onHideModal}
        bsSize='lg'
      >
        <Modal.Header
          closeButton
          bsClass='modal2-header'
         />
        <Modal.Body
          bsClass='modal2-body'
        >
          <div className='modal-2-minimal-item-height'>
            <iframe src={this.props.src}
              width='900'
              height='506'
              frameBorder='0'
              scrolling='no'
              allowFullScreen='true'
             />
          </div>
        </Modal.Body>
        <Modal.Footer
          bsClass='modal2-footer'
         />
      </Modal>
    </span>);
  }
}

class MainImage extends React.Component {
  constructor () {
    super();
    this.state = { isShowModal: false };
  }

  render () {
    const { src, year, brand, model, engine, horsepower } = this.props.car.general;
    const images = this.props.car.images;
    const source360 = "https://www.panono.com/p/jmr7n52eIbDn/embed?autorotate=false";

    return (
      <div classID='car_detail_image' className='car-details-main-image'>

        <div className='image-preview'>
          <a>
            <img src={src} className='main-image' />
          </a>

          <div className='info-panel-bg' />

          <div className='info-panel'>
            <Row className='info-panel-primary-row '>
              <Col sm={12}>
                <span style={{ margin: "0 15px 0 0" }}>{year}</span>
                <span style={{ margin: "0 15px 0 0" }}>{brand}</span>
                <span style={{ margin: "0 15px 0 0" }}>{model}</span>
                <span style={{ margin: "0 15px 0 0" }}>{engine}</span>
                <span style={{ margin: "0 15px 0 0" }}>({horsepower})</span>
              </Col>
            </Row>
            <Row className='image-buttons'>
              <Col sm={12}>
                <span style={{ margin: "0 25px 0 0" }}>
                  <ModalBtnCarousel images={images} />
                </span>
                <span style={{ margin: "0 25px 0 0" }}>
                  <ModalBtn360 src={source360} />
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
    general: React.PropTypes.shape({
      src: React.PropTypes.string.isRequired,
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
