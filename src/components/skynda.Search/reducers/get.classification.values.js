import moment from "moment";
import {setBaseValues} from "./../actions"
import {Translate} from 'react-redux-i18n';
import React from "react";
import remoteConfig from "store/remoteConfig";
import fetch from "isomorphic-fetch";

async function getClassificationList(type){
  return await fetch(`${remoteConfig.remote}/api/classifications/${type}/vehicle-bound`, {
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
    return new Promise((resolve) => {
      setTimeout(async() => {
        const respBrand = await getClassificationList("MANUFACTURER");
        const brandsInit = [{id: -1, name: <Translate value="all"/>}];
        const brands = brandsInit.concat(respBrand.items);

        const respFeature = await getClassificationList("FEATURE");
        const featuresInit = [{id: -1, name: <Translate value="all"/>}];
        const features = featuresInit.concat(respFeature.items);

        const respTransmission = await getClassificationList("TRANSMISSION");
        const transmissions = respTransmission.items.map((obj)=>{
          const translation = `components.car_search.${obj.name.toString().toLowerCase()}`;
          var returnObj = {
            id: obj.id,
            name: <Translate value={translation} />,
            value: obj.value
          };
          return returnObj;
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

        const sliderValues = {
          mileage: {min: 0, max: 500000, units: "KM"},
          price: {min: 0, max: 500000, units: "EUR"},
          year: {min: 2006, max: moment().year(), units: ""},
          petrolConsumption: {min: 0, max: 20, units: "L"},
          power: {min: 0, max: 1000, units: "KW"}
        };

        dispatch(setBaseValues({
          sliderValues: {
            key: "sliderValues",
            value: sliderValues
          },
          brands: {
            key: "brands",
            value: brands
          },
          features: {
            key: "features",
            value: features
          },
          transmissions: {
            key: "transmissions",
            value: transmissions
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
        resolve();
      }, 200);
    });
  };
};
