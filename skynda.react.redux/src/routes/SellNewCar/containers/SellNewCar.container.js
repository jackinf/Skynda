/**
 * Created by jevgenir on 11/26/2016.
 */
import {connect} from "react-redux";
import SellNewCarComponent from "../components/SellNewCar.component";
import {reduxForm} from "redux-form";
import {SELL_CAR_FORM} from "../SellNewCar.constants";
import {submitAsync} from "../reducers/SellNewCar.reducer";
import {
  getManufacturers,
  getColors,
  getFeatures,
  // getCountries,
  getFuels,
  getTransmissions,
  getDrivetrains
} from "./../../Admin/routes/Classifiers/Classifiers.module";
import {getList as getModels} from "../../Admin/routes/VehicleModels/reducers/VehicleModels.reducer";

const statesToProps = (state) => {
  let sellNewCarInfo = state.sellNewCarInfo;
  let classificators = state.classificators;

  return {
    isSubmitting: sellNewCarInfo ? sellNewCarInfo.isSubmitting : false,
    isSuccessfullySent: sellNewCarInfo ? sellNewCarInfo.isSuccessfullySent : false,
    errors: sellNewCarInfo.errors,

    // Classifiers
    manufacturer: classificators ? classificators.manufacturer : null,
    color: classificators ? classificators.color : null,
    feature: classificators ? classificators.feature : null,
    fuel: classificators ? classificators.fuel : null,
    transmission: classificators ? classificators.transmission : null,
    drivetrain: classificators ? classificators.drivetrain : null,

    // Vehicle model
    vehicleModels: state.vehicleModels || {}
  }
};

const actionsToProps = {
  submitAsync,

  getManufacturers,
  getModels,
  getColors,
  getFeatures,
  // getCountries,
  getFuels,
  getTransmissions,
  getDrivetrains
};

const ReduxForm = reduxForm({form: SELL_CAR_FORM})(SellNewCarComponent);
export default connect(statesToProps, actionsToProps)(ReduxForm);
