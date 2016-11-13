/**
 * Created by jevgenir on 11/13/2016.
 */
import {connect} from "react-redux";
import getList from "./Classifiers.action.getList";
import {REDUCER_KEYS} from "./Classifiers.constant";
import CarModelsComponent from "./Classifiers.component";

export default connect((state) => ({
  data: state[REDUCER_KEYS.VEHICLE_MODELS_DATA]
}), {getList})(CarModelsComponent);
