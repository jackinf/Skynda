import React from 'react';
import {connect} from 'react-redux'
import {toggleButtonGroupValue} from '../actions'
import CarSearchButtonGroup from "../../ButtonGroupSelect/Btn.Group";

const mapStateToProps = (state, ownProps) => {
  return {
    options: ownProps.options,
    shape: ownProps.shape,
    type: ownProps.type
  };
};


const mapDispatchToProps =   {
  onToggle: (value) => (dispatch, getState) => {
    dispatch(toggleButtonGroupValue(getState().buttonGroupValues, value));
  }
};

const SelectBtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CarSearchButtonGroup);

export default SelectBtnContainer
