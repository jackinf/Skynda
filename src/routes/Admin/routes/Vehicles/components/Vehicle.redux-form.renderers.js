/**
 * Created by jevgenir on 10/22/2016.
 */
import React from "react";
import {Field, FieldArray} from 'redux-form';
import TextField from 'material-ui/TextField';
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Dropzone from "react-dropzone";
import Select from "react-select";
import ReactIconDelete from 'react-icons/lib/md/delete';

import {fieldListWrapper, renderImage} from "../../../components/FormRenderers/index";

const styleDeleteIcon = {
  position: "absolute",
  border: "1px solid black",
  borderRadius: "30px",
  right: "40px",
  background: "white"
};
const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32"
                                                            style={styleDeleteIcon}/>);
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
const crop = {width: 90, aspect: 16/9};

/*
 ====================================
 MATERIAL UI
 ====================================
 */

export const renderTextField = ({input, label, errors, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <TextField hintText={label} floatingLabelText={label} errorText={errors && errors[input.name] || touched && error} {...input} {...custom} />
    </Col>
  </Row>
);
//
// export const renderImage = ({input}) => (input.value ? <img src={input.value} width={100}/> : <div>-NONE-</div>);
//


/*
 ====================================
 FIELD ARRAYS
 ====================================
 */
export const renderDescriptions = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<div>
    {fields.map((name, index) =>
      <Row key={index}>
        <Col sm={2}>
          <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
            <ContentRemove />
          </FloatingActionButton>
        </Col>
        <Col md={10}>
          <Field name={`${name}.title`} type="text" component={renderTextField} placeholder={`Title #${index + 1}`}/>
          <Field name={`${name}.content`} type="text" component={renderTextField} multiLine={true} rows={4}
                 placeholder={`Description #${index + 1}`}/>
        </Col>
      </Row>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const renderReportItems = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<div>
    {fields.map((name, index) =>
      <Row key={index}>
        <Col sm={2}>
          <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
            <ContentRemove />
          </FloatingActionButton>
        </Col>
        <Col md={10}>
          <Field name={`${name}.title`} type="text" component={renderTextField} placeholder={`Title #${index + 1}`}/>
          <Field name={`${name}.description`} type="text" component={renderTextField} multiLine={true} rows={4}
                 placeholder={`Description #${index + 1}`}/>
        </Col>
      </Row>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const renderFeatures = ({fields, ...custom}) => fieldListWrapper({
  fields,
  title: custom.name,
  block: (<div>
    {fields.map((name, index) =>
      <Row key={index}>
        <Col sm={2}>
          <FloatingActionButton mini={true} secondary={true} onClick={() => fields.remove(index)}>
            <ContentRemove />
          </FloatingActionButton>
        </Col>
        <Col sm={10}>
          <Field name={`${name}.text`} type="text" component={renderTextField} placeholder={`Feature #${index + 1}`}/>
        </Col>
      </Row>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

export const renderFaults = ({fields, ...custom}) => fieldListWrapper({
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
              <Field className="btn btn-default" name={`${field}.file`} type="file" component="input"
                     onChange={e => custom.onFaultFileAdd(e, index)}/>
              <Field name={`${field}.text`} type="text" component={renderTextField} placeholder={`Text #${index + 1}`}/>
              Persisted: <Field name={`${field}.image.url`} type="text" component={renderImage}/>
              <br/>
              New: <Field name={`${field}.image.base64File`} type="text" component={renderImage}/>
            </Col>
          </Row>
        );
      }
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </div>)
});

const imageBlockStyle = {border: "1px solid #dedede", backgroundColor: "#efefef", padding: "10px"};

export const MainImageField = (props) => (<div style={imageBlockStyle}>
  <h3>{props.title} *</h3>

  <Field name="mainImage.url" component={({input, i}) => (<div>
    {input.value ? (<div>
        <span>Currently stored in database:</span>
        <img src={input.value} width={400}/>
      </div>) : ""}
  </div>)}/>

  <br/>
  <span>a) Specify image url:</span>
  <Field name="mainImage.url" type="text" component={renderTextField} label="URL" />

  <br/>

  <span>b) ...or upload using image uploader:</span>
  <Field name="mainImage.base64File" component={({input, i}) => (<div>
    {input.value
      ? (<div>
        <ReactCrop src={input.value} crop={crop} onComplete={props.onMainImageCropComplete} />
      {/*<img src={input.value} width={400}/>*/}
      <ReactIconDeleteWrapped onClick={e => props.onMainImageRemove(e)}/>
    </div>)
      : <input className="btn btn-default" type="file" onChange={e => props.onMainImageUpload(e)}/>}
  </div>)}/>
</div>);

export const ImagesField = (props) => (<Row style={imageBlockStyle}>
  <Col xs={12} md={6}>
    <h4>Images</h4>
    <div style={{marginBottom: "10px"}}>
      <Dropzone onDrop={props.onImageFileUpload} multiple={true}>
        <div style={{padding: "10px"}}>
          Try dropping some files here, or click to select files to upload.
        </div>
      </Dropzone>
    </div>

    <FieldArray name="images" component={({fields}) => (<div>
      {fields.map((field, index) => {
        const componentFn = ({input}) =>
          (input.value
            ? (<div>
            <img src={input.value} width={200}/>
            <ReactIconDeleteWrapped onClick={e => props.onImageFileRemove(e, index)}/>
          </div>)
            : (<div></div>));
        return (<div key={index}>
          <Field name={`${field}.image.url`} type="text" component={componentFn}/>
          <Field name={`${field}.image.base64File`} type="text" component={componentFn}/>
          <hr />
        </div>);
      })}</div>)}/>
  </Col>
</Row>);

export const selectRenderer = (items, onChange, isMulti = false) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      <Select name={input.name} value={input.value} options={items} onChange={value => onChange(input.name, value)}
              multi={isMulti}
      />
    </Col>
  </Row>
);

export const ErrorBlockRenderer = ({errors}) => {
  return errors.length > 0 ? (
    <Row>
      <Col xs={12}>
        <div className="panel panel-danger">
          <div className="panel-heading">Panel heading</div>
          <ul className="list-group">
            {errors.map((error, i) => (
              <li key={i} className="list-group-item"><b>{error.code}</b>: {error.defaultMessage}</li>
            ))}
          </ul>
        </div>
      </Col>
    </Row>) : <div></div>;
};
