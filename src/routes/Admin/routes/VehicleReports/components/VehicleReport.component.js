/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE} from "../constants/VehicleReport.constant";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "../actions";
import {Row, Col} from "react-bootstrap";
import {TextField} from "redux-form-material-ui";
import {
  renderReportCategoryItems,
  VehiclesSelectField
} from "./VehicleReportCategory.component.renderers";

class VehicleReportCategory extends React.Component {
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
      .then(() => onFormSubmitSuccess(this.props.submitSucceeded), onFormSubmitError);
  };

  render() {
    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form onSubmit={this.onSubmit.bind(this)}>

            <h3>{this.props.formMode1}</h3>

            <VehiclesSelectField name="vehicleId" label="Vehicle *" vehicles={this.props.vehicles} />

            <Row>
              <Col sm={12}>
                <Field name="title" component={TextField} hintText="Title"/>
              </Col>
            </Row>

            <FieldArray name="items" label="Category items" component={renderReportCategoryItems}
                        onCategoryItemLogoUpload={this.props.onCategoryItemLogoUpload}
                        onCategoryItemLogoRemove={this.props.onCategoryItemLogoRemove}
                        onCategoryItemVideoUpload={this.props.onCategoryItemVideoUpload}
                        onCategoryItemVideoRemove={this.props.onCategoryItemVideoRemove}
            />

            <button type="submit" disabled={this.props.submitting}>Submit</button>
          </form>

        )}
      </div>
    )
  }
}

export default VehicleReportCategory;
