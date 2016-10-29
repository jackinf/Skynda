/**
 * Created by zekar on 10/23/2016.
 */
import {ACTIONS} from "./../../constants/Car.constant";

export default function setCarData(value) {
  return {
    type: ACTIONS.SET_CAR_DATA,
    payload: value
  };
}
