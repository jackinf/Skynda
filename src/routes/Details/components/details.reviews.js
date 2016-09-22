import React from 'react';

import Skblock from './details.skblock';
import '../details.scss';

import image_star from './../../../static/images/standard/star.png';
import image_unstar from './../../../static/images/standard/star-1.png';

// import RaisedButton from 'material-ui/RaisedButton';
import {Button as RaisedButton} from 'react-bootstrap';

class Overview extends React.Component {
  render() {
    return (<Skblock header={'Reviews'}>
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col col-md-6">
              <label >WHATCAR?</label> {/* style="font-size: 28px; font-weight: bolder; color: orangered" */}
            </div>
            <div className="col col-md-6">
              <div> {/*style="float: right"*/}
                <img className="sk_details__star" src={image_star}/>
                <img className="sk_details__star" src={image_star}/>
                <img className="sk_details__star" src={image_star}/>
                <img className="sk_details__star" src={image_star}/>
                <img className="sk_details__star" src={image_unstar}/>
              </div>
            </div>
          </div>
          <br/>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry's standard dummy text ever since the 1500s <br />
          <br/>
          <RaisedButton label="Read More" />
        </div>
      </div>
    </Skblock>);
  }
}

export default Overview;
