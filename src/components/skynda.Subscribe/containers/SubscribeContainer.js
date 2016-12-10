import React from 'react';
import {connect} from 'react-redux'
import SubscribeComponent from '../components/Subscribe'
import {onHandleSubmitFinished} from "../reducers"

const mapStateToProps = (state) => {
  return {
    isSubscribed: state.isSubscribed,
    formInfo: state.form.subscribeModelForm
  };
};

const mapDispatchToProps = {
  onHandleSubmitFinished
};

export default connect(mapStateToProps,mapDispatchToProps)(SubscribeComponent);
