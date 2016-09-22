import React from "react";

import Skblock from './details.skblock';

class Performance extends React.Component {
  render() {
    return (<Skblock header={'Performance'}>

      {/*<!-- Left side -->*/}
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Driver wheels: </label></div>
          <div className="col col-md-6">Rear</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Doors: </label></div>
          <div className="col col-md-6">
            {/*{{car.doors}}</div>*/}
          </div>
        </div>
      </div>

      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Compression ratio</label></div>
          <div className="col col-md-6">10</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Compressor type</label></div>
          <div className="col col-md-6">Turbocharger</div>
        </div>
      </div>

      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Configuration</label></div>
          <div className="col col-md-6">Inline</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Cylinders</label></div>
          <div className="col col-md-6">4</div>
        </div>
      </div>

      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Displacement</label></div>
          <div className="col col-md-6">1997</div>
        </div>
      </div>

      {/*<!-- Right side -->*/}
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Fuel type: </label></div>
          <div className="col col-md-6">Premium unlead</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Horsepower</label></div>
          <div className="col col-md-6">
            {/*{{car.horsepower}}*/}
          </div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Size</label></div>
          <div className="col col-md-6">2</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Torque</label></div>
          <div className="col col-md-6">255</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Total values</label></div>
          <div className="col col-md-6">16</div>
        </div>
      </div>
      <div className="col col-md-6">  {/*style="padding: 5px 0;"*/}
        <div className="row">
          <div className="col col-md-6"><label>Power train</label></div>
          <div className="col col-md-6">Gas</div>
        </div>
      </div>
    </Skblock>)
  }
}

export default Performance;
