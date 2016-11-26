/**
 * Created by jevgenir on 11/13/2016.
 */
import {connect} from "react-redux";
import {getColors} from "./Classifiers.module";
import {REDUCER_KEYS} from "./Classifiers.constant";
import ClassifiersComponent from "./Classifiers.component";

const statesToProps = (state) => ({data: state["classificators"].color});
const actionsToProps = {getColors};

export default connect(statesToProps, actionsToProps)(ClassifiersComponent);
