/**
 * Created by zekar on 9/15/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";
import "./Details.overview.scss";
import translations from "../../../../store/locales/et";

import Skblock from "../BlockContainer";

class Overview extends React.Component {
  render() {
    const overview = this.props.overview;

    return (<Skblock header={translations.routes.details.components.overview.header}>
      {overview.map((item, i) => (<Col key={i} md={3} className='overview__overview-block'>
        <Row className='overview__overview-icon-row'>
          <Col md={12} className='overview__overview-icon-col'>
            <img src={item.iconUrl} alt='' className='overview__overview-icon' />
          </Col>
        </Row>
        <Row className='overview__overview-label-row'>
          <Col md={12} className='overview__overview-label-col'>
            <span className='overview__overview-label'>{item.label}</span>
          </Col>
        </Row>
      </Col>))}
    </Skblock>);
  }
}

Overview.propTypes = {
  overview: React.PropTypes.arrayOf(React.PropTypes.shape({
    label: React.PropTypes.string.isRequired,
    iconUrl: React.PropTypes.string.isRequired
  }))
};

export default Overview;
