/**
 * Created by jevgenir on 10/1/2016.
 */

import { connect } from 'react-redux'
import { toggleLoading, setCarData, getDataAsync } from '../modules'

import About from '../components/Details'

/*  Object of action creators (can also be function that returns object).
 Keys will be passed as props to presentational components. Here we are
 implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  toggleLoading,
  setCarData,
  getDataAsync
};

const mapStateToProps = (state) => ({
  isLoading : state.isLoading,
  car_data: state.carData
});

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

 import { createSelector } from 'reselect'
 const counter = (state) => state.counter
 const tripleCount = createSelector(counter, (count) => count * 3)
 const mapStateToProps = (state) => ({
 counter: tripleCount(state)
 })

 Selectors can compute derived data, allowing Redux to store the minimal possible state.
 Selectors are efficient. A selector is not recomputed unless one of its arguments change.
 Selectors are composable. They can be used as input to other selectors.
 https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapDispatchToProps)(About)
