/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import {getList, deleteItem} from "../actions/Vehicles";
import VehiclesComponent from "../components/Vehicles.component";
import {REDUCER_KEYS} from "../constants/Vehicle.constant";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.VEHICLES_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(VehiclesComponent);
