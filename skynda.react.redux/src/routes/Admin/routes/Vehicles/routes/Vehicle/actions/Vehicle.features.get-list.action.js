import {setFeaturesList} from "./index";
import {REDUCER_KEYS} from "../../../constants/Vehicles.constant";
import {FeatureService, VehicleFeatureService} from "../../../../../../../webServices"

export default function getList() {
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
