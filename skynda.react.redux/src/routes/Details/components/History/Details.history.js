import React from "react";
import {Col, Row} from "react-bootstrap";
import "./Details.history.scss";
import Skblock from "../BlockContainer";
import {Translate} from 'react-redux-i18n';
import _ from "underscore";
class History extends React.Component {
  render() {
    return (
      <div>
        {this.props.history.foundHistory && !_.isEmpty(this.props.history.foundHistory)
          ? <Skblock className="sk_details__history" header={<Translate value="details.components.history.header"/>}>
            <div className="form-horizontal">
              <Row>
                <Col md={12}>
                  <label className="sk_details__label">
                    <Translate value="details.components.history.found_txt"/>:
                  </label>
                  <span>  {this.props.history.foundHistory}</span>
                </Col>
              </Row>
            </div>

          </Skblock> : ""
        }
      </div>
    );
  }
}

History.propTypes = {
  history: React.PropTypes.shape({
    foundHistory: React.PropTypes.string
  })
};

export default History;
