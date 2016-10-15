import Home from "../Home";
import { connect } from "react-redux";
import {isSearching} from "../reducers";

const mapDispatchToProps = {
  isSearching
};

const mapStateToProps = (state) => ({
  isSearching: state.isSearching,
  temp: state.temp
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
