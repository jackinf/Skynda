/**
 * Created by zekar on 3/6/2017.
 */
import {VehicleModelService} from "../../../../../webServices/VehicleModelServices";

export const SET_VEHICLE_MODELS_DATA = "VEHICLE_MODEL/SET_VEHICLE_MODELS_DATA";  // TODO: Request, success, failure

export function setVehicleModels(value) {
  return {
    type: SET_VEHICLE_MODELS_DATA,
    payload: value
  };
}

export default function getList() {
  return async (dispatch) => {
    try {
      dispatch(setVehicleModels({isFetching: true}));
      const resp = await VehicleModelService.getList();
      dispatch(setVehicleModels({isFetching: false, items: resp}));
    } catch(err) {
      dispatch(setVehicleModels({isFetching: false, items: []}));
    }
  }
}

