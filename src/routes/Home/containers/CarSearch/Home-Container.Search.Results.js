import React from 'react';
import {connect} from 'react-redux'
import ResultsComponent from '../../components/CarSearch/Search.Results'

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    recentlyAdded: state.recentlyAdded
  };
};


const mapDispatchToProps =  {

};

const SearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent);

export default SearchResultsContainer
