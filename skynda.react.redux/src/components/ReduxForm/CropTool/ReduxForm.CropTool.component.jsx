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
  constructor() {
    super();
    this.state = {showCrop: false, crop: null};
  }

  static propTypes = {
    title: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    reduxFormName: React.PropTypes.string.isRequired,
    onImageUpload: React.PropTypes.func.isRequired,
    onImageRemove: React.PropTypes.func.isRequired,
    onCropChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string
  };

  onImageUpload = (e, name, reduxFormName) => {
    this.setState({showCrop: true});
    this.props.onImageUpload(e, name, reduxFormName);
  };

  onCropChange = (crop, pixelCrop, name, reduxFormName) => {
    this.props.onCropChange(crop, pixelCrop, name, reduxFormName);
  };

  onCropDone = (name, reduxFormName) => {
    this.props.onCropDone(name, reduxFormName, this.state.originalFile);
    this.setState({showCrop: false});
  };

  render() {
    const {title, name, reduxFormName, onImageRemove, className} = this.props;

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
            ? (this.state.showCrop ? (<span>
              <ReactCrop src={input.value}
                         crop={{width: 90, aspect: 16/9}}
                         onComplete={(crop, pixelCrop) => this.onCropChange(crop, pixelCrop, name, reduxFormName)} />
              <button className="btn btn-success" onClick={e => this.onCropDone(name, reduxFormName)}>Accept</button>
              <ReactIconDeleteWrapped onClick={e => onImageRemove(e, name, reduxFormName)}/>
            </span>) : (<img src={input.value} />))
            : <input className="btn btn-default" type="file" onChange={e => this.onImageUpload(e, name, reduxFormName)}/>}
        </div>)}/>
      </CardText>
      {this.props.children}
    </Card>);
  }
}
