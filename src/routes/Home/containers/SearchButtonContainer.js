import React from 'react';
import {connect} from 'react-redux'
import {setIsSearching} from '../actions'
import ButtonSkynda from '../components/Button'

const mapStateToProps = (state, ownProps) => {
  return {
    classes: ownProps.className,
    isSearching: state.isSearching
  };
};

// const mapDispatchToProps = (dispatch, ownProps ) => {
//   return {
//     onClick: (actionMethod) =>  (dispatch, getState, p3) => {
//       console.log(p3);
//       dispatch(actionMethod());
//     }
//   }
// };

const mapDispatchToProps = {
  onClick: (actionMethod) => (dispatch, getState) => {
    dispatch(actionMethod());
  }
};

const Button = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSkynda);

export default Button
