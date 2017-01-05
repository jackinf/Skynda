/**
 * Created by jevgenir on 11/7/2016.
 */

export default function submitRegister(data) {
  return (dispatch, getState) => {
    const registerFormValues = getState().form.registerForm.values;
    return Promise.resolve(true); // TODO: fetch
  }
}
