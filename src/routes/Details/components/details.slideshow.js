/**
 * Created by zekar on 9/15/2016.
 */

import React from 'react';
import NukaCarousel from 'nuka-carousel';
import {Carousel} from 'react-bootstrap';

// Nuka carousel
var nukaCarousel = (images) => {
  let imageElements = images.map((image, i) => (<img key={i} src={image} />));
  // react-router breaks the nuka-slider, temp fix is this: style={{height:'300px'}} frameOverflow='inherit'
  return (<NukaCarousel autoplay={true} wrapAround={true}>
    {imageElements}
  </NukaCarousel>);
};

// Bootstrap carousel
var bootstrapCarousel = (images) => {
  return (<Carousel style={{height: '300px'}}>
    {images.map((image, i) => (<Carousel.Item key={i} style={{height: '300px'}}>
      <img alt="900x500" src={image}/>
    </Carousel.Item>))}
  </Carousel>);
}

// Images
import image1 from './../../../static/images/cars/accord/accord.jpg';
import image2 from './../../../static/images/cars/accord/accord2.jpg';
import image3 from './../../../static/images/cars/accord/accord3.jpg';
import image4 from './../../../static/images/cars/accord/accord4.jpg';

const images = [image1, image2, image3, image4];


const Slideshow = React.createClass({
  // mixins: [Carousel.ControllerMixin],
  render() {
    return (<div>
      {nukaCarousel(images)}
      {bootstrapCarousel(images)}
    </div>)
  }
});

export default Slideshow;
