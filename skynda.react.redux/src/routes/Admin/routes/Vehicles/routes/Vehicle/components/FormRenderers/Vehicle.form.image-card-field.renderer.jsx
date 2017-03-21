import React from "react";
import {Field, FieldArray} from 'redux-form';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col} from "react-bootstrap";
import Dropzone from "react-dropzone";
import ReactIconDelete from 'react-icons/lib/md/delete';
import "react-image-crop/dist/ReactCrop.css";

const styleDeleteIcon = {
  position: "absolute",
  // border: "1px solid black",
  borderRadius: "30px",
  right: "40px",
  background: "white"
};
const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32" style={styleDeleteIcon}/>);

export const ImagesCardField = (props) => (
  <Card className="vehicle-component--card-background" style={props.isLoading ? {backgroundColor: 'rgba(0, 0, 0, 0.1)'} : {}}>
  <CardHeader title={<h2>Images</h2>} />
  <CardText>
    <Row>
      <Col xs={12}>
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
                  <img src={input.value} width="100%"/>
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
    </Row>
  </CardText>
  {props.children}
</Card>);

export default ImagesCardField;
