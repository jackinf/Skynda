/**
 * Created by jevgenir on 11/20/2016.
 */
import React from "react";
import {Field} from 'redux-form';
import MenuItem from 'material-ui/MenuItem';

import {renderSelectField} from "../../../components/FormRenderers";

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
