import React from "react";
import {TextField} from "redux-form-material-ui";

export default function renderTextField({label, meta: {touched, error}, children, ...custom}) {
  return (
    <div>
      <TextField
        floatingLabelText={label}
        errorText={touched && error}
        children={children}
        {...custom}
      />
    </div>
  )
}
