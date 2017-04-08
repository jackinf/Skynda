import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from 'redux-form';
import {renderTextField} from "../../../../../../components/FormRenderers";

export const TextAreaForReport = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField} multiLine={true}
             rows={5} style={{width: '100%'}}/>
    </Col>
  </Row>
</div>);

export default TextAreaForReport;
