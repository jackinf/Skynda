import React from 'react';
import {Field, change} from 'redux-form';
import {ROUTE_PARAMS, FORMS} from "../constants/VehicleReview.constant";
import {Row, Col} from "react-bootstrap";
import {onFormSubmitSuccess, onFormSubmitError, formSubmit} from "../actions";
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

    // vehicle review data
    initialValues: React.PropTypes.shape({
      // TODO
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_REVIEW_ID]
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_REVIEW_ID]);
    this.props.getVehiclesList();

    if(this.props.params[ROUTE_PARAMS.VEHICLE_ID]){
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REVIEW, "vehicleId", this.props.params[ROUTE_PARAMS.VEHICLE_ID]));
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REVIEW, "isModal", true));
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    let promise = this.props.handleSubmit(data => formSubmit(data, this.props.formModeReview))(e);
    promise && promise.then(response => {
      onFormSubmitSuccess(response, this.props.onSubmitCustom);
      onFormSubmitError;
    });
  };

  render() {
    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form onSubmit={this.onSubmit.bind(this)}>
            <h3>{this.props.formModeReview}</h3>
            {
              this.props.params[ROUTE_PARAMS.VEHICLE_ID] ?
                <div>VehicleId: {this.props.params[ROUTE_PARAMS.VEHICLE_ID]}</div>
                : <VehiclesSelectField name="vehicleId" label="Vehicle *" vehicles={this.props.vehicles} />
            }

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
