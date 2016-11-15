/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE} from "../constants/VehicleReport.constant";
import {submitVehicleForm} from "../actions";
import {Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";

class Vehicle extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    submitVehicleForm: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    fillWithFakeData: React.PropTypes.func.isRequired,

    // vehicle review data
    initialValues: React.PropTypes.shape({
      // TODO
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_ID]
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleModelsList();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    this.props.handleSubmit(data => submitVehicleForm(data, this.props.formMode1))(e)
      .then(() => {
          if (!!this.props.submitSucceeded) {
            browserHistory.push(`/admin/vehicle-reviews`);
          }
        },
        () => (console.log("error")));
  };

  render() {
    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form onSubmit={this.onSubmit.bind(this)}>
            <button type="submit" disabled={this.props.submitting}>Submit</button>
          </form>

        )}
      </div>
    )
  }
}

export default Vehicle;
