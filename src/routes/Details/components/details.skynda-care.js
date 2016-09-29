import React from 'react';

import Skblock from './details.skblock';
import '../details.scss';

import image_group_124 from './../../../static/images/standard/group-124.png';
import image_group_125 from './../../../static/images/standard/group-125.png';
import image_group_126 from './../../../static/images/standard/group-126.png';
import image_group_127 from './../../../static/images/standard/group-127.png';
import image_group_128 from './../../../static/images/standard/group-128.png';
import image_group_129 from './../../../static/images/standard/group-129.png';

class Overview extends React.Component {
  render() {
    return (<Skblock header={'Skynda Care'}>
      <div className="row">
        <div className="col col-md-4"> {/*style="text-align: center; margin-bottom: 20px"*/}
          <img className="sk_details__icon" src={image_group_124}/>
          <h5>Vehicle Protection</h5>
          <section>Award-winning repair coverage</section>
        </div>
        <div className="col col-md-4">
          <img className="sk_details__icon" src={image_group_125}/>
          <h5>Vehicle Protection</h5>
          <section>Award-winning repair coverage</section>
        </div>
        <div className="col col-md-4">
          <img className="sk_details__icon" src={image_group_126}/>
          <h5>Vehicle Protection</h5>
          <section>Award-winning repair coverage</section>
        </div>
      </div>
    </Skblock>);
  }
}

export default Overview;
