import React from "react";
import {Field, FieldArray} from 'redux-form';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col} from "react-bootstrap";
import Dropzone from "react-dropzone";
import ReactIconDelete from 'react-icons/lib/md/delete';
import "react-image-crop/dist/ReactCrop.css";
import _ from "underscore";

const styleDeleteIcon = {
  position: "absolute",
  // border: "1px solid black",
  borderRadius: "30px",
  right: "40px",
  background: "white"
};
const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32" style={styleDeleteIcon}/>);

export default class ImagesCardField extends React.Component{

  constructor(){
    super();
    this.state = {uploadError: null};
  }

  onImageUpload = (input) =>{
    const errors = this.props.onImageFileUpload(input);

    if(!_.isEmpty(errors)){
      this.setState({uploadError: errors.file});
    }
  };

  render(){
    return (
      <Card className="vehicle-component--card-background" style={this.props.isLoading ? {backgroundColor: 'rgba(0, 0, 0, 0.1)'} : {}}>
        <CardHeader title={<h2>Images</h2>} />
        <CardText>

          {this.state.uploadError ?
            (
            <Row>
              <Col xs={12}>
                <div className="panel panel-danger">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong style={{color: 'darkred'}}>{this.state.uploadError}</strong>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
            ) : ""
          }

          <Row>
            <Col xs={12}>
              <div style={{marginBottom: "10px"}}>
                <Dropzone onDrop={e => this.onImageUpload(e)} multiple={true}>
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
                        <ReactIconDeleteWrapped onClick={e => this.props.onImageFileRemove(e, index)}/>
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
        {this.props.children}
      </Card>
    );
  }

}
