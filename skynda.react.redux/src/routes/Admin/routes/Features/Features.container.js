import {connect} from "react-redux";
import {getFeatures, deleteFeature} from "./actions";
import FeaturesList from "./Features.component";
import {REDUCER_KEYS} from "./Features.constant";

const mapDispatchToProps = {
  getFeaturesList: getFeatures,
  deleteFeature: deleteFeature
};

const mapStateToProps = (state) => ({
  data: state[REDUCER_KEYS.FEATURES_LIST]
});

export default connect(mapStateToProps, mapDispatchToProps)(FeaturesList);
