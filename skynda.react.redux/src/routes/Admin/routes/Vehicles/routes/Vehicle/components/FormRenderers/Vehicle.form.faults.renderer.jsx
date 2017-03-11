import React from "react";
import {Field} from 'redux-form';
import {Card} from 'material-ui/Card';
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {renderTextField, fieldListWrapper, renderImage} from "../../../../../../components/FormRenderers/index";

export const renderFaults = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.label,
  block: (<div>
    {fields.map((field, index) => {
        return (<Card key={index} className="vehicle-component--list-card">
            <Row>
              <Col smOffset={1} sm={9}>
                <Field name={`${field}.file`} component={({input, i}) => (
                  <input  className="btn btn-default" type="file"
                          onChange={e => {
                            custom.onFaultFileAdd(e, index);
                          }}
                  />)}
                />
                <Field name={`${field}.text`} type="text" component={renderTextField} placeholder={`Text #${index + 1}`}/>
                <Field name={`${field}.image.url`} type="text" component={obj => renderImage(obj, "PIC IN DATABASE")}/>
                <br/>
                <Field name={`${field}.image.base64File`} type="text" component={obj => renderImage(obj, "UPLOADED PIC")}/>
              </Col>
              <Col sm={2}>
                <FloatingActionButton mini={true} secondary={true} onClick={(e) => {
                  fields.remove(index);
                }}>
                  <ContentRemove />
                </FloatingActionButton>
              </Col>
            </Row>
          </Card>
        );
      }
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export default renderFaults;
