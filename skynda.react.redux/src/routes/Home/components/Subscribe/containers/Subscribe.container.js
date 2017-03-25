import React from "react";
import {connect} from "react-redux";
import SubscribeComponent from "../components/Subscribe.component";
import {submitForm, onHandleDialogClose} from "../actions";
import {SUBSCRIBE_REDUCER_KEY, FORM_NAME__SUBSCRIBE} from "../constants/Subscribe.constants";

const mapStateToProps = (state) => {
  return {
    errors: state[SUBSCRIBE_REDUCER_KEY].errors,
    isFetching: state[SUBSCRIBE_REDUCER_KEY].isFetching,
    isSubscribed: state[SUBSCRIBE_REDUCER_KEY].isSubscribed,
    formInfo: state.form[FORM_NAME__SUBSCRIBE]
  };
};

const mapDispatchToProps = {
  submitForm,
  onHandleDialogClose
};

export default connect(mapStateToProps,mapDispatchToProps)(SubscribeComponent);
