import React from "react";
import {Field} from 'redux-form';
import {Card, CardMedia, CardHeader, CardText} from 'material-ui/Card';
import ReactCrop from 'react-image-crop';
import ReactIconDelete from 'react-icons/lib/md/delete';
const crop = {width: 90, aspect: 16/9};
import "react-image-crop/dist/ReactCrop.css";

const styleDeleteIcon = {
  position: "absolute",
  // border: "1px solid black",
  borderRadius: "30px",
  right: "40px",
  background: "white"
};
const ReactIconDeleteWrapped = (props) => (<ReactIconDelete {...props} width="32" height="32" style={styleDeleteIcon}/>);

export const MainImageCardField = (props) => (<Card className="vehicle-component--card-background">
  <CardHeader title={<h2>{props.title}</h2>} />
  <CardMedia>
    <Field name="mainImage.url" component={({input, i}) => (<div>
      {input.value ? (<img src={input.value} width={400}/>) : ""}
    </div>)}/>
  </CardMedia>
  <CardText>
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
  </CardText>
  {props.children}
</Card>);

export default MainImageCardField;
