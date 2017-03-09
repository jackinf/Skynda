import React from "react";
import {Field} from 'redux-form';
import {Card} from 'material-ui/Card';
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {fieldListWrapper} from "../../../../../../components/FormRenderers/index";

export const renderReportItems = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.label,
  block: (<div>
    {fields.map((name, index) =>
      <Card key={index} className="vehicle-component--list-card">
        <Row>
          <Col smOffset={1} md={9}>
            <Field name={`${name}.title`} type="text" component={renderTextField} placeholder={`Title #${index + 1}`}/>
            <Field name={`${name}.description`} type="text" component={renderTextField} multiLine={true} rows={4}
                   placeholder={`Description #${index + 1}`}/>
          </Col>
          <Col sm={2}>
            <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
              <ContentRemove />
            </FloatingActionButton>
          </Col>
        </Row>
      </Card>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export default renderReportItems;
