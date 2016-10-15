import React from 'react';
import { connect } from 'react-redux'
import {setIsSearching} from '../actions'
import ButtonSkynda from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    classes: ownProps.className,
    isSearching: state.isSearching
  };
};

const mapDispatchToProps = (dispatch, ownProps, state) => ({

  onClick: () => {
    dispatch(setIsSearching(ownProps.value))
  }
});

const Button = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSkynda);

export default Button
