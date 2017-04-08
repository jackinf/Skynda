import React from 'react';
import {FieldArray, change} from 'redux-form';
import {ROUTE_PARAMS,FORMS} from "../../../constants/VehicleReport.constant";

import {
  renderReportCategoryItems,
  VehiclesSelectField,
  TextFieldForReport,
  TextAreaForReport,
  renderFaults
} from "./FormRenderers";
import "./VehicleReport.component.scss";
import {Button} from "react-bootstrap";
import {ErrorBlockRenderer} from "../../../../../components/FormRenderers";

class VehicleReportCategory extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    onHandleSubmit: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    // clear: React.PropTypes.func.isRequired,
    getVehiclesList: React.PropTypes.func.isRequired,
    onFaultFileUpload: React.PropTypes.func.isRequired,
    onFaultRemove: React.PropTypes.func.isRequired,

    onSubmitCustom: React.PropTypes.func,

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
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_REPORT_ID], () => {
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REPORT, "vehicleId", this.props.params[ROUTE_PARAMS.VEHICLE_ID]));
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REPORT, "isModal", true));
    });

    if(isNaN(this.props.params[ROUTE_PARAMS.VEHICLE_ID])) {
      this.props.getVehiclesList();
    }
  }

  render() {
    const vehicleId = this.props.params[ROUTE_PARAMS.VEHICLE_ID];
    const errors = this.props.errors;
    return (
      <div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form className="vehicle-report">
            <ErrorBlockRenderer errors={errors}/>
            {vehicleId ?
              <div>VehicleId: {vehicleId}</div>
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
            <Button onClick={e => this.props.onHandleSubmit(this.props.onSubmitCustom)}>Submit</Button>
          </form>
        )}
      </div>
    )
  }
}

export default VehicleReportCategory;
