import React, {Component, PropTypes} from "react";
import LocaleChanger from "./Locale";
import {setLocale} from 'react-redux-i18n';
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
  return {
    activeLocale: state.i18n.locale
  };
};

const mapDispatchToProps = {
  onLocaleChange: (value) => (dispatch) => {
    dispatch(setLocale(value));
  }
};

const LocaleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LocaleChanger);

export default LocaleContainer;
