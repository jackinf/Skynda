/**
 * Created by jevgenir on 11/8/2016.
 */
import {connect} from "react-redux";
import Header from "./Header.component";
import submitLogout from "./../../routes/Auth/actions/submitLogout.action";
export default connect((state) => ({auth: state.auth}), {submitLogout})(Header);
