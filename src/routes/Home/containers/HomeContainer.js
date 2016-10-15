import Home from "../Home";
import { connect } from "react-redux";
import {searchBtnReducers} from "../reducers";

//Object of action creators
const mapDispatchToProps = {
  searchBtnReducers
};

//STATE PROPS
const mapStateToProps = (state) => ({
  isSearching: state.isSearching,
  toggleAdvancedSearch: state.toggleAdvancedSearch
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
