/**
 * Created by jevgenir on 12/3/2016.
 */
import {connect} from "react-redux";

import VehicleModel from "../components/VehicleModel.component";
import {
  load,
  randomize,
  submit
} from "../actions";
import {
  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains,
  getVehicleBodies
} from "../../../../Classifiers/Classifiers.module";
import {reduxForm} from "redux-form";
import {VEHICLE_MODEL_FORM, VEHICLE_MODEL_REDUCER_KEY} from "../../../constants/VehicleModel.constant";

const VehicleModelForm = reduxForm({form: VEHICLE_MODEL_FORM})(VehicleModel);

const stateToProps = (state) => {
  const classificators = state.classificators;
  return {
    formInfo: state[VEHICLE_MODEL_REDUCER_KEY],
    initialValues: state[VEHICLE_MODEL_REDUCER_KEY].item,
    errors: state[VEHICLE_MODEL_REDUCER_KEY].errors,

    // Classifiers
    manufacturer: classificators ? classificators.manufacturer : null,
    fuel: classificators ? classificators.fuel : null,
    transmission: classificators ? classificators.transmission : null,
    drivetrain: classificators ? classificators.drivetrain : null,
    vehicleBody: classificators ? classificators.vehicleBody : null
  }
};

const dispatchToProps = {
  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains,
  getVehicleBodies,

  onHandleLoad: load,
  onHandleSubmit: submit,
  randomize
};
export default connect(stateToProps, dispatchToProps)(VehicleModelForm);
