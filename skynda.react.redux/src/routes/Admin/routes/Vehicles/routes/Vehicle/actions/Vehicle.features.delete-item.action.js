/**
 * Created by zekar on 3/8/2017.
 */
import {setFeaturesList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {FeatureService, VehicleFeatureService} from "../../../../../../../webServices"

export default function deleteItem(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.VEHICLE_FEATURES_DATA_LIST].items;
    const promise = VehicleFeatureService.deleteItem(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setFeaturesList({isFetching: false, items: items}));
    }).catch(err => {
      throw err;
    });
  };
}
