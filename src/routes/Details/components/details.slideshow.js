/**
 * Created by zekar on 9/15/2016.
 */

import React from 'react';
import Carousel from 'nuka-carousel';

// Images
import image1 from './../../../static/images/cars/accord/accord.jpg';
import image2 from './../../../static/images/cars/accord/accord2.jpg';
import image3 from './../../../static/images/cars/accord/accord3.jpg';
import image4 from './../../../static/images/cars/accord/accord4.jpg';

const images = [image1, image2, image3, image4];

const Slideshow = React.createClass({
  // mixins: [Carousel.ControllerMixin],
  render() {
    let imageElements = images.map((image, i) => (<img key={i} src={image} />));

    return (
      <Carousel style={{height:'300px'}} frameOverflow='inherit' autoplay={true} wrapAround={true}>
        {imageElements}
      </Carousel>
    )
  }
});

export default Slideshow;
