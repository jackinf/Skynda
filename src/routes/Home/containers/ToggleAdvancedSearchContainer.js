import React from 'react';
import {connect} from 'react-redux'
import {toggleAdvanced} from '../actions'
import ButtonSkynda from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  return {
    classes: ownProps.className
  };
};


const mapDispatchToProps =   {
    onClick: () => (dispatch, getState) => {
      dispatch(toggleAdvanced(getState().showAdvancedSearch));
  }
};

const Button = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSkynda);

export default Button
