/**
 * Created by jevgenir on 11/13/2016.
 */
import {connect} from "react-redux";
import {getImages, getBlobImages} from "./Image.list.reducer";
import {REDUCER_KEYS} from "./Image.list.constant";
import ImageListComponent from "./Image.list.component";

const statesToProps = (state) => ({
  data: state[REDUCER_KEYS.ADMIN_IMAGES].imageData,
  blobImageData: state[REDUCER_KEYS.ADMIN_IMAGES].blobImageData
});
const actionsToProps = {getImages, getBlobImages};

export default connect(statesToProps, actionsToProps)(ImageListComponent);
