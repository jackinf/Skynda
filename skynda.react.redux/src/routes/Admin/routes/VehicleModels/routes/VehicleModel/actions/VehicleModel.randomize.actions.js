/**
 * Created by zekar on 3/6/2017.
 */
import {destroy} from "redux-form";

export const SET_RANDOM_ITEM = "VEHICLE_MODEL/SET_ITEM";

function setRandomItem(item) {
  return {
    type: SET_RANDOM_ITEM,
    item
  }
}

export default function randomize(prevItem) {
  return (dispatch) => {
    dispatch(destroy("vehicleModelForm"));
    const fake = {
     ...prevItem,
     "title": Math.random(),
     "description": Math.random(),
     "doors": 3,
     "drivetrain": {id: 3},
     "engine": Math.random(),
     "fuelType": {id: 43},
     "vehicleBody": {id: 52},
     "horsePower": 5,
     "modelCode": Math.random(),
     "seats": 7,
     "transmission": {id: 7},
     "vehicleManufacturer": {id: 16},
     "year": 2000
    };
    dispatch(setRandomItem(fake));
  }
};
