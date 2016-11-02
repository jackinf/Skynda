import fetch from "isomorphic-fetch";
import remoteConfig from "../../../store/remoteConfig";
import {setIsSearching} from './../actions/index';
import ACTIONS from './../actions/constants';

/***
 * Asyn Search for cars. Use redux-thunk
 * Set isSearching & searchResults
 */
export const searchCarAsync = () => (dispatch, getState) => {
  var searchValues = {...getState().buttonGroupValues, ...getState().sliderValues};
  console.log("search values", searchValues);
  dispatch(setIsSearching(true));
  return fetch(`${remoteConfig.remote}/api/car/search`, {
    method: "POST",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(searchValues)
  })
    .then(resp => {
      console.log("response2", resp);
      resp.json()
    })
    .then(data => {
      // data["general"] = data["carGeneralDto"];
      console.log("response2", data);
      if(data.success){
        // setSearchResults(data.cars);
      }

      dispatch(setIsSearching(false));
    });
  // .catch((error) => {
  //   console.log("ERROR: ", error);
  //   dispatch(setCarData(fakeCarData));
  //   dispatch(toggleLoading(false));
  // });

};

/***
 * Add values from search to state
 * @param value
 * @returns {{type: string, payload: *}}
 */
export function setSearchResults(value) {
  return {
    type: ACTIONS.SET_SEARCH_RESULTS,
    payload: value
  };
}

