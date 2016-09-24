/**
 * Created by zekar on 9/14/2016.
 */

import React from 'react';
import './details.scss';

// Images
import image_ok from './../../static/images/standard/ok.png';
import image_diploma_1 from './../../static/images/standard/diploma_1.png';
import image_star_2x from './../../static/images/standard/star@2x.png';
import image_4_2x from './../../static/images/standard/image-4@2x.png';

// Local components
import Skblock from './components/details.skblock';
import Overview from './components/details.overview';
import PetrolConsumption from './components/details.petrol-consumption';
import Performance from './components/details.performance';
import InspectorsReport from './components/details.inspectors-report';
import SkyndaCare from './components/details.skynda-care';
import Reviews from './components/details.reviews';
import Checkout from './components/details.checkout';
import CarDetailsMainImage from './components/details.mainimage';

import CarPreview from './../../components/CarPreview';

// List of rows
import image_testcar from '../../static/images/cars/accord/accord.jpg';

const cars = {
  other: [
    {src: image_testcar, href: '/details', year: 2012, brand: 'Audi', price: 12100, mileage: 85000, engine: '3.0',
      power: '225 kW', doors: 4, seats: 5, comment: 'Comes with winter tires'},
    {src: image_testcar, href: '/details', year: 2012, brand: 'Audi', price: 12100, mileage: 85000, engine: '3.0',
      power: '225 kW', doors: 4, seats: 5, comment: 'Comes with winter tires'}
  ]
};


import {StickyContainer, Sticky} from 'react-sticky';

class CarDetails extends React.Component {
  render() {
    return (
      <div className="car-details">
        <div className="container">
          <CarDetailsMainImage/>
        </div>

        <br />

        <div className="container">
          <StickyContainer>
            <div className="row">
              <div className="col col-md-7">
                <Overview />

                <Skblock header={'What\'s this model about?'}>...</Skblock>

                <Skblock header={'We have it in excellent condition'}>...</Skblock>

                <Skblock header={'Nice features'}>
                  <div className="col col-md-4"> {/*style="padding: 5px 0;"*/}
                    <img src={image_ok} width="24" className="sk_details__icon_list_image"/>
                    Steering Wheel Controls
                  </div>
                  <div className="col col-md-4"> {/*style="padding: 5px 0;"*/}
                    <img src={image_ok} width="24" className="sk_details__icon_list_image"/>
                    Paddle Shifters
                  </div>
                  <div className="col col-md-4"> {/*style="padding: 5px 0;"*/}
                    <img src={image_ok} width="24" className="sk_details__icon_list_image"/>
                    Premium Lights
                  </div>
                  <div className="col col-md-4"> {/*style="padding: 5px 0;"*/}
                    <img src={image_ok} width="24" className="sk_details__icon_list_image"/>
                    Turbocharger
                  </div>
                  <div className="col col-md-4"> {/*style="padding: 5px 0;"*/}
                    <img src={image_ok} width="24" className="sk_details__icon_list_image"/>
                    Parking Sensors
                  </div>
                </Skblock>
                <br />

                <Skblock header={'Car History'}>
                  <div className="col col-md-4">  {/*style="padding: 5px 0;"*/}
                    <img src={image_diploma_1} width="24" className="sk_details__icon_list_image"/>
                    No Problems Found
                  </div>
                  <div className="col col-md-4">  {/*style="padding: 5px 0;"*/}
                    <label>VIN code: </label> WVW7454WBVNVHD
                  </div>
                </Skblock>

                <PetrolConsumption/>

                <Performance />

                <Skblock header={'Safety'}>
                  <div className="sk_details__stars_outer_container">
                    <div className="sk_details__stars_inner_container">
                      <img className="sk_details__star" src={image_star_2x}/>
                      <img className="sk_details__star" src={image_star_2x}/>
                      <img className="sk_details__star" src={image_star_2x}/>
                      <img className="sk_details__star" src={image_star_2x}/>
                      <img className="sk_details__star" src={image_star_2x}/>

                      <img className="sk_details__stars_euroncap" src={image_4_2x}/>
                    </div>
                  </div>
                </Skblock>
                <br />

                <InspectorsReport />

                <SkyndaCare />

                <Reviews />
              </div>
              <div className="col col-md-5">
                <Sticky>
                  <Checkout />
                </Sticky>
              </div>
            </div>
          </StickyContainer>

          <div className="row">
            <Skblock header={'Other cars that you might like'}>
              <CarPreview.Grid cars={cars.other}/>
            </Skblock>
          </div>
        </div>
      </div>
    )
  }
}

export default CarDetails;
