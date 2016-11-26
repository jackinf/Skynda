/**
 * Created by jevgenir on 11/20/2016.
 */
import React from "react";
import {Row, Col} from "react-bootstrap";
import {Field} from 'redux-form';
import {TextField, Checkbox} from "redux-form-material-ui";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import MenuItem from 'material-ui/MenuItem';

import {fieldListWrapper, renderSelectField} from "../../../components/FormRenderers";

/**
 * Displays a list of report category items, which can be dynamically added or removed
 * @param fields
 * @param custom
 */
export const renderReportCategoryItems = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<div>
    {fields.map((field, index) => {
        return (<Row key={index}>
            <Col sm={2}>
              <FloatingActionButton mini={true} secondary={true} onClick={(e) => {
                fields.remove(index);
                custom.onFaultRemove(e, index);
              }}>
                <ContentRemove />
              </FloatingActionButton>
            </Col>
            <Col sm={10}>
              <Field name={`${field}.text`} component={TextField} label="Title"/>
              <Field name={`${field}.isPass`} component={Checkbox} label="Is pass?"/>
            </Col>
          </Row>
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
export const VehiclesSelectField = (props) => (<div>{props.vehicles.isFetching ? "Fetching vehicle models" : (
  <Field name={props.name} label={props.label} component={renderSelectField}>
    {props.vehicles.items.map((item, i) => (
      <MenuItem key={i} value={item.id} primaryText={`${item.id} -
${item.model ? item.model.vehicleManufacturer.name : ""} ${item.model ? item.model.modelCode : ""}`}/>
    ))}
  </Field>
)}</div>);



