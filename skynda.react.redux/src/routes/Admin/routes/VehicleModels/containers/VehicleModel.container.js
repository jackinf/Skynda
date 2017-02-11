/**
 * Created by jevgenir on 12/3/2016.
 */
import {connect} from "react-redux";

import VehicleModel from "../components/VehicleModel.component";
import {load, onHandleSubmitFinished, randomize, clearItem} from "../reducers/VehicleModel.reducer";
import {
  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains,
  getVehicleBodies
} from "./../../Classifiers/Classifiers.module";

const stateToProps = (state) => {
  const classificators = state.classificators;

  return {
    formInfo: state.formInfo,
    initialValues: state.formInfo ? state.formInfo.item : {modelCode: ""},

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
  load,
  onHandleSubmitFinished,
  randomize,
  clearItem
};
export default connect(stateToProps, dispatchToProps)(VehicleModel);
