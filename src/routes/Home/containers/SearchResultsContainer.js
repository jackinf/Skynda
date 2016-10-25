import React from 'react';
import {connect} from 'react-redux'
import ResultsComponent from '../components/CarSearch/ResultsComponent'

const mapStateToProps = (state) => {
  return {

  };
};


const mapDispatchToProps = {

};

const SearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent);

export default SearchResultsContainer
