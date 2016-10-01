/**
 * Created by jevgenir on 10/1/2016.
 */

import React from 'react';
import {Col} from 'react-bootstrap';
import './Details.features.scss';

import Skblock from '../details.skblock';
import translations from '../../../../store/locales/en';

// Images
import image_ok from './../../../../static/images/standard/ok.png';

class Features extends React.Component {
  render() {
    const features = this.props.features;

    return (<Skblock header={translations.routes.details.components.features.header}>
      {features.map((feature, i) => (<Col key={i} md={6} className="sk_details__feature_block">
        <img src={image_ok} className="sk_details__feature__icon_list_image"/>
        <span>{feature}</span>
      </Col>))}
    </Skblock>);
  }
}

Features.propTypes = {
  features: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

export default Features;
