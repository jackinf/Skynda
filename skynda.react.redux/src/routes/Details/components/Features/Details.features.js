/**
 * Created by jevgenir on 10/1/2016.
 */

import React from "react";
import {Col} from "react-bootstrap";
import "./Details.features.scss";

import Skblock from "../BlockContainer";
import {Translate} from 'react-redux-i18n';

// Images
import imageOk from "./../../../../static/images/standard/ok@2x.png";

class Features extends React.Component {
  render() {
    const features = this.props.features;

    return (
      <Skblock
        className="sk_details__feature"
        header={<Translate value="details.components.features.header"/>}
      >
        <ul className="sk_details__feature_ul">
          {features.map((feature, i) => (<li key={i}>
            <img src={imageOk} className='sk_details__feature__icon_list_image' />
            <span className="sk_details__feature__icon_list_text">{feature}</span>
          </li>))}
        </ul>
      </Skblock>);
  }
}

Features.propTypes = {
  features: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Features;
