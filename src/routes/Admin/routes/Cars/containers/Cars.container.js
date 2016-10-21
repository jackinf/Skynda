/**
 * Created by jevgenir on 10/21/2016.
 */
import {connect} from "react-redux";
import {getList} from "../actions/Cars.action";
import CarList from "./../components/Cars.component";

const mapDispatchToProps = {
  getList
};

const mapStateToProps = (state) => ({
  carData: state.carData
});

export default connect(mapStateToProps, mapDispatchToProps)(CarList);
