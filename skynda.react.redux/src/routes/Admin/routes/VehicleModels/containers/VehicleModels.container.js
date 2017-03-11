import {connect} from "react-redux";
import {getList, deleteItem} from "../actions";
import VehicleModelsComponent from "../components/VehicleModels.component";
import {REDUCER_KEYS} from "../constants/VehicleModel.constant";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  isFetching: state[REDUCER_KEYS.VEHICLE_MODELS_DATA].isFetching,
  items: state[REDUCER_KEYS.VEHICLE_MODELS_DATA].items
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModelsComponent);
