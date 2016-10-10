import React from "react";

import "./Details.mainimage.scss";
import "./Details.mainimage.modal.scss";

import image360 from "./assets/group-78@2x.png";
import {Button, Modal} from "react-bootstrap";
import translations from "../../../../../../store/locales/et";

class ModalBtn360 extends React.Component {
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
          <img src={image360}/>
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

ModalBtn360.propTypes = {
  src: React.PropTypes.string.isRequired
};

export default ModalBtn360;
