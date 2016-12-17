import React from "react";
import {connect} from "react-redux";
import SubscribeComponent from "../components/Subscribe.component";
import {onHandleSubmitFinished, onHandleDialogClose} from "../reducers";
import {SUBSCRIBE_REDUCER_KEY} from "../Subscribe.constants";

const mapStateToProps = (state) => {
  return {
    isSubscribed: state[SUBSCRIBE_REDUCER_KEY].isSubscribed,
    formInfo: state.form.subscribeModelForm
  };
};

const mapDispatchToProps = {
  onHandleSubmitFinished,
  onHandleDialogClose
};

export default connect(mapStateToProps,mapDispatchToProps)(SubscribeComponent);
