/**
 * Created by zekar on 1/10/2017.
 */

import {connect} from "react-redux";
import Component from "./Details.checkout.component";
import {submitAsync} from "./Details.checkout.reducer";

const mapStateToProps = (state) => {
  const checkoutInfo = state.checkoutInfo;
  return {
    isSubmitting: checkoutInfo ? checkoutInfo.isSubmitting : false,
    errors: checkoutInfo.errors,
  }
};

const mapDispatchToProps = {
  submitAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
