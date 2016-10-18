import React from 'react';
import {connect} from 'react-redux'
import SearchComponent from '../components/CarSearch/SearchComponent'
import {setStateValues, loadBaseData} from '../reducers'

const mapStateToProps = (state) => {
  return {
    showAdvancedSearch: state.showAdvancedSearch,
    sliderValues: state.base.sliderValues,
    seats: state.base.seats,
    doors: state.base.doors,
    transmissions: state.base.transmissions,
    features: state.base.features,
    brands: state.base.brands
  };
};


const mapDispatchToProps = {
  setStateValues,
  loadBaseData
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);

export default SearchContainer
