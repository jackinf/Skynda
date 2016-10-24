/**
 * Created by jevgenir on 10/22/2016.
 */
import React from "react";
import {Field, FieldArray} from 'redux-form';

const renderFile = props => (
  <div>
    <label>{props.placeholder}</label>
    <div>
      <input type="file" name={props.name}/>
      {props.touched && props.error && <span>{props.error}</span>}
    </div>
  </div>
);

export const renderDescriptions = ({fields}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Description</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.title`} type="text" component="input" placeholder={`Description #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="textarea" placeholder={`Description #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

export const renderFeatures = ({fields}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Features</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.id`} type="number" component="input" placeholder={`Id #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="input" placeholder={`Feature #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

export const renderHistoryProblems = ({fields}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Features</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.id`} type="number" component="input" placeholder={`Id #${index + 1}`}/>
        <Field name={`${name}.img`} type="text" component="input" placeholder={`Image #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="input" placeholder={`Text #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

export const renderImages = ({fields}) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Features</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.id`} type="number" component="input" placeholder={`Id #${index + 1}`}/>
        <Field name={`${name}.original`} type="text" component="input" placeholder={`Original #${index + 1}`}/>
        <Field name={`${name}.thumbnail`} type="text" component="input" placeholder={`Thumbnail #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);
