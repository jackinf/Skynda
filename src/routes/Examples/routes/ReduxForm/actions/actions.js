export const submitMyForm = () => {
  return (dispatch, getState) => {
    const state = getState();
    const reduxForm = state.form.reduxForm;
    console.log("Submitted values: ", reduxForm.values);
  };
};
