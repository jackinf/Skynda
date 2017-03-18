import ACTIONS, {SEARCH_REDUCER_KEY} from "./constants"
import React from "react";
import {Translate} from "react-redux-i18n";
import {VehicleModelService} from "../../../webServices"

export const setIsSearching = (value) => ({
  type: ACTIONS.SET_IS_SEARCHING,
  value
});

export const toggleAdvanced = (value) => ({
  type: ACTIONS.TOGGLE_ADVANCED_SEARCH,
  value
});

export const setBaseValues = (sliderValues, models, brands, transmissions, fuels, features, doors, seats) => ({
  type: ACTIONS.SET_BASE_VALUES,
  payload: {
    sliderValues: {
      key: "sliderValues",
      value: sliderValues
    },
    models: {
      key: "models",
      value: models
    },
    brands: {
      key: "brands",
      value: brands
    },
    transmissions: {
      key: "transmissions",
      value: transmissions
    },
    fuels: {
      key: "fuels",
      value: fuels
    },
    features: {
      key: "features",
      value: features
    },
    doors: {
      key: "doors",
      value: doors
    },
    seats: {
      key: "seats",
      value: seats
    }
  }
});

export const updateSliderValue = (value) => ({
  type: ACTIONS.SET_SLIDER_VALUE,
  payload: value
});

export const toggleButtonGroupValue = (value) => ({
  type: ACTIONS.TOGGLE_BUTTON_GROUP_VALUE,
  payload: value
});

export const setSearchResults = (value) => ({
  type: ACTIONS.SET_SEARCH_RESULTS,
  payload: value
});

export function getModelsList(manufacturerIds = []) {
  const idsStr = manufacturerIds.length > 0 ? "?ManufacturerIds=" + manufacturerIds.join(",") : "";
  const promise = VehicleModelService.getModelsList(idsStr);
  return promise.then(resp => {
    const items = resp.map(item => ({id: item.id, name: item.title, value: item.id}));
    return {success: true, items};
  }).catch(err => {
    return {success: false, items: [], error: err};
  });
}

export const getModelsByManufacturerAsync = () => (dispatch, getState) => {
  const state = getState();
  const searchState = state[SEARCH_REDUCER_KEY];
  const brandIds = searchState.brands ? searchState.brands.filter(brand => brand.id !== -1 && !!brand.toggled).map(brand => brand.id) : [];

  return getModelsList(brandIds).then(response => {
    const modelsInit = [{id: -1, name: <Translate value="all"/>}];
    const models = modelsInit.concat(response.items);

    // Use this to retoggle previous models
    const existingModels = searchState.models;
    if (existingModels) {
      const toggledExistingModelIds = existingModels.filter(model => model.toggled && model.id !== -1).map(model => model.id);
      for (let i = 0; i < models.length; i++) {
        if (toggledExistingModelIds.indexOf(models[i].id) > -1) {
          models[i].toggled = true;
        }
      }
    }

    const clonedSearchState = Object.assign({}, searchState); // for safety we clone
    const {sliderValues, brands, transmissions, fuels, features, doors, seats} = clonedSearchState;
    dispatch(setBaseValues(sliderValues, models, brands, transmissions, fuels, features, doors, seats));
  })
};
