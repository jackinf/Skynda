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
import {TrivenLoader} from "../../../../../../../components/Triven";
import {ErrorBlockRenderer} from "../../../../../components/FormRenderers";

class VehicleModel extends React.Component {
  static propTypes = {
    onHandleLoad: React.PropTypes.func.isRequired,
    onHandleSubmit: React.PropTypes.func.isRequired,
    onSubmitCustom: React.PropTypes.func,
    getDrivetrains: React.PropTypes.func,
    getVehicleBodies: React.PropTypes.func,
    getManufacturers: React.PropTypes.func
  };

  componentDidMount() {
    this.props.onHandleLoad(this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_ID]);
    if(this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_TITLE]){
      this.props.dispatch(change("vehicleModelForm", "title", this.props.params[ROUTE_PARAMS.VEHICLE_MODEL_TITLE]))
    }
    // TODO: load this shit with 1 query :D good idea.
    this.props.getDrivetrains();
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
    const vehicleBodies = !this.props.vehicleBody.isFetching
      ? this.props.vehicleBody.items.map(item => ({label: item.name + " (" + item.description + ")", value: item.id}))
      : [];
    const manufacturers = !this.props.manufacturer.isFetching
      ? this.props.manufacturer.items.map(item => ({label: item.name, value: item.id}))
      : [];

    const loadingIcon = (<div><RefreshIndicator size={100} left={20} top={0} status="loading"/></div>);
    // let modelStateErrors = this.props.errors && this.props.errors.modelState ? this.props.errors.modelState : [];
    const isFetching = this.props.formInfo.isFetching;
    // Validation errors
    const errors = this.props.errors;
    return (<div>
      <ErrorBlockRenderer errors={errors}/>

      <TrivenLoader isLoading={isFetching}>
        <form>
          <Row>
            <Col md={6} xs={12}>
              {/*{rowWrapper(<Field name="title" component={TextField} floatingLabelText="Title *"/>)}*/}
              {rowWrapper(<Field name="modelCode" label="Model Code" component={TextField} floatingLabelText="Model Code *"/>)}
              {rowWrapper(<Field name="description" component={TextField} floatingLabelText="Description *"/>)}
              {rowWrapper(<Field name="doors" component={TextField} type="number" floatingLabelText="Doors *"/>)}
              {rowWrapper(<Field name="seats" component={TextField} type="number" floatingLabelText="Seats *"/>)}

            </Col>
            <Col md={6} xs={12}>
                {this.props.drivetrain.isFetching
                  ? <div>Loading...</div>
                  : <Field name="drivetrainId"
                                      label="Drivetrain *"
                                      component={selectRenderer(drivetrains, this.setField)}/>}

                {this.props.vehicleBody.isFetching
                  ? <div>Loading...</div>
                  : <Field name="vehicleBodyId"
                                      label="Vehicle body *"
                                      component={selectRenderer(vehicleBodies, this.setField)}/>}

                {this.props.manufacturer.isFetching
                  ? <div>Loading...</div>
                  : <Field name="vehicleManufacturerId"
                                      label="Manufacturer *"
                                      component={selectRenderer(manufacturers, this.setField)}/>}
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
