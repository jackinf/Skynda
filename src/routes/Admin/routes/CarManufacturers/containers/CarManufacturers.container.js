/**
 * Created by jevgenir on 10/26/2016.
 */
import {connect} from "react-redux";
import {getList} from "../actions";
import {REDUCER_KEYS} from "../constants/CarManufacturers.constant";
import CarModelsComponent from "../components/CarManufacturers.component";

const mapDispatchToProps = {
  getList
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.CAR_MODELS_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(CarModelsComponent);
