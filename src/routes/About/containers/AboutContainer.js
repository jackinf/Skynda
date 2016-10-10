import {connect} from "react-redux";
import {loadPeople} from "../modules/About.people";
import {loadDescription} from "../modules/About.description";

import About from "../components/About";

const mapDispatchToProps = {
  loadPeople,
  loadDescription
};

const mapStateToProps = (state) => ({
  people : state.people,
  description : state.description
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
