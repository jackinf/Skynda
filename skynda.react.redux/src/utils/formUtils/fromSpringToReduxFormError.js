import _ from "underscore";

export default function fromSpringToReduxFormError(modelStateErrors) {
  if (!_.isArray(modelStateErrors)) {
    return {};
  }

  const errs = modelStateErrors
    .filter(springError => "code" in springError && "defaultMessage" in springError)
    .map(springError => ({[springError.code]: springError.defaultMessage}));

  const reduxErrors = {_error: "Failed"};
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
