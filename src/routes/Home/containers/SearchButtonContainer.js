import React from 'react';
import {connect} from 'react-redux'
import {searchCarAsync} from '../reducers/Home.module-search.Search.CarAsync'
import ButtonSkynda from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  return {
    classes: ownProps.className
  };
};


const mapDispatchToProps = {
  onClick: () => (dispatch, getState) => {
    dispatch(searchCarAsync());
  }
};

const Button = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSkynda);

export default Button
