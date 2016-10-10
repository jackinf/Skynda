/**
 * Created by jevgenir on 10/10/2016.
 */

import React from "react";
import imageCam from "./assets/camera@2x.png";
import "./Details.mainimage.scss";
import "./Details.mainimage.modal.scss";

import {Button, Carousel, Modal} from "react-bootstrap";
import translations from "../../../../../../store/locales/et";

class ModalBtnCarousel extends React.Component {
  constructor() {
    super();
    this.state = {isShowModal: false};
  }

  onShowModal = () => {
    this.setState({isShowModal: true});
  };

  onHideModal = () => {
    this.setState({isShowModal: false});
  };

  render() {
    return (<span>
      <Button onClick={this.onShowModal}>
        <div className='image-btn-content-wrapper'>
          <img src={imageCam}/>
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
              {this.props.images.map(function(row, i) {
                return (
                  <Carousel.Item className='modal-2-minimal-item-height' key={i}>
                    <img width={900} height={500} alt='900x500' src={row.original}/>
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

ModalBtnCarousel.propTypes = {
  images: React.PropTypes.arrayOf(React.PropTypes.shape({
    original: React.PropTypes.string
  })).isRequired
};

export default ModalBtnCarousel;
