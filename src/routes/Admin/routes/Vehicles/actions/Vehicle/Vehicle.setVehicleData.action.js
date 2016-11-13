/**
 * Created by zekar on 10/23/2016.
 */
import {ACTIONS} from "../../constants/Vehicle.constant";

export default function setVehicleData(value) {
  return {
    type: ACTIONS.SET_VEHICLE_DATA,
    payload: value
  };
}
