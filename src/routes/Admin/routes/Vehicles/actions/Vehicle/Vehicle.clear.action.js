/**
 * Created by zekar on 10/23/2016.
 */
import {setVehicleData} from "./../../reducers/SetVehicle.reducer";

export default () => (dispatch) => dispatch(setVehicleData({isFetching: false, data: null}));
