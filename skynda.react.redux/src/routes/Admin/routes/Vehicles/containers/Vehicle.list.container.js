import {connect} from "react-redux";
import {getList, deleteItem} from "../actions";
import VehiclesComponent from "../components/Vehicle.list.component";
import {REDUCER_KEYS} from "../constants/Vehicle.constant";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.VEHICLES_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesComponent);
