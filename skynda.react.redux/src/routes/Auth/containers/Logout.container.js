/**
 * Created by jevgenir on 11/8/2016.
 */

import {connect} from "react-redux";
import {submitLogout} from "../actions";
import LogoutComponent from "../components/Logout.component";
import {REDUCER_KEY__AUTH} from "../constants/Auth.constants";

const mapStateToProps = (state) => ({
  isFetching: state[REDUCER_KEY__AUTH].isFetching
});

const mapDispatchToProps = {
  submitLogout
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutComponent);
