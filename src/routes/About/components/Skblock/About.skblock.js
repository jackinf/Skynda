import React from "react";
import './About.skblock.scss';

import {Row} from 'react-bootstrap';

class Skblock extends React.Component {
  render() {
    return (<Row className="about-skblock sk_details__skblock">
      <h4 className="blue_header">{this.props.header}</h4>
      <div>{ this.props.children }</div>
    </Row>);
  }
}

export default Skblock;
