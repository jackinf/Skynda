/**
 * Created by jevgenir on 1/14/2017.
 */

import React from "react";
import {Card, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import ReactIconDelete from 'react-icons/lib/md/delete';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import {Field} from "redux-form";
import TextField from 'material-ui/TextField';
import {Row, Col} from "react-bootstrap";
import "./ReduxForm.CropTool.component.scss";
import {URL, BASE64FILE} from "./ReduxForm.CropTool.constants";

const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32" className="crop-tool__delete-icon"/>);

export const renderTextField = ({input, label, errors, meta: {touched, error}, ...custom}) => (
  <Row className="redux-form__crop-tool__text-field">
    <Col sm={12}>
      <TextField hintText={label} floatingLabelText={label} errorText={errors && errors[input.name] || touched && error} {...input} {...custom} />
    </Col>
  </Row>
);

export default class ReduxFormCropToolComponent extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    reduxFormName: React.PropTypes.string.isRequired,
    onImageUpload: React.PropTypes.func.isRequired,
    onImageRemove: React.PropTypes.func.isRequired,
    onCropComplete: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  };

  render() {
    const {title, name, reduxFormName, onImageUpload, onImageRemove, onCropComplete, className} = this.props;

    return (<Card className={className}>
      <CardHeader title={<h2>{title}</h2>} />
      <CardMedia>{}
        <Field name={`${name}.${URL}`} component={({input, i}) => (<div>
          {input.value ? (<img src={input.value} width={400}/>) : ""}
        </div>)}/>
      </CardMedia>
      <CardText>
        <span>a) Specify image url:</span>
        <Field name={`${name}.${URL}`} type="text" component={renderTextField} label="URL" />

        <br/>

        <span>b) ...or upload using image uploader:</span>
        <Field name={`${name}.${BASE64FILE}`} component={({input, i}) => (<div>
          {input.value
            ? (<div>
              <ReactCrop src={input.value} crop={{width: 90, aspect: 16/9}}
                         onComplete={(crop, pixelCrop) => onCropComplete(crop, pixelCrop, name, reduxFormName)} />
              <ReactIconDeleteWrapped onClick={e => onImageRemove(e, name, reduxFormName)}/>
            </div>)
            : <input className="btn btn-default" type="file" onChange={e => onImageUpload(e, name, reduxFormName)}/>}
        </div>)}/>
      </CardText>
      {this.props.children}
    </Card>);
  }
}
