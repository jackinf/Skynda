import React from 'react';
import './Home.keypoints.scss';

import image_ok from './../../../static/images/standard/ok@2x.png';
import image_clock from './../../../static/images/standard/clock@2x.png';
import image_happy from './../../../static/images/standard/happy@2x.png';

class Keypoint extends React.Component {
  render() {
    return (<div className="text-center">
      <img className="sk_keypoint__image" src={this.props.src} alt=""/>
      <h2 className="keypoint-header">{this.props.title}</h2>
      <p>{this.props.content}</p>
    </div>);
  }
}

class Keypoints extends React.Component {
  render() {
    return (<div>
    </div>);

  }
}

export default Keypoints;
