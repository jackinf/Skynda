import fetch from "isomorphic-fetch";
import remoteConfig from "../../../store/remoteConfig";
import {setIsSearching, setSearchResults} from './../actions';


/***
 * Async Search for cars. Use redux-thunk
 * Set isSearching & searchResults
 */
export const searchCarAsync = () => (dispatch, getState) => {
  var searchValues = {...getState().searchValues};
  dispatch(setIsSearching(true));
  console.log(JSON.stringify(searchValues));
  return fetch(`${remoteConfig.remote}/api/car/search`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(searchValues)
  }).then(resp => resp.json()).then(resp => {
    dispatch(setSearchResults(resp.cars));
    console.log("searchCarAsync failed", resp);
    dispatch(setIsSearching(false));
  }).catch(err => {
    console.log("Car Search failed =>", err)
    dispatch(setIsSearching(false));
  });
};
