/**
 * Created by jevgenir on 11/13/2016.
 */
import {connect} from "react-redux";
import {getColors} from "./Classifiers.action.getList";
import {REDUCER_KEYS} from "./Classifiers.constant";
import ClassifiersComponent from "./Classifiers.component";

const statesToProps = (state) => ({data: state[REDUCER_KEYS.VEHICLE_MODELS_DATA]});
const actionsToProps = {getColors};

export default connect(statesToProps, actionsToProps)(ClassifiersComponent);
