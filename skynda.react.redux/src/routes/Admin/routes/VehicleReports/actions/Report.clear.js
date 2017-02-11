import {setVehicleReportData} from "../actions";

export default () => (dispatch) => dispatch(setVehicleReportData({isFetching: false, data: null}));
