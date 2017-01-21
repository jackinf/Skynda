import React from "react";
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import {TextField} from "redux-form-material-ui";

/**
 * Wrapper for rendering list of items (for redux-form fields)
 * @param fields
 * @param title
 * @param block - REACT element
 * @param isRequired - is the field required for submission?
 */
export const fieldListWrapper = ({fields, title, block, isRequired = false}) => (
  <Row style={{marginBottom: "20px"}}>
    <Col sm={12}>
      <Row>
        <Col sm={12}>
          <h3>
            <FloatingActionButton mini={true} onClick={() => fields.push()}>
              <ContentAdd />
            </FloatingActionButton>&nbsp;{title} ({fields.length})
          </h3>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {block}
        </Col>
      </Row>
    </Col>
  </Row>
);

export function renderImage({input}, title, fallbackLabel) {
  return (<span>
    <label className="label-info">{title}:</label>&nbsp;
    {input.value
      ? <img src={input.value} width={300}/>
      : <label>{fallbackLabel || "NONE"}</label>}
  </span>);
}

export const renderCheckbox = ({input, label, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <Checkbox label={label}
                checked={!!input.value}
                onCheck={input.onChange}/>
    </Col>
  </Row>
);

export const renderRadioGroup = ({input, ...rest}) => (
  <RadioButtonGroup {...input} {...rest}
                    valueSelected={input.value}
                    onChange={(event, value) => input.onChange(value)}/>
);

export const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
    </Col>
  </Row>
);

export const renderTextField = ({label, meta: {touched, error}, children, ...custom}) => (
      <TextField
        floatingLabelText={label}
        errorText={touched && error}
        children={children}
        {...custom}/>
);
