/**
 * Created by jevgenir on 11/8/2016.
 */
import {connect} from "react-redux";
import Header from "./Header.component";
import submitLogout from "./../../routes/Auth/actions/submitLogout.action";

const mapStateToProps = (state) => ({auth: state.auth, activePathname: state.location ? state.location.pathname : "/"});
export default connect(mapStateToProps, {submitLogout})(Header);
