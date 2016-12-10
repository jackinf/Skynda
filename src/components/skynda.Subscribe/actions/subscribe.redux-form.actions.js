import remoteConfig from "../../../store/remoteConfig";
import fromSpringToReduxFormError from "../../../utils/formUtils/fromSpringToReduxFormError";
import {SubmissionError} from "redux-form";

export function sendSubscriptionEmail(item) {
  console.log("sendSubscriptionEmail reached", item)
  return fetch(`${remoteConfig.remote}/api/subscribe`, {
    method: "POST",
    credentials: "include",
    headers: {"Accept": "application/json", "Content-Type": "application/json"},
    body: JSON.stringify(item)
  })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      if (!resp.success) {
        const errors = fromSpringToReduxFormError(resp.errors);
        // dispatch(fetchFailed(errors));
        throw new SubmissionError(errors);
      }
      return resp;
    });
}
