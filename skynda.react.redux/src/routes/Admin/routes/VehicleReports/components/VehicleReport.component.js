import React from 'react';
import {FieldArray, change, Field} from 'redux-form';
import {ROUTE_PARAMS,FORMS} from "../constants/VehicleReport.constant";
import {formSubmit, onFormSubmitSuccess, onFormSubmitError} from "../reducers";

import {
  renderReportCategoryItems,
  VehiclesSelectField,
  TextFieldForReport,
  TextAreaForReport
} from "./VehicleReportCategory.component.renderers";
import {renderFaults} from "../../../components/FormRenderers/Vehicle.redux-form.renderers";
import "./VehicleReport.Component.scss";

class VehicleReportCategory extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    formSubmit: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    getVehiclesList: React.PropTypes.func.isRequired,
    onFaultFileUpload: React.PropTypes.func.isRequired,
    onFaultRemove: React.PropTypes.func.isRequired,
    // vehicle review data
    initialValues: React.PropTypes.shape({
      // TODO
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_REPORT_ID]
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_REPORT_ID]);
    this.props.getVehiclesList();
    if(this.props.params[ROUTE_PARAMS.VEHICLE_ID]){
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REPORT, "vehicleId", this.props.params[ROUTE_PARAMS.VEHICLE_ID]));
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REPORT, "isModal", true));
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    let promise = this.props.handleSubmit(data => formSubmit(data, this.props.formModeReport))(e);
    promise && promise.then(response =>{
        onFormSubmitSuccess(response, this.props.onSubmitCustom);
        onFormSubmitError;
      });

  };

  render() {
    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
            <form onSubmit={this.onSubmit.bind(this)} className="vehicle-report">

              <h3>{this.props.formModeReport}</h3>

              {this.props.params[ROUTE_PARAMS.VEHICLE_ID] ?
                <div>VehicleId: {this.props.params[ROUTE_PARAMS.VEHICLE_ID]}</div>
                  : <VehiclesSelectField name="vehicleId" label="Vehicle *" vehicles={this.props.vehicles}/>
              }

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
