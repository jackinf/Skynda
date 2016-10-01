/**
 * Created by jevgenir on 10/1/2016.
 */

import React from "react";
import "./Details.safety.scss";
import translations from "../../../../store/locales/et";

// Images
import image_star_2x from "./../../../../static/images/standard/star@2x.png";
import image_unstar_2x from "./../../../../static/images/standard/star-1@2x.png";
import image_4_2x from "./../../../../static/images/standard/image-4@2x.png";

import Skblock from "../DetailsSkBlock/block";

const max_safety_stars = 5;

class Safety extends React.Component {
  render () {
    const stars = this.props.stars;

    return (<Skblock header={translations.routes.details.components.safety.header}>
      <div className='sk_details__safety__stars_outer_container'>
        <div className='sk_details__safety__stars_inner_container'>
          {Array.from({ length: stars }).map((_, idx) => <img key={idx} className='sk_safety__details__star' src={image_star_2x} />)}
          {Array.from({ length: max_safety_stars - stars }).map((_, idx) => <img key={idx} className='sk_safety__details__star' src={image_unstar_2x} />)}
          <img className='sk_details__safety__stars_euroncap' src={image_4_2x} />
        </div>
      </div>
    </Skblock>);
  }
}

Safety.propTypes = {
  stars: React.PropTypes.number.isRequired
};

export default Safety;
