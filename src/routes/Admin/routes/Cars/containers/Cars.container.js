/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import {getList} from "../actions/Cars";
import {setCars} from "./../reducers/SetCars.reducer";
import CarList from "./../components/Cars.component";

const mapDispatchToProps = {
  getList,
  setCars
};

const mapStateToProps = (state) => ({
  carsData: state.carsData
});

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
