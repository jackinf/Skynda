import Home from "../components/Home";
import {connect} from "react-redux";
import {getClassificationsAsync, searchCarAsync} from "../reducers";

//Object of action creators
const mapDispatchToProps = {
  getClassificationsAsync,
  searchCarAsync
};

//STATE PROPS
const mapStateToProps = (state) => ({
  searchResults: state.searchResults,
  isSearching: state.isSearching,
  showAdvancedSearch: state.showAdvancedSearch,
  sliderValues: state.sliderValues,
  buttonGroupValues: state.buttonGroupValues,
  seats: state.seats,
  doors: state.doors,
  transmissions: state.transmissions,
  features: state.features,
  brands: state.brands
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
