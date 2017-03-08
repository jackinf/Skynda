import {connect} from "react-redux";
import {getList, deleteItem} from "../actions";
import VehicleModelsComponent from "../components/VehicleModels.component";
import {REDUCER_KEYS} from "../constants/VehicleModel.constant";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.VEHICLE_MODELS_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleModelsComponent);
