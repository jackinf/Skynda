import fromSpringToReduxFormError from "../../../utils/formUtils/fromSpringToReduxFormError";
import {SubmissionError} from "redux-form";
import {SubscriptionService} from "../../../webServices";

export function sendSubscriptionEmail(item) {
  const promise = SubscriptionService.sendSubscriptionEmail(item);
  promise.then(resp => {
    if (!resp.success) {
      const errors = fromSpringToReduxFormError(resp.errors);
      // dispatch(fetchFailed(errors));
      throw new SubmissionError(errors);
    }
    return resp;
  }).catch(error => {
    throw error;
  })
}
