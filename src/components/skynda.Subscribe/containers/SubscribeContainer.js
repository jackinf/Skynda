import React from 'react';
import {connect} from 'react-redux'
import SubscribeComponent from '../components/Subscribe'
import {subscribe} from "../reducers"
import {reduxForm} from "redux-form";

const mapStateToProps = (state) => {
  return {
    isSubscribed: state.isSubscribed,
    subscriptionEmail: state.subscriptionEmail
  };
};

const mapDispatchToProps = {
  subscribe
};

const ReduxForm = reduxForm({form: "subscribeModelForm"})(SubscribeComponent);
export default connect(mapStateToProps,mapDispatchToProps)(ReduxForm);
