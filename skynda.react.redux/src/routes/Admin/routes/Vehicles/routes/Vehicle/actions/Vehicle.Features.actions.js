import {setFeaturesList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicle.constant";
import {FeatureService, VehicleFeatureService} from "../../../../../../../webServices"

export function getList() {
  return (dispatch) => {
    dispatch(setFeaturesList({isFetching: true}));
    const promise = FeatureService.getAdminSelectList();
    promise.then(resp => {
      dispatch(setFeaturesList({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setFeaturesList({isFetching: false, items: []}));
      throw err;
    });
  };
}

export function deleteItem(id) {
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


export default {
  getList,
  deleteItem
};
