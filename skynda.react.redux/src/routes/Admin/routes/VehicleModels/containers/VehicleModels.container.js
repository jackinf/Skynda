/**
 * Created by jevgenir on 10/26/2016.
 */
import {connect} from "react-redux";
import {getList} from "../reducers/VehicleModels.reducer";
import {REDUCER_KEYS} from "../constants/VehicleModel.constant";
import CarModelsComponent from "../components/VehicleModels.component";

const mapDispatchToProps = {
  getList
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.VEHICLE_MODELS_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(CarModelsComponent);
