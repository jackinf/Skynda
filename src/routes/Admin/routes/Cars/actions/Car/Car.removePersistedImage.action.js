/**
 * Created by jevgenir on 11/2/2016.
 */

// import setCarData from "./Car.setCarData.action";
import {FORMS} from "../../constants/Car.constant";
import {arrayRemove} from "redux-form";

export default function removeImage(index) {

  return (dispatch, getState) => {
    // const data = getState().carData.data;
    // data && data.images.splice(index, 1);
    // dispatch(setCarData({isFetching: false, data}));
    dispatch(arrayRemove(FORMS.CAR_FORM, "images", index));
  };
}
