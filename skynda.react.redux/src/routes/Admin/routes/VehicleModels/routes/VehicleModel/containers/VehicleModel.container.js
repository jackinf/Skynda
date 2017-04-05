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
  getDrivetrains,
  getVehicleBodies
} from "../../../../Classifiers/Classifiers.module";
import {reduxForm} from "redux-form";
import {VEHICLE_MODEL_FORM, VEHICLE_MODEL_REDUCER_KEY} from "../../../constants/VehicleModel.constant";

const VehicleModelForm = reduxForm({form: VEHICLE_MODEL_FORM})(VehicleModel);

const stateToProps = (state) => {
  const classifications = state.classificators;
  return {
    formInfo: state[VEHICLE_MODEL_REDUCER_KEY],
    initialValues: state[VEHICLE_MODEL_REDUCER_KEY].item,
    errors: state[VEHICLE_MODEL_REDUCER_KEY].errors,

    // classifications
    manufacturer: classifications ? classifications.manufacturer : null,
    drivetrain: classifications ? classifications.drivetrain : null,
    vehicleBody: classifications ? classifications.vehicleBody : null
  }
};

const dispatchToProps = {
  getManufacturers,
  getDrivetrains,
  getVehicleBodies,

  onHandleLoad: load,
  onHandleSubmit: submit,
  randomize
};
export default connect(stateToProps, dispatchToProps)(VehicleModelForm);
