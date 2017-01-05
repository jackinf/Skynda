import React from 'react';
import {connect} from 'react-redux'
import {updateSliderValue} from '../skynda.Search/actions'
import SliderWrapper from "./Slider.component";

const mapStateToProps = (state, ownProps) => {
  const min = state.searchValues[ownProps.type] ? state.searchValues[ownProps.type].min : ownProps.min;
  const max = state.searchValues[ownProps.type] ? state.searchValues[ownProps.type].max : ownProps.max;

  return {
    classes: ownProps.className,
    title: ownProps.title,
    step: ownProps.step,

    min: min,
    max: max,
    units: ownProps.units,
    type: ownProps.type
  };
};


const mapDispatchToProps =   {
  onSliderChange: updateSliderValue
};

const SliderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SliderWrapper);

export default SliderContainer
