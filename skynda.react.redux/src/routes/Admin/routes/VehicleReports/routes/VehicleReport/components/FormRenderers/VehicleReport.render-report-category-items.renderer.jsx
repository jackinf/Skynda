/**
 * Created by jevgenir on 3/11/2017.
 */
import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from 'redux-form';
import {Checkbox} from "redux-form-material-ui";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import {Card, CardText} from 'material-ui/Card';

import {fieldListWrapper, renderTextField} from "../../../../../../components/FormRenderers";

/**
 * Displays a list of report category items, which can be dynamically added or removed
 * @param fields
 * @param custom
 */
export const renderReportCategoryItems = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<div className="item-list">

    {fields.map((field, index) => {
        return (<Card className="report-item" key={index}>
            <CardText>
              <Row>
                <Card>
                  <Col sm={2}>
                    <FloatingActionButton mini={true} secondary={true} onClick={(e) => {
                      fields.remove(index);
                    }}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </Col>
                  <Col sm={10}>
                    <Col>
                      <Field name={`${field}.title`} label="Title" component={renderTextField}/>
                    </Col>
                    <Col>
                      <Field name={`${field}.text`} label="Description" component={renderTextField} multiLine={true}
                             rows={2}/>
                    </Col>
                    <Col>
                      <Field name={`${field}.isPass`} component={Checkbox} label="Is pass?"/>
                    </Col>
                  </Col>
                </Card>
              </Row>
            </CardText>
          </Card>
        );
      }
    )}

    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export default renderReportCategoryItems;
