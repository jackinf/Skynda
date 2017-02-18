/**
 * Created by ardi-pc on 2016-12-03.
 */
import React from 'react';
import {connect} from 'react-redux'
import SearchComponent from '../components/Search.component'
import {getClassificationsAsync} from '../reducers'

const mapStateToProps = (state) => {
  return {
    showAdvancedSearch: state.showAdvancedSearch,
    sliderValues: state.base.sliderValues,
    seats: state.base.seats,
    doors: state.base.doors,
    transmissions: state.base.transmissions,
    fuels: state.base.fuels,
    features: state.base.features,
    brands: state.base.brands,
    models: state.base.models,
    searchValues: state.searchValues
  };
};


const mapDispatchToProps = {
  getClassificationsAsync
};

const SearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);

export default SearchContainer
