/**
 * Created by jevgenir on 11/8/2016.
 */
import {connect} from "react-redux";
import Header from "./Header";
export default connect((state) => ({auth: state.auth}), {})(Header);
