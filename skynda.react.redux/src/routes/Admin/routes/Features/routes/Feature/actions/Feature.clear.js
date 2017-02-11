import {setFeatureData} from "../actions";

export default () => (dispatch) => dispatch(setFeatureData({isFetching: false, data: null}));
