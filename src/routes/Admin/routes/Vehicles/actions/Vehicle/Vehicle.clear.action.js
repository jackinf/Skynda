/**
 * Created by zekar on 10/23/2016.
 */
import {setVehicleData} from "../../reducers/Vehicle.reducer";

export default () => (dispatch) => dispatch(setVehicleData({isFetching: false, data: null}));
