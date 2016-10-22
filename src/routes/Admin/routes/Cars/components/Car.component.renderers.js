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

export const renderDescriptions = ({ fields }) => (
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

export const renderFeatures = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Features</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={name} type="text" component="textarea" placeholder={`Feature #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

export const renderHistoryProblems = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Problems</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={name} type="text" component="textarea" placeholder={`Problem #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

export const renderImages = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Image</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={name} type="file" component={renderFile} placeholder={`Image #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);


export const renderOverviews = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Overview</button>
    </li>
    {fields.map((description, index) =>
      <li key={index}>
        <Field name={`${description}.iconUrl`} type="text" component="input" placeholder={`Icon URL #${index + 1}`}/>
        <Field name={`${description}.label`} type="text" component="input" placeholder={`label #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

export const renderReportCategories = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Report Category</button>
    </li>
    {fields.map((categoriesName, index) =>
      <li key={index}>
        <Field name={`${categoriesName}.title`} type="text" component="input" placeholder={`Title #${index + 1}`}/>

        <FieldArray name={`${categoriesName}.points`} component={({ fields }) => (
          <ul>
            <li>
              <button type="button" onClick={() => fields.push()}>Add Points</button>
            </li>
            {fields.map((pointsName, index) =>
              <li key={index}>
                <Field name={`${pointsName}.pass`} type="checkbox" component="checkbox" />
                <Field name={`${pointsName}.text`} type="text" component="input" placeholder={`text #${index + 1}`}/>
                <button type="button" onClick={() => fields.remove(index)}>X</button>
              </li>
            )}
            {fields.error && <li className="error">{fields.error}</li>}
          </ul>
        )}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);


export const renderReportFaults = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Fault</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.img`} type="text" component="input" placeholder={`Image URL #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="input" placeholder={`Text #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);


export const renderReviews = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Review</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.logoUrl`} type="text" component="input" placeholder={`Logo URL #${index + 1}`}/>
        <Field name={`${name}.rating`} type="text" component="number" placeholder={`Rating #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="input" placeholder={`Text #${index + 1}`}/>
        <Field name={`${name}.videoUrl`} type="text" component="input" placeholder={`Video URL #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);
