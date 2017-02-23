import {setFeaturesList} from "../actions";
import {REDUCER_KEYS} from "../Features.constant";
import {FeatureService} from "../../../../../webServices"

export default function deleteFeature(id) {
  return (dispatch, getState) => {
    let items = getState()[REDUCER_KEYS.FEATURES_LIST].items;
    dispatch(setFeaturesList({isFetching: true}));
    const promise = FeatureService.deleteFeature(id);
    promise.then(resp => {
      items = items.filter(c => c.id !== id);
      dispatch(setFeaturesList({isFetching: false, items: items}));
    }).catch(err => {
      throw err;
    });
  };
}
