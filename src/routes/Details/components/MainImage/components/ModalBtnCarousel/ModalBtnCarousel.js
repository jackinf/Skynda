/**
 * Created by jevgenir on 10/10/2016.
 */

import React from "react";
import imageCam from "./assets/camera@2x.png";
import "./../../Details.mainimage.scss";
import "./../../Details.mainimage.modal.scss";

import {Button, Carousel, Modal} from "react-bootstrap";
import { Translate } from 'react-redux-i18n';

class ModalBtnCarousel extends React.Component {

  render() {
    const {onShowModal, onHideModal, isShowModal, images} = this.props;

    return (<span>
      <Button onClick={onShowModal}>
        <div className='image-btn-content-wrapper'>
          <img src={imageCam}/>
          <span><Translate value="details.components.main_image.btn_txt_view_photos"/></span>
        </div>
      </Button>

      <Modal
        bsClass='modal2'
        show={isShowModal}
        onHide={onHideModal}
        bsSize='lg'
      >
        <Modal.Header closeButton bsClass='modal2-header' />
        <Modal.Body bsClass='modal2-body'>
          <div>
            <Carousel>
              {images.map(function(image, i) {
                return (
                  <Carousel.Item className='modal-2-minimal-item-height' key={i}>
                    <img width={900} height={500} alt='900x500' src={image}/>
                    <Carousel.Caption />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        </Modal.Body>
        <Modal.Footer bsClass='modal2-footer'/>
      </Modal>
    </span>);
  }
}

ModalBtnCarousel.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  isShowModal: React.PropTypes.bool.isRequired,
  onShowModal: React.PropTypes.func.isRequired,
  onHideModal: React.PropTypes.func.isRequired
};

export default ModalBtnCarousel;
