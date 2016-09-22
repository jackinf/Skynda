/**
 * Created by zekar on 9/15/2016.
 */

import React from 'react';
import '../details.scss';

import image_gas_station_2x from './../../../static/images/standard/gas_station@2x.png';

import Skblock from './details.skblock';

class PetrolConsumption extends React.Component {
  render() {
    return (<Skblock header={'Petrol Consumption'}>
      <div className="col col-md-4">  {/*style="padding: 5px 0;"*/}
        <img src={image_gas_station_2x} className="sk_details__icon_list_image"/>
      </div>
      <div className="col col-md-4">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>City: </label></div>
          <div className="col col-md-6">7.5 l / 100 km</div>
        </div>
        <div className="row">
          <div className="col col-md-6"><label>Highway: </label></div>
          <div className="col col-md-6">6.5 l / 100 km</div>
        </div>
        <div className="row">
          <div className="col col-md-6"><label>Average: </label></div>
          <div className="col col-md-6">7.0 l / 100 km</div>
        </div>
      </div>
    </Skblock>);
  }

}

export default PetrolConsumption;
