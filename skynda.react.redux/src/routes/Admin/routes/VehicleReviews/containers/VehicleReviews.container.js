import {connect} from "react-redux";
import {getList, deleteItem} from "../actions";
import VehiclesComponent from "../components/VehicleReviews.component";
import {REDUCER_KEYS} from "../constants/VehicleReview.constant";

export default connect((state) => ({data: state[REDUCER_KEYS.VEHICLES_REVIEWS_DATA]}), {
  getList,
  deleteItem
})(VehiclesComponent);
