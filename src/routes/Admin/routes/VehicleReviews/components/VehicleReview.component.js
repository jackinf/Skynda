/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE} from "../constants/VehicleReview.constant";
import {formSubmit} from "../actions";
import {Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";
import {onFormSubmitSuccess, onFormSubmitError} from "../actions/VehicleReview.submitForm.action";
import {VehiclesSelectField} from "./VehicleReview.component.renderers";
import {
  TextField
} from 'redux-form-material-ui'

class VehicleReview extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    formSubmit: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    getVehiclesList: React.PropTypes.func.isRequired,
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
    this.props.getVehiclesList();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    this.props.handleSubmit(data => formSubmit(data, this.props.formMode1))(e)
      .then(() => onFormSubmitSuccess(!!this.props.submitSucceeded), onFormSubmitError);
  };

  render() {
    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form onSubmit={this.onSubmit.bind(this)}>
            <h3>{this.props.formMode1}</h3>

            <VehiclesSelectField name="vehicleId" label="Vehicle *" vehicles={this.props.vehicles} />

            <Row>
              <Col sm={12}>
                <Field name="text" component={TextField} hintText="Text" />
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Field name="rating" component={TextField} hintText="Rating" />
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Field name="logo.url" component={TextField} hintText="Logo URL" />
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Field name="video.url" component={TextField} hintText="Video URL" />
              </Col>
            </Row>

            <button type="submit" disabled={this.props.submitting}>Submit</button>
          </form>

        )}
      </div>
    )
  }
}

export default VehicleReview;
