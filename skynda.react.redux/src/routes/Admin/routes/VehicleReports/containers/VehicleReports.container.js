import {connect} from "react-redux";
import {getList, deleteItem} from "../reducers";
import VehiclesComponent from "../components/VehicleReports.component";
import {REDUCER_KEYS} from "../constants/VehicleReport.constant";

const mapStateToProps = (state) => {
  return {
    data: state[REDUCER_KEYS.VEHICLES_REPORTS_DATA]
  };
};

const mapDispatchToProps = {
  getList,
  deleteItem
};

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesComponent);
