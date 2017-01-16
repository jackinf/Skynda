import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from 'redux-form';
import {Checkbox} from "redux-form-material-ui";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardText} from 'material-ui/Card';

import {fieldListWrapper, renderSelectField, renderTextField} from "../../../components/FormRenderers";

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

/**
 * Dropdown field for displaying list of vehicles to choose a single vehicle from.
 * @param props
 * @constructor
 */
export const VehiclesSelectField = (props) => (<div>
  {props.vehicles.isFetching
    ? "Fetching vehicle models"
    : (
      <Field name={props.name} label={props.label} component={renderSelectField}>
        {props.vehicles.items.map((item, i) => (
          <MenuItem key={i} value={item.id} primaryText={`${item.id} -
        ${item.model ? item.model.vehicleManufacturer.name : ""} ${item.model ? item.model.modelCode : ""}`}/>
        ))}
      </Field>
    )
  }
</div>);

export const TextFieldForReport = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField}/>
    </Col>
  </Row>
</div>);

export const TextAreaForReport = (props) => (<div>
  <Row>
    <Col sm={12}>
      <Field name={props.name} label={props.label} component={renderTextField} multiLine={true}
             rows={2}/>
    </Col>
  </Row>
</div>);
