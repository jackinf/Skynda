/**
 * Created by jevgenir on 10/24/2016.
 */
import {setVehicleReportData} from "../reducers/SetVehicleReport.reducer";

export default function fillWithFakeData() {
  const fakeData = {};
  return (dispatch) => dispatch(setVehicleReportData({isFetching: false, data: fakeData}));
}
