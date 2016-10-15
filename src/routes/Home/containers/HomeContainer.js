import Home from "../Home";
import { connect } from "react-redux";
import {searchBtn, toggleBtn, setValues, loadBaseData} from "../reducers";

//Object of action creators
const mapDispatchToProps = {
  searchBtn,
  toggleBtn,
  setValues,
  loadBaseData
};

//STATE PROPS
const mapStateToProps = (state) => ({
  isSearching: state.isSearching,
  showAdvancedSearch: state.showAdvancedSearch,
  sliderValues: state.sliderValues,
  seats: state.seats,
  doors: state.doors,
  transmissions: state.transmissions,
  features: state.features,
  brands: state.brands
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
