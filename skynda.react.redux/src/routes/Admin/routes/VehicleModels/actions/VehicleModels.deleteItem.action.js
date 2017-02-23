import {setVehicleModels} from "../reducers/VehicleModels.reducer";
import {REDUCER_KEYS} from "../constants/VehicleModel.constant";
import {VehicleModelService} from "../../../../../webServices"

export default function deleteItem(id) {
  return async(dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_MODELS_DATA].items;
    const promise = VehicleModelService.deleteItem(id);
    promise.then(resp => {
        items = items.filter(c => c.id !== id);
        dispatch(setVehicleModels({isFetching: false, items: items}));
      })
      .catch(err => {
        throw err;
      });
  }
}
