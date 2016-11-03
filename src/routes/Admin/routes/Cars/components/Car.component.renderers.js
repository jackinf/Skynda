/**
 * Created by jevgenir on 10/22/2016.
 */
import React from "react";
import {Field} from 'redux-form';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {guidUtil} from "../../../../../utils/allUtils";

/*
 ====================================
 MATERIAL UI
 ====================================
 */

export const renderTextField = ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <TextField hintText={label} floatingLabelText={label} errorText={touched && error} {...input} {...custom} />
    </Col>
  </Row>
);

export const renderImage = ({input}) => (<img src={input.value} width={100} />);

export const renderCheckbox = ({input, label, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <Checkbox label={label}
                checked={input.value ? true : false}
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

/*
 ====================================
 FIELD ARRAYS
 ====================================
 */
export const renderDescriptions = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<ul>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.title`} type="text" component={renderTextField}
               placeholder={`Description #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component={renderTextField} placeholder={`Description #${index + 1}`}/>
        <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
          <ContentRemove />
        </FloatingActionButton></li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>)
});

export const renderFeatures = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<ul>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.text`} type="text" component={renderTextField} placeholder={`Feature #${index + 1}`}/>
        <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
          <ContentRemove />
        </FloatingActionButton></li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>)
});

export const renderFaults = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<ul>
    {fields.map((field, index) => {
      return (<li key={index}>
        {/*<Field name={`${field}.id`} type="text" component="input" />*/}
        <Field name={`${field}.file`} type="file" component="input" onChange={e => custom.onFaultFileAdd(e, index)}/>
        <Field name={`${field}.text`} type="text" component={renderTextField} placeholder={`Text #${index + 1}`}/>
        <Field name={`${field}.img`} type="text" component={renderImage} />
        <Field name={`${field}.base64File`} type="text" component={renderImage} />
        <FloatingActionButton mini={true} secondary={true}
                              onClick={(e) => {
                                fields.remove(index);
                                custom.onFaultRemove(e, index);
                              }}>
          <ContentRemove />
        </FloatingActionButton></li>
      );
      }
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>)
});

/**
 * Private. Wraps around list of items
 * @param fields
 * @param title
 * @param block - REACT element
 * @param isRequired - is the field required for submission?
 */
const fieldListWrapper = ({fields, title, block, isRequired = false}) => (
  <Row style={{marginBottom: "20px", border: "1px solid #cdcdcd", background: "#efefef"}}>
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
