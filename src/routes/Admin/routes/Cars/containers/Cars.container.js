/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import {getList, deleteItem} from "../actions/Cars";
import CarsComponent from "./../components/Cars.component";
import {REDUCER_KEYS} from "../constants/Car.constant";

const mapDispatchToProps = {
  getList,
  deleteItem
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.CARS_DATA]
});

export default connect(mapStateToProps, mapDispatchToProps)(CarsComponent);
