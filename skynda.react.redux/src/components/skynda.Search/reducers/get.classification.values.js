import moment from "moment";
import {setBaseValues} from "./../actions"
import {Translate} from 'react-redux-i18n';
import React from "react";
import remoteConfig from "../../../store/remoteConfig";
import fetch from "isomorphic-fetch";

function getClassificationList(type){
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

function getModelsList(){
  return fetch(`${remoteConfig.remote}/api/vehicle-models/`, {
    method: "GET",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"}
  })
    .then(resp => resp.json())
    .then(resp => {
      const items = resp.map(item => ({id: item.id, name: item.title, value: item.id}));
      return { success: true, items };
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
      getModelsList(),
      getClassificationList("FUEL"),
    ];

    return Promise.all(promises).then((responses) => {
        const respBrand = responses[0];
        const respFeature = responses[1];
        const respTransmission = responses[2];
        const respModel = responses[3];
        const respFuels = responses[4];

        const brandsInit = [{id: -1, name: <Translate value="all"/>}];
        const brands = brandsInit.concat(respBrand.items);

        const featuresInit = [{id: -1, name: <Translate value="all"/>}];
        const features = featuresInit.concat(respFeature.items);

        const transmissions = respTransmission.items.map((obj)=>{
          const translation = `components.car_search.${obj.name.toString().toLowerCase()}`;
          return {id: obj.id, name: <Translate value={translation}/>, value: obj.value};
        });

        const modelsInit = [{id: -1, name: <Translate value="all"/>}];
        const models = modelsInit.concat(respModel.items);

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

        dispatch(setBaseValues({
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
        }));
    });
  };
};
