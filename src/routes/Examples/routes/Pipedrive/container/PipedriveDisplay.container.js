/**
 * Created by jevgenir on 12/11/2016.
 */

import {connect} from "react-redux";
import Component from "../components/PipedriveDisplay.component";
import {getAllDeals, getAllStages} from "../reducers/Pipedrive.reducer";

const mapStateToProps = (state) => {
  console.log(state);
  return {
    deals: state.pipedrive.deals,
    stages: state.pipedrive.stages
  }
};

const mapDispatchToProps = {
  getAllDeals,
  getAllStages
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
