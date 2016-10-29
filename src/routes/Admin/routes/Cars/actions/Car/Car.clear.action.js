/**
 * Created by zekar on 10/23/2016.
 */
import setCarData from "./Car.setCarData.action";

export default () => (dispatch) => dispatch(setCarData({isFetching: false, data: null}));
