import {setVehicles} from "../reducers/Vehicles.list.reducer";
import {REDUCER_KEYS} from "../constants/Vehicle.constant";
import {VehicleService} from "../../../../../webServices"

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLES_DATA].items;
    const promise = VehicleService.deleteItem(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setVehicles({isFetching: false, items: items}));
    }).catch(err => {
      throw err;
    });
  };
}
