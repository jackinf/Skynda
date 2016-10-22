import moment from "moment";
import {setStateValues} from './../actions/index';
import {Translate} from 'react-redux-i18n';
import React from "react";

export const loadBaseData = () => {
  return (dispatch) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // TODO: temporary data. Use API data.
        // TODO: REPLACE with api data
        const brands = [
          {id: -1, name: <Translate value="all"/>},
          {id: 0, name: "BMW"},
          {id: 1, name: "Chrysler"},
          {id: 2, name: "Citroen"},
          {id: 3, name: "Fiat"},
          {id: 4, name: "Ford"},
          {id: 5, name: "Honda"},
          {id: 6, name: "Hyundai"},
          {id: 7, name: "Kia"},
          {id: 8, name: "Lexus"},
          {id: 9, name: "Mazda"},
          {id: 10, name: "Nissan"},
          {id: 11, name: "Opel"},
          {id: 12, name: "Peugeot"},
          {id: 13, name: "Renault"},
          {id: 14, name: "Seat"},
          {id: 15, name: "Skoda"},
          {id: 16, name: "Subaru"},
          {id: 17, name: "Volkswagen"},
          {id: 18, name: "Volvo"}
        ];

        const features = [
          {id: -1, name: <Translate value="all"/>, toggled: true},
          {id: 0, name: "Parking Sensors"},
          {id: 1, name: "Bluetooth"},
          {id: 2, name: "Sunroof"},
          {id: 3, name: "Navigation"},
          {id: 4, name: "leather"},
          {id: 5, name: "Premium Lights"}
        ];

        const transmissions = [
          {id: 0, name: <Translate value="components.car_search.automatic"/>, toggled: true},
          {id: 1, name: <Translate value="components.car_search.manual"/>, toggled: true}
        ];

        const doors = [
          {id: -1, name: <Translate value="all"/>, toggled: true},
          {id: 0, name: "2"},
          {id: 1, name: "3"},
          {id: 2, name: "4+"}
        ];

        const seats = [
          {id: -1, name: <Translate value="all"/>, toggled: true},
          {id: 0, name: "2"},
          {id: 1, name: "3"},
          {id: 2, name: "5"},
          {id: 3, name: "6+"}
        ];

        const sliderValues = {
          mileage: {min: 0, max: 500000, units: "KM"},
          price: {min: 0, max: 500000, units: "EUR"},
          year: {min: 2006, max: moment().year(), units: ""},
          petrol_consumption: {min: 0, max: 20, units: "L"},
          power: {min: 0, max: 500, units: "KW"}
        };

        dispatch(setStateValues({
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


export const setValues = (state = [], action) => {
  switch (action.type) {
    case "SET_STATE_VALUES":
      var newState = {...state};
      newState[action.payload.sliderValues.key] = action.payload.sliderValues.value;
      newState[action.payload.brands.key] = action.payload.brands.value;
      newState[action.payload.features.key] = action.payload.features.value;
      newState[action.payload.transmissions.key] = action.payload.transmissions.value;
      newState[action.payload.doors.key] = action.payload.doors.value;
      newState[action.payload.seats.key] = action.payload.seats.value;
      return {
        ...newState
      };

    default:
      return state;
  }
};
