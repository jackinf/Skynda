import {setVehicles} from "../reducers/Vehicles.list.reducer";
import {VehicleService} from "../../../../../webServices"

export default function getList() {
  return (dispatch) => {
    dispatch(setVehicles({isFetching: true}));
    const promise = VehicleService.getList();
    promise.then(resp => {
      dispatch(setVehicles({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setVehicles({isFetching: false, items: []}));
      throw err;
    });
  };
}
