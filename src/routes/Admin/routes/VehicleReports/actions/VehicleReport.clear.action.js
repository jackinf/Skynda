/**
 * Created by zekar on 10/23/2016.
 */
import {setVehicleReportData} from "../reducers/SetVehicleReport.reducer";

export default () => (dispatch) => dispatch(setVehicleReportData({isFetching: false, data: null}));
