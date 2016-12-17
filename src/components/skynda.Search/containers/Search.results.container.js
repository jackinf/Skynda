import React from 'react';
import {connect} from 'react-redux'
import ResultsComponent from '../components/Search.results.component'

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults,
    recentlyAdded: state.recentlyAdded, //TODO redux recentlyAdded
    isSearching: state.isSearching
  };
};

const mapDispatchToProps =  {};

const SearchResultsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent);

export default SearchResultsContainer
