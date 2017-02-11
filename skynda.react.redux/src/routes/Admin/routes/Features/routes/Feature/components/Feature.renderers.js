import {renderTextField, renderCheckbox} from "../../../../../components/FormRenderers";

export const TextFieldForFeature = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField}
             errors={errors}/>
    </Col>
  </Row>
</div>);

export const TextAreaForFeature = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField} multiLine={true}
             rows={2}
             errors={errors}/>
    </Col>
  </Row>
</div>);

export const CheckboxForFeature = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderCheckbox}
             errors={errors}/>
    </Col>
  </Row>
</div>);


