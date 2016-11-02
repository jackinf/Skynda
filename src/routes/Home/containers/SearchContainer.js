import React from 'react';
import {connect} from 'react-redux'
import SearchComponent from '../components/CarSearch/SearchComponent'
import {setValues, getClassificationsAsync} from '../reducers'

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
  setValues,
  getClassificationsAsync
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);

export default SearchContainer
