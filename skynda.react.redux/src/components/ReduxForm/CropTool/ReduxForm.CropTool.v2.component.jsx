/**
 * Created by jevgenir on 1/14/2017.
 */

import React from "react";
import ReactIconDelete from 'react-icons/lib/md/delete';
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import {Field} from "redux-form";
import "./ReduxForm.CropTool.component.scss";
import {BASE64FILE} from "./ReduxForm.CropTool.constants";

const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32" className="crop-tool__delete-icon"/>);

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
    const {name, reduxFormName, onImageRemove} = this.props;

    return (<Field name={`${name}.${BASE64FILE}`} component={({input, i}) => (<div>
      {input.value
        ? (this.state.showCrop ? (<span>
              <ReactCrop src={input.value}
                         crop={{width: 90, aspect: 16/9}}
                         onImageLoaded={(crop, image, pixelCrop) => this.onCropChange(crop, pixelCrop, name, reduxFormName)}
                         onComplete={(crop, pixelCrop) => this.onCropChange(crop, pixelCrop, name, reduxFormName)} />
              <button className="btn btn-success" onClick={e => this.onCropDone(name, reduxFormName)}>Accept</button>
              <ReactIconDeleteWrapped onClick={e => onImageRemove(e, name, reduxFormName)}/>
            </span>) : (<img src={input.value} />))
        : <input className="btn btn-default" type="file" onChange={e => this.onImageUpload(e, name, reduxFormName)}/>}
    </div>)}/>);
  }
}
