import {setIsSearching} from './../actions/index';
import React from "react";

const makeSearch = (input) => {
  console.log("MAKE_SEARCH input", input);
  var searchValues = {...input.buttonGroupValues, ...input.sliderValues};
  console.log("INPUT brngrpvals", input.buttonGroupValues);
  console.log("INPUT slidervls", input.sliderValues);
  console.log("INPUT RETURN", searchValues);

  return (dispatch) => {
    dispatch(setIsSearching(true));
    return new Promise((resolve) => {
      setTimeout(() => {
        // TODO: temporary data. Use API data.
        // TODO: REPLACE with api data

        resolve();
        dispatch(setIsSearching(false));

      }, 200);
    }).then(data => {

      }
    );
  };
};

export const searchCars = (state = [], action) => {
  switch (action.type) {
    case "SEARCH_CARS":
      makeSearch(action.payload);
      return state;

    default:
      return state;
  }
};



export default searchCars;
