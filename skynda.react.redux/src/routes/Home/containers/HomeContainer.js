import {connect} from "react-redux";
import Home from "../components/Home";
import {searchCarAsync} from '../../../components/skynda.Search/reducers/make.search'

export default connect((state) => ({}), {searchCarAsync})(Home);
