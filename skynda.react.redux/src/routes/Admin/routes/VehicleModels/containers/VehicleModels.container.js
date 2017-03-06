import {connect} from "react-redux";
import {deleteItem, getList} from "../actions";
import {REDUCER_KEYS} from "../constants/VehicleModel.constant";
import CarModelsComponent from "../components/VehicleModels.component";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.VEHICLE_MODELS_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(CarModelsComponent);
