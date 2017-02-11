import React from "react";
import {renderTextField, renderCheckbox} from "../../../../../components/FormRenderers";
import {Field} from 'redux-form';
import {Row, Col} from "react-bootstrap";


export const TextFieldForFeature = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField} />
    </Col>
  </Row>
</div>);

export const TextAreaForFeature = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField} multiLine={true}
             rows={2}/>
    </Col>
  </Row>
</div>);

export const CheckboxForFeature = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderCheckbox}/>
    </Col>
  </Row>
</div>);


