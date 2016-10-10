/**
 * Created by jevgenir on 10/1/2016.
 */

import React from "react";
import {Col} from "react-bootstrap";
import "./Details.history.scss";

import Skblock from "../BlockContainer";
import translations from "../../../../store/locales/en";

// Images
import imageDiploma1 from "./../../../../static/images/standard/diploma_1.png";

class History extends React.Component {
  render() {
    return (<Skblock header={translations.routes.details.components.history.header}>
      <Col md={6}>
        <img src={imageDiploma1} width='24' className='sk_details__icon_list_image' />
        {this.props.history.problems > 0
          ? `${translations.routes.details.components.history.problems_found}:
            ${this.props.history.problems.join(", ")}`
          : `${translations.routes.details.components.history.no_problems_found}`}
      </Col>
      <Col md={6}>
        <label>{translations.routes.details.components.history.vin}: </label> {this.props.history.vin_code}
      </Col>
    </Skblock>);
  }
}

History.propTypes = {
  history: React.PropTypes.shape({
    problems: React.PropTypes.array,
    vin_code: React.PropTypes.string
  })
};

export default History;
