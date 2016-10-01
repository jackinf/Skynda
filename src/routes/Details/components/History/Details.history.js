/**
 * Created by jevgenir on 10/1/2016.
 */

import React from 'react';
import {Col} from 'react-bootstrap';
import './Details.history.scss';

import Skblock from '../DetailsSkBlock/Details.skblock';
import translations from '../../../../store/locales/en';

// Images
import image_diploma_1 from './../../../../static/images/standard/diploma_1.png';

class Features extends React.Component {
  render() {
    const {problems, vin_code} = this.props.history;

    return (<Skblock header={translations.routes.details.components.history.header}>
      <Col md={6}>
        <img src={image_diploma_1} width="24" className="sk_details__icon_list_image"/>
        {problems > 0 ? `${translations.routes.details.components.history.problems_found}: ${problems.join(', ')}` :
          `${translations.routes.details.components.history.no_problems_found}`}
      </Col>
      <Col md={6}>
        <label>{translations.routes.details.components.history.vin}: </label> {vin_code}
      </Col>
    </Skblock>);
  }
}

Features.propTypes = {
  history: React.PropTypes.shape({
    problems: React.PropTypes.array,
    vin_code: React.PropTypes.string
  })
};

export default Features;
