/**
 * Created by zekar on 1/10/2017.
 */

import {connect} from "react-redux";
import Component from "../components/Details.checkout.component";
import {submitAsync} from "../actions";
import {REDUCER_KEY__DETAILS_CHECKOUT_INFO} from "../constants/Details.checkout.constants";

const mapStateToProps = (state) => {
  const checkoutInfo = state[REDUCER_KEY__DETAILS_CHECKOUT_INFO];
  return {
    isSubmitting: checkoutInfo ? checkoutInfo.isSubmitting : false,
    isSuccessfullySent: checkoutInfo ? checkoutInfo.isSuccessfullySent : false,
    errors: checkoutInfo.errors
  }
};

const mapDispatchToProps = {
  submitAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
