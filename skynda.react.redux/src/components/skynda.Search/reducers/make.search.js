import {setIsSearching, setSearchResults} from './../actions';
import NProgress from "react-nprogress";
import {VehicleService} from "../../../webServices"

/***
 * Async skynda.Search for vehicles. Use redux-thunk
 * Set isSearching & searchResults
 */
export const searchCarAsync = () => (dispatch, getState) => {
  var searchValues = {...getState().searchValues};
  dispatch(setIsSearching(true));
  NProgress.start();
  const promise = VehicleService.search(searchValues);
  promise.then(resp => {
    dispatch(setSearchResults(resp.vehicles));
    dispatch(setIsSearching(false));
    NProgress.done();
  }).catch(err => {
    dispatch(setIsSearching(false));
    NProgress.done();
  });
};
