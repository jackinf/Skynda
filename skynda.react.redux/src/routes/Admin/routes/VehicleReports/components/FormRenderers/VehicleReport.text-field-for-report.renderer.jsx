import {Row, Col} from "react-bootstrap";
import {Field} from 'redux-form';
import {renderTextField} from "../../../../components/FormRenderers";

export const TextFieldForReport = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField}/>
    </Col>
  </Row>
</div>);

export default TextFieldForReport;
