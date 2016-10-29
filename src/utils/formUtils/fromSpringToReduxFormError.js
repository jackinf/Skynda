/**
 * Created by jevgenir on 10/28/2016.
 */
import _ from "underscore";

export default function fromSpringToReduxFormError(springErrors) {
  if (!_.isArray(springErrors)) {
    return {};
  }

  const errs = springErrors
    .filter(springError => "code" in springError && "defaultMessage" in springError)
    .map(springError => ({[springError.code]: springError.defaultMessage}));

  const reduxErrors = {};
  for (let i in errs) {
    if (!errs.hasOwnProperty(i)) {
      continue;
    }
    var obj = errs[i];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        reduxErrors[key] = obj[key];
      }
    }
  }

  return reduxErrors;
}
