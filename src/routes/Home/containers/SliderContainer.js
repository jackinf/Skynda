import React from 'react';
import {connect} from 'react-redux'
import {onSliderChange} from '../actions'
import SliderWrapper from "../components/CarSearch/CarSearchSliderWrapper";

const mapStateToProps = (state, ownProps) => {
  return {
    classes: ownProps.className,
    title: ownProps.title,
    step: ownProps.step,
    min: ownProps.min,
    max: ownProps.max,
    units: ownProps.units,
    type: ownProps.type
  };
};


const mapDispatchToProps =   {
  onSliderChange: (value) => (dispatch, getState) => {
    dispatch(onSliderChange(value));
  }
};

const SliderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderWrapper);

export default SliderContainer
