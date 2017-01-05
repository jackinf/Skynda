import React from "react";
import {Col, Row} from "react-bootstrap";
import "./Details.history.scss";
import Skblock from "../BlockContainer";
import {Translate} from 'react-redux-i18n';

class History extends React.Component {
  render() {
    const isAnyProblems = this.props.history.problems && this.props.history.problems.length > 0;
    const problems = isAnyProblems
      ? (<div>
          <label><Translate value="details.components.history.problems_found"/>:&nbsp;</label>
          {this.props.history.problems.join(", ")}
        </div>)
      : <Translate value="details.components.history.no_problems_found"/>;
    const statusClass = isAnyProblems ? "sk_details__history_status-red" : "sk_details__history_status-green";

    return (<Skblock className="sk_details__history" header={<Translate value="details.components.history.header"/>}>
      <div className="form-horizontal">
        <Row>
          <Col md={12}>
            <label className="sk_details__label">
              <Translate value="details.components.history.found_txt"/>:
            </label>
            <span>  {problems}</span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
              <label className="sk_details__label">
                <Translate value="details.components.history.vin"/>:
              </label>
              <span>  {this.props.history.vinCode}</span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <label className="sk_details__label">
              <Translate value="details.components.history.registration_plate"/>:
            </label>
            <span>  {this.props.history.registrationPlate}</span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <span><Translate value="details.components.history.check_history_from" /></span>
            <span> <a target='_blank' href="https://eteenindus.mnt.ee/public/soidukTaustakontroll.jsf">
              <Translate value="details.components.history.original_registry" /></a>.</span>
          </Col>
        </Row>
      </div>

    </Skblock>);
  }
}

History.propTypes = {
  history: React.PropTypes.shape({
    problems: React.PropTypes.array,
    vinCode: React.PropTypes.string
  })
};

export default History;
