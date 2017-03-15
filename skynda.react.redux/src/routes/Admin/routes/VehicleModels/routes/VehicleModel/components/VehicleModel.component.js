/**
 * Created by jevgenir on 12/3/2016.
 */
import React from "react";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {change, destroy} from "redux-form";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Row, Col, Button} from "react-bootstrap";

import {ROUTE_PARAMS} from "../../../constants/VehicleModel.constant";
import {rowWrapper, selectRenderer} from "./VehicleModel.redux-form.renderers";
import {TrivenLoader} from "components/Triven";

class VehicleModel extends React.Component {
  static propTypes = {
    onHandleLoad: React.PropTypes.func.isRequired,
    onHandleSubmit: React.PropTypes.func.isRequired,
    onSubmitCustom: React.PropTypes.func,
    getDrivetrains: React.PropTypes.func,
    getFuels: React.PropTypes.func,
    getTransmissions: React.PropTypes.func,
    getVehicleBodies: React.PropTypes.func,
    getManufacturers: React.PropTypes.func
  };

  componentDidMount() {
    this.props.onHandleLoad(this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_ID]);
    if(this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_TITLE]){
      this.props.dispatch(change("vehicleModelForm", "title", this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_TITLE]))
    }
    // TODO: load this shit with 1 query :D
    this.props.getDrivetrains();
    this.props.getFuels();
    this.props.getTransmissions();
    this.props.getVehicleBodies();
    this.props.getManufacturers();
  }

  componentWillUnmount() {
    this.props.dispatch(destroy("vehicleModelForm"));
  }

  setField = (name, selectedItem) => {
    this.props.dispatch(change("vehicleModelForm", name, selectedItem.value));
  };

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
      ? this.props.vehicleBody.items.map(item => ({label: item.name + " (" + item.description + ")", value: item.id}))
      : [];
    const manufacturers = !this.props.manufacturer.isFetching
      ? this.props.manufacturer.items.map(item => ({label: item.name, value: item.id}))
      : [];

    const loadingIcon = (<div><RefreshIndicator size={100} left={20} top={0} status="loading"/></div>);
    // let modelStateErrors = this.props.errors && this.props.errors.modelState ? this.props.errors.modelState : [];
    const isFetching = this.props.formInfo.isFetching;

    return (<div>
      {/*<div className="container">*/}
        {/*{JSON.stringify(modelStateErrors, null, 2)}*/}
      {/*</div>*/}

      <TrivenLoader isLoading={isFetching}>
        <form>
          <Row>
            <Col md={6} xs={12}>
              {rowWrapper(<Field name="title" component={TextField} floatingLabelText="Title *"/>)}
              {rowWrapper(<Field name="modelCode" label="Model Code" component={TextField} floatingLabelText="Model Code *"/>)}
              {rowWrapper(<Field name="description" component={TextField} floatingLabelText="Description *"/>)}
              {rowWrapper(<Field name="doors" component={TextField} type="number" floatingLabelText="Doors *"/>)}
            </Col>
            <Col md={6} xs={12}>
              {rowWrapper(<Field name="horsePower" component={TextField} floatingLabelText="Horse Power *"/>)}
              {rowWrapper(<Field name="engine" component={TextField} floatingLabelText="Engine *"/>)}
              {rowWrapper(<Field name="seats" component={TextField} type="number" floatingLabelText="Seats *"/>)}
              {rowWrapper(<Field name="year" component={TextField} type="number" floatingLabelText="Year *"/>)}
            </Col>
          </Row>

          <Row>
            <Col md={6} xs={12}>
              {this.props.drivetrain.isFetching
                ? <div>Loading...</div>
                : rowWrapper(<Field name="drivetrainId"
                                    label="Drivetrain *"
                                    component={selectRenderer(drivetrains, this.setField)}/>, 4)}

              {this.props.fuel.isFetching
                ? <div>Loading...</div>
                : rowWrapper(<Field name="fuelTypeId"
                                    label="Fuel type *"
                                    component={selectRenderer(fuels, this.setField)}/>, 4)}

              {this.props.transmission.isFetching
                ? <div>Loading...</div>
                : rowWrapper(<Field name="transmissionId"
                                    label="Transmission *"
                                    component={selectRenderer(transmissions, this.setField)}/>, 4)}
            </Col>
            <Col md={6} xs={12}>
              {this.props.vehicleBody.isFetching
                ? <div>Loading...</div>
                : rowWrapper(<Field name="vehicleBodyId"
                                    label="Vehicle body *"
                                    component={selectRenderer(vehicleBodies, this.setField)}/>, 4)}

              {this.props.manufacturer.isFetching
                ? <div>Loading...</div>
                : rowWrapper(<Field name="vehicleManufacturerId"
                                    label="Manufacturer *"
                                    component={selectRenderer(manufacturers, this.setField)}/>, 4)}
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <Button onClick={e => this.props.onHandleSubmit(this.props.onSubmitCustom)}>Submit</Button>
            </Col>
          </Row>

        </form>
      </TrivenLoader>
    </div>)
  }
}

export default VehicleModel;
