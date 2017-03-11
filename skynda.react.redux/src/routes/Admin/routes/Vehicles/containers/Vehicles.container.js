import {connect} from "react-redux";
import {getList, deleteItem} from "../actions";
import VehiclesComponent from "../components/Vehicles.component";
import {REDUCER_KEYS} from "../constants/Vehicles.constant";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  isFetching: state[REDUCER_KEYS.VEHICLES_DATA].isFetching,
  items: state[REDUCER_KEYS.VEHICLES_DATA].items
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesComponent);
