/**
 * Created by jevgenir on 10/1/2016.
 */

import React from "react";
import {Col} from "react-bootstrap";
import "./Details.history.scss";

import Skblock from "../BlockContainer";
import {Translate} from 'react-redux-i18n';

// Images
import imageDiploma1 from "./../../../../static/images/standard/diploma_1@2x.png";

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
      <Col md={6}>
        <div className={statusClass}>
          <img src={imageDiploma1} width='24' className='sk_details__history_icon-list-image' />
          {problems}
        </div>
      </Col>
      <Col md={6}>
        <label><Translate value="details.components.history.vin"/>: </label> {this.props.history.vinCode}
      </Col>
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
