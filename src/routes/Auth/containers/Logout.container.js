/**
 * Created by jevgenir on 11/8/2016.
 */

import {connect} from "react-redux";
import {submitLogout} from "../actions";
import LogoutComponent from "../components/Logout.component";

export default connect((state) => ({}), {submitLogout})(LogoutComponent);
