/**
 * Created by zekar on 3/12/2017.
 */

import {connect} from "react-redux";
import {getList, deleteItem} from "../actions";
import VehiclesComponent from "../components/VehicleReports.component";
import {REDUCER_KEYS} from "../constants/VehicleReport.constant";

export default connect((state) => ({data: state[REDUCER_KEYS.VEHICLES_REPORTS_DATA]}), {
  getList,
  deleteItem
})(VehiclesComponent);
