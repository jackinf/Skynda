import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS} from "../constants/VehicleReport.constant";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "../actions";
import {Row, Col} from "react-bootstrap";
import {
  renderReportCategoryItems,
  VehiclesSelectField,
  TextFieldForReport,
  TextAreaForReport
} from "./VehicleReportCategory.component.renderers";
import {renderFaults} from "../../Vehicles/components/Vehicle.redux-form.renderers";
import "./VehicleReport.Component.scss";

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
            <form onSubmit={this.onSubmit.bind(this)} className="vehicle-report">

              <h3>{this.props.formMode1}</h3>

              <VehiclesSelectField name="vehicleId" label="Vehicle *" vehicles={this.props.vehicles}/>

              <TextFieldForReport name="inspector" label="Inspector Name *"/>

              <TextFieldForReport name="title" label="Title"/>

              <TextAreaForReport name="description" label="Description"/>

              <FieldArray name="items" label="Category items" component={renderReportCategoryItems}/>

              <FieldArray name="faults" label="Faults " component={renderFaults}
                          onFaultFileAdd={this.props.onFaultFileUpload}
                          onFaultRemove={this.props.onFaultRemove}
              />

              <button type="submit" disabled={this.props.submitting}>Submit</button>
            </form>

          )}
      </div>
    )
  }
}

export default VehicleReportCategory;
