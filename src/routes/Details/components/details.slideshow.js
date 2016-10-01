//REPLACED with MainImage

// /**
//  * Created by zekar on 9/15/2016.
//  */
//
// import React from 'react';
// import NukaCarousel from 'nuka-carousel';
// import {Carousel} from 'react-bootstrap';
// import OwlCarousel from 'react-owl-carousel';
// // import "react-image-gallery/styles/scss/image-gallery.scss";
//
// // import 'owl.carousel/dist/assets/owl.carousel.css';
// // import $ from 'jquery';
// // import 'imports?jQuery=jquery!owl.carousel';
//
// // Nuka carousel
// var nukaCarousel = (images) => {
//   let imageElements = images.map((image, i) => (<img key={i} src={image} />));
//   // react-router breaks the nuka-slider, temp fix is this: style={{height:'300px'}} frameOverflow='inherit'
//   return (<NukaCarousel autoplay={true} wrapAround={true}>
//     {imageElements}
//   </NukaCarousel>);
// };
//
// // Bootstrap carousel
// var bootstrapCarousel = (images) => {
//   return (<Carousel style={{height: '300px'}}>
//     {images.map((image, i) => (<Carousel.Item key={i} style={{height: '300px'}}>
//       <img alt="900x500" src={image}/>
//     </Carousel.Item>))}
//   </Carousel>);
// };
//
// // Owl carousel
// var owlCarousel = (images) => {
//   return (<OwlCarousel slideSpeed={300} navigation singleItem autoPlay >
//     <div><img src={images[0]} alt="The Last of us"/></div>
//     <div><img src={images[1]} alt="GTA V"/></div>
//     <div><img src={images[2]} alt="Mirror Edge"/></div>
//   </OwlCarousel>)
// };
//
// // Images
// import image1 from './../../../static/images/cars/accord/accord.jpg';
// import image2 from './../../../static/images/cars/accord/accord2.jpg';
// import image3 from './../../../static/images/cars/accord/accord3.jpg';
// import image4 from './../../../static/images/cars/accord/accord4.jpg';
//
// // const images = [image1, image2, image3, image4];
//
//
// import ImageGallery from 'react-image-gallery';
//
// class MyComponent extends React.Component {
// constructor() {
//   super();
//   this._renderItem = this._renderItem.bind(this);
//   this.handleImageLoad = this.handleImageLoad.bind(this);
// }
//
//   handleImageLoad(event) {
//     console.log("balbal");
//     event.fullScreen()
//   }
//
//   _renderItem(item) {
//     return (
//       <div className='image-gallery-image'>
//         <img
//           src={item.original}
//           alt={item.originalAlt}
//           srcSet={item.srcSet}
//           sizes={item.sizes}
//           onLoad={this.props.onImageLoad}
//         />
//         {
//           item.description &&
//           <span className='image-gallery-description'>
//               {item.description}
//             </span>
//         }
//       </div>
//     );
//   }
//
//   render() {
//
//     const images = [
//       {
//         original: image1,
//         thumbnail: image1,
//         // originalClass: 'featured-slide',
//         // thumbnailClass: 'featured-thumb',
//         // originalAlt: 'original-alt',
//         // thumbnailAlt: 'thumbnail-alt',
//         // thumbnailLabel: 'Optional',
//         // description: 'Optional description...',
//         // srcSet: 'Optional srcset (responsive images src)',
//         // sizes: 'Optional sizes (image sizes relative to the breakpoint)'
//       },
//       {
//         original: image2,
//         thumbnail: image2
//       },
//       {
//         original: image3,
//         thumbnail: image3
//       }
//     ];
//     {/*ref={i => this._imageGallery = i}*/}
//     return (
//       <ImageGallery
//         lazyLoad={true}
//         items={images}
//         slideInterval={2000}
//         renderItem={this._renderItem}
//         onImageLoad={this.handleImageLoad}/>
//     );
//   }
//
// }
//
// class Slideshow extends React.Component {
//   render() {
//     return (<div>
//       <MyComponent />
//       {/*{owlCarousel(images)}*/}
//     </div>)
//   }
// }
//
// // const Slideshow = React.createClass({
// //   // mixins: [Carousel.ControllerMixin],
// //   render() {
// //     return (<div>
// //       {/*{nukaCarousel(images)}*/}
// //       {/*{bootstrapCarousel(images)}*/}
// //       {owlCarousel(images)}
// //     </div>)
// //   }
// // });
//
// export default Slideshow;
