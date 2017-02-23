import {setFeaturesList} from "../actions";
import {FeatureService} from "../../../../../webServices"

export default function getFeatures() {
  return (dispatch) => {
    dispatch(setFeaturesList({isFetching: true}));
    const promise = FeatureService.getFeatures();
    promise.then(resp => {
      dispatch(setFeaturesList({isFetching: false, items: resp}));
    }).catch(err => {
      dispatch(setFeaturesList({isFetching: false, items: []}));
      throw err;
    });
  };
}
