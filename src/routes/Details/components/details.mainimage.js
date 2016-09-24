/**
 * Created by ardi-pc on 09/24/16.
 */
import React from 'react';

import image1 from './../../../static/images/cars/accord/accord.jpg';
import image2 from './../../../static/images/cars/accord/accord2.jpg';
import image3 from './../../../static/images/cars/accord/accord3.jpg';

class CarDetailsMainImage extends React.Component {
  constructor() {
    super();
    // this._renderItem = this._renderItem.bind(this);
  }

  // _renderItem(item) {
  //   // const onImageError = this.props.onImageError || this._handleImageError;
  //
  //   return (
  //     <div className='image-gallery-image'>
  //       <img
  //         style={{height: '500px'}}
  //         src={item.original}
  //         alt={item.originalAlt}
  //         srcSet={item.srcSet}
  //         sizes={item.sizes}
  //         onLoad={this.props.onImageLoad}
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
    const images = [
      {
        original: image1,
        thumbnail: image1,
      },
      {
        original: image2,
        thumbnail: image2
      },
      {
        original: image3, 
        thumbnail: image3
      }
    ];


    return (
      <div className="details-main-image">
        <img  src={images[0].thumbnail}/>
      </div>
    )
  }
}


export default CarDetailsMainImage
