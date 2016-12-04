/**
 * Created by jevgenir on 12/3/2016.
 */
import {connect} from "react-redux";

import VehicleModel from "../components/VehicleModel.component";
import {onHandleSubmitFinished, randomize} from "../reducers/VehicleModel.reducer";
import {
  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains
} from "./../../Classifiers/Classifiers.module";

const stateToProps = (state) => {
  const classificators = state.classificators;

  return {
    formInfo: state.formInfo,
    initialValues: state.formInfo ? state.formInfo.item : {},

    // Classifiers
    manufacturer: classificators ? classificators.manufacturer : null,
    fuel: classificators ? classificators.fuel : null,
    transmission: classificators ? classificators.transmission : null,
    drivetrain: classificators ? classificators.drivetrain : null
  }
};

const dispatchToProps = {
  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains,

  onHandleSubmitFinished,
  randomize
};
export default connect(stateToProps, dispatchToProps)(VehicleModel);
