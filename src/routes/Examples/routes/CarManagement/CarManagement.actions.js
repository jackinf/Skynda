import {CAR_UPLOAD_FORM} from "./CarManagement.constants";

export const submitUploadForm = () => {
  return (dispatch, getState) => {
    const state = getState();
    const reduxForm = state.form[CAR_UPLOAD_FORM];
    console.log("Submitted values: ", reduxForm.values);
  };
};
