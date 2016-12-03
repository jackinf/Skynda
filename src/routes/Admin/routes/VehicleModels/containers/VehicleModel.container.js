/**
 * Created by jevgenir on 12/3/2016.
 */
import {connect} from "react-redux";
import {reduxForm} from "redux-form";

import VehicleModel from "../components/VehicleModel.component";
import {submitAsync} from "../reducers/VehicleModel.reducer";
import {
  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains
} from "./../../Classifiers/Classifiers.module";

const stateToProps = (state) => {
  const classificators = state.classificators;

  return {
    vehicleModelInfo: state.vehicleModelInfo,

    // Classifiers
    manufacturer: classificators ? classificators.manufacturer : null,
    fuel: classificators ? classificators.fuel : null,
    transmission: classificators ? classificators.transmission : null,
    drivetrain: classificators ? classificators.drivetrain : null
  }
};

const dispatchToProps = {
  submitAsync,

  getManufacturers,
  getFuels,
  getTransmissions,
  getDrivetrains
};
const ReduxForm = reduxForm({form: "vehicleModelForm"})(VehicleModel);
export default connect(stateToProps, dispatchToProps)(ReduxForm);
