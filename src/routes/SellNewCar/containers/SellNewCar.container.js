/**
 * Created by jevgenir on 11/26/2016.
 */
import {connect} from "react-redux";
import SellNewCarComponent from "../components/SellNewCar.component";
import {reduxForm} from "redux-form";
import {SELL_CAR_FORM} from "../SellNewCar.constants";
import {submitAsync} from "../reducers/SellNewCar.reducer";


const statesToProps = (state) => ({
  isSubmitting: state.sellNewCarInfo ? state.sellNewCarInfo.isSubmitting : false
});

const actionsToProps = {
  submitAsync,

  // getVehicleManufacturersList,
  // getVehicleModelsList,
  // getColors,
  // getFeatures,
  // getCountries,
  // getFuelType
  // getTransmission
  // getDrivetrain
};


const ReduxForm = reduxForm({form: SELL_CAR_FORM})(SellNewCarComponent);
export default connect(statesToProps, actionsToProps)(ReduxForm);
