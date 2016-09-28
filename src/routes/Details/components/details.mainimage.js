/**
 * Created by ardi-pc on 09/24/16.
 */
import React from 'react';

import './details.mainimage.scss';
import image_cam from './../../../static/images/standard/camera@2x.png';
import image_360 from './../../../static/apple-touch-icon.png';
import {Row, Col, Button, Carousel, Modal} from 'react-bootstrap';
 import ImageGallery from 'react-image-gallery';


class CarouselComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      showBullets: true
    }
    // this._renderItem = this._renderItem.bind(this);
    this._onImageLoad = this._onImageLoad.bind(this);
  }

  _onImageLoad(event) {
    console.log('Image loaded ', event.target)
    // this._imageGallery.fullScreen()
    console.log('fullscr ', this._imageGallery)

  }

  // _renderItem(item) {
  //   // const onImageError = this.props.onImageError || this._handleImageError;
  //   console.log("sitak'tt");
  //   return (
  //     <div className='image-gallery-image'>
  //       <img
  //         style={{height: '500px'}}
  //         src={item.original}
  //         alt={item.originalAlt}
  //         srcSet={item.srcSet}
  //         sizes={item.sizes}
  //         onLoad={this.fullScreen}
  //       />
  //       {
  //         item.description &&
  //         <span className='image-gallery-description'>
  //             {item.description}
  //           </span>
  //       }
  //     </div>
  //   );
  // }

  render() {

    const images = this.props.images;
    return (
      <ImageGallery
        ref={i => this._imageGallery = i}
        lazyLoad={true}
        items={images}
        slideInterval={2000}
        onImageLoad={this._onImageLoad}
        showBullets={this.state.showBullets}
      />
    );
  }
}

const carouselInstance = (
  <Carousel>
    <Carousel.Item>
      <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

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
        show={this.state.isShowModal}
        onHide={this.onHideModal}
        bsSize="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {this.props.images.map(function(row, i) {
              return (
                <Carousel.Item key={i}>
                  <img width={900} height={500} alt="900x500" src={row.original}/>
                  <Carousel.Caption>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Modal.Body>
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
        {/*<CarouselComponent images={images}/>*/}
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
