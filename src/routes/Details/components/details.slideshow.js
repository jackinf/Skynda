/**
 * Created by zekar on 9/15/2016.
 */
var React = require('react');
var Carousel = require('nuka-carousel');
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

// Images
import image1 from './../../../public/images/cars/accord/accord.jpg';
import image2 from './../../../public/images/cars/accord/accord2.jpg';
import image3 from './../../../public/images/cars/accord/accord3.jpg';
import image4 from './../../../public/images/cars/accord/accord4.jpg';

const images = [image1, image2, image3, image4];

const Slideshow = React.createClass({
  mixins: [Carousel.ControllerMixin],
  render() {
    let imageElements = images.map((image, i) => (<img key={i} src={image} />));

    return (
      <Carousel autoplay={true} wrapAround={true}>
        {imageElements}
      </Carousel>
    )
  }
});



// const Slideshow = () => (
//   <Card>
//     <CardHeader
//       title="MAZDA TRALALA!"
//       subtitle="BEST FUCKING MAZDA EVER!! "
//       avatar="images/jsa-128.jpg"
//     />
//     <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />} className={s.test123}>
//       <Slideshow1 />
//     </CardMedia>
//   </Card>
// );

{/*const Slideshow = () => (<div>Slideshow goes here...</div>);*/}

// const Slideshow = () => (<div className="banner">
//   <button ng-click="is360View=!is360View" type="button" className="btn btn-primary btn--360" aria-label="Left Align" > {/* style="position: absolute; z-index: 100" */}
//     <span ng-if="!is360View"><img src="images/group-78@2x.png" alt="" /> Look Inside</span>
//     <span ng-if="is360View"><img src="images/camera@2x.png" alt="" /> View Photos</span>
//   </button>
//   <div className="slideshow" ng-show="!is360View">
//     <div className="slider-banner-container">
//       <div className="slider-banner">
//         <ul>
//           <li data-transition="random" data-slotamount="7" data-masterspeed="500" data-saveperformance="on"
//               ng-repeat="slide in slides"
//               data-title="Buy a car">
//
//             {/*<!-- main image -->*/}
//             <img ng-src="{{slide.image}}"  alt="slidebg1" data-bgposition="center top" data-bgfit="cover" data-bgrepeat="no-repeat" />
//
//             <div className="tp-caption default_bg large sfr tp-resizeme" data-x="0" data-y="70" data-speed="600"
//                  data-start="1200" data-end="9400" data-endspeed="600">
//               {/*{{slide.brand}}*/}
//             </div>
//
//             <div className="tp-caption dark_gray_bg sfl medium tp-resizeme" data-x="0" data-y="170" data-speed="600"
//                  data-start="1600" data-end="9400" data-endspeed="600"><i className="icon-check"></i>
//             </div>
//             <div className="tp-caption light_gray_bg sfb medium tp-resizeme" data-x="50" data-y="170" data-speed="600"
//                  data-start="1600" data-end="9400" data-endspeed="600">
//               {/*{{slide.text1}}*/}
//             </div>
//             <div className="tp-caption dark_gray_bg sfl medium tp-resizeme" data-x="0" data-y="220" data-speed="600"
//                  data-start="1800" data-end="9400" data-endspeed="600"><i className="icon-check"></i>
//             </div>
//             <div className="tp-caption light_gray_bg sfb medium tp-resizeme" data-x="50" data-y="220" data-speed="600"
//                  data-start="1800" data-end="9400" data-endspeed="600">
//               {/*{{slide.text2}}*/}
//             </div>
//             <div className="tp-caption dark_gray_bg sfl medium tp-resizeme" data-x="0" data-y="270" data-speed="600"
//                  data-start="2000" data-end="9400" data-endspeed="600"><i className="icon-check"></i>
//             </div>
//             <div className="tp-caption light_gray_bg sfb medium tp-resizeme" data-x="50" data-y="270" data-speed="600"
//                  data-start="2000" data-end="9400" data-endspeed="600">
//               {/*{slide.text3}}*/}
//             </div>
//           </li>
//         </ul>
//         <div className="tp-bannertimer tp-bottom"></div>
//       </div>
//     </div>
//   </div>
//   {/*<iframe ng-show="is360View" src="https://www.panono.com/p/jmr7n52eIbDn/embed?autorotate=false" width="100%" height="520" frameborder="0" scrolling="no" allowfullscreen></iframe>*/}
// </div>);

export default Slideshow;
