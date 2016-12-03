import React from 'react';
import {connect} from 'react-redux'
import {searchCarAsync} from '../reducers/make.search'
import ButtonSkynda from '../../Button/Button'

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

const SearchBtnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ButtonSkynda);

export default SearchBtnContainer
