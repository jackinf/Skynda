import moment from "moment";
import {setBaseValues} from "./../actions"
import {Translate} from 'react-redux-i18n';
import React from "react";
import remoteConfig from "../../../store/remoteConfig";
import fetch from "isomorphic-fetch";

function getClassificationList(type) {
  return fetch(`${remoteConfig.remote}/api/classifications/${type}/vehicle-bound`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(resp => {
      return { success: true, items: resp};
    })
    .catch(err => {
      console.error(err);
      return {success: false, items: [], error: err};
    });
}

export const getClassificationsAsync =  () => {
  return (dispatch) => {

    const promises = [
      getClassificationList("MANUFACTURER"),
      getClassificationList("FEATURE"),
      getClassificationList("TRANSMISSION"),
      getClassificationList("FUEL"),
    ];

    return Promise.all(promises).then((responses) => {
        const respBrand = responses[0];
        const respFeature = responses[1];
        const respTransmission = responses[2];
        const respFuels = responses[3];

        const brandsInit = [{id: -1, name: <Translate value="all"/>}];
        const brands = brandsInit.concat(respBrand.items);

        const featuresInit = [{id: -1, name: <Translate value="all"/>}];
        const features = featuresInit.concat(respFeature.items);

        const transmissions = respTransmission.items.map((obj)=>{
          const translation = `components.car_search.${obj.name.toString().toLowerCase()}`;
          return {id: obj.id, name: <Translate value={translation}/>, value: obj.value};
        });

        const fuels = respFuels.items.map((obj)=>{
          const translation = `components.car_search.${obj.name.toString().toLowerCase()}`;
          return {id: obj.id, name: <Translate value={translation}/>, value: obj.value};
        });

        // TODO: temporary data. Use API data.
        // TODO: REPLACE with api data
        const doors = [
          {id: -1, name: <Translate value="all"/>},
          {id: 0, name: "2"},
          {id: 1, name: "3"},
          {id: 2, name: "4+"}
        ];

        const seats = [
          {id: -1, name: <Translate value="all"/>},
          {id: 0, name: "2"},
          {id: 1, name: "3"},
          {id: 2, name: "5"},
          {id: 3, name: "6+"}
        ];

        const yearDifference = 11;  // the age of the oldest car to be searched
        const sliderValues = {
          mileage: {min: 0, max: 500000, units: "KM"},
          price: {min: 0, max: 100000, units: "EUR"},
          year: {min: moment().year() - yearDifference, max: moment().year(), units: ""},
          petrolConsumption: {min: 0, max: 20, units: "L"},
          power: {min: 0, max: 500, units: "KW"}
        };

        dispatch(setBaseValues(sliderValues, [], brands, transmissions, fuels, features, doors, seats));
    });
  };
};
