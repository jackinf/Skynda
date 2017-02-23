import {connect} from "react-redux";
import {getColors} from "./Classifiers.module";
import ClassifiersComponent from "./Classifiers.component";

const statesToProps = (state) => ({data: state["classificators"].color});
const actionsToProps = {getColors};

export default connect(statesToProps, actionsToProps)(ClassifiersComponent);
