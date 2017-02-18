/**
 * Created by jevgenir on 12/3/2016.
 */
import React from "react";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {reduxForm, change, destroy} from "redux-form";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {toastr} from "react-redux-toastr";

import {ROUTE_PARAMS, FORM_MODE} from "./../constants/VehicleModel.constant";
import {rowWrapper, selectRenderer} from "./VehicleModel.redux-form.renderers";
import {onHandleSubmit} from "../actions/VehicleModel.redux-form.actions";

class VehicleModel extends React.Component {
  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_ID]);
    this.props.getDrivetrains();
    this.props.getFuels();
    this.props.getTransmissions();
    this.props.getVehicleBodies();
    this.props.getManufacturers();
  }

  componentWillUnmount() {
    this.props.dispatch(destroy("vehicleModelForm"));
    this.props.clearItem();
  }

  setField = (name, selectedItem) => {
    this.props.dispatch(change("vehicleModelForm", name, selectedItem.value));
  };

  onSubmit(e) {
    let promise = this.props.handleSubmit(data => onHandleSubmit(data, this.props.formInfo))(e);
    promise && promise.then(resp => {this.props.onHandleSubmitFinished(resp, this.props.onSubmitCustom)});
  }

  render() {
    const drivetrains = !this.props.drivetrain.isFetching
      ? this.props.drivetrain.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const fuels = !this.props.fuel.isFetching
      ? this.props.fuel.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const transmissions = !this.props.transmission.isFetching
      ? this.props.transmission.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const vehicleBodies = !this.props.vehicleBody.isFetching
      ? this.props.vehicleBody.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const manufacturers = !this.props.manufacturer.isFetching
      ? this.props.manufacturer.items.map(item => ({label: item.name, value: item.id}))
      : [];

    const loadingIcon = (<div><RefreshIndicator size={100} left={20} top={0} status="loading"/></div>);

    return this.props.formInfo.isFetching
      ? (loadingIcon)
      : (<div>
        {/*COMMENTED BECAUSE IT's for debugging*/}
      {/*<div className="well vehicle-model__form-info__helper-block">*/}
        {/*<h4>Form info: {JSON.stringify(this.props.formInfo)}</h4>*/}
        {/*<h5>Is modal: {this.props.isModal ? "yes" : "no"}</h5>*/}
        {/*<button onClick={e => this.props.randomize(this.props.formInfo.item)}>Random</button>*/}
      {/*</div>*/}

      <form onSubmit={this.onSubmit.bind(this)}>
        {rowWrapper(<Field name="modelCode" label="Model Code" component={TextField} floatingLabelText="Model Code *"/>)}
        {rowWrapper(<Field name="title" component={TextField} floatingLabelText="Title *"/>)}
        {rowWrapper(<Field name="description" component={TextField} floatingLabelText="Description *"/>)}
        {rowWrapper(<Field name="doors" component={TextField} type="number" floatingLabelText="Doors *"/>)}
        {rowWrapper(<Field name="horsePower" component={TextField} floatingLabelText="Horse Power *"/>)}
        {rowWrapper(<Field name="engine" component={TextField} floatingLabelText="Engine *"/>)}
        {rowWrapper(<Field name="seats" component={TextField} type="number" floatingLabelText="Seats *"/>)}
        {rowWrapper(<Field name="year" component={TextField} type="number" floatingLabelText="Year *"/>)}

        {this.props.drivetrain.isFetching
          ? <div>{loadingIcon}</div>
          : rowWrapper(<Field name="drivetrain.id"
                              label="Drivetrain *"
                              component={selectRenderer(drivetrains, this.setField)}/>, 4)}

        {this.props.fuel.isFetching
          ? <div>{loadingIcon}</div>
          : rowWrapper(<Field name="fuelType.id"
                              label="Fuel type *"
                              component={selectRenderer(fuels, this.setField)}/>, 4)}

        {this.props.transmission.isFetching
          ? <div>{loadingIcon}</div>
          : rowWrapper(<Field name="transmission.id"
                              label="Transmission *"
                              component={selectRenderer(transmissions, this.setField)}/>, 4)}

        {this.props.vehicleBody.isFetching
          ? <div>{loadingIcon}</div>
          : rowWrapper(<Field name="vehicleBody.id"
                              label="Vehicle body *"
                              component={selectRenderer(vehicleBodies, this.setField)}/>, 4)}

        {this.props.manufacturer.isFetching
          ? <div>{loadingIcon}</div>
          : rowWrapper(<Field name="vehicleManufacturer.id"
                              label="Manufacturer *"
                              component={selectRenderer(manufacturers, this.setField)}/>, 4)}

        <input type="submit" disabled={this.props.submitting} value={"Submit"}/>
        {/*{rowWrapper(<Button onClick={e => this.props.handleSubmit(this.props.submitAsync(e))}>Submit</Button>)}*/}
      </form>
    </div>)
  }
}

export default reduxForm({form: "vehicleModelForm"})(VehicleModel);
