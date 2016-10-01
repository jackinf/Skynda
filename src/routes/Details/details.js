/**
 * Created by zekar on 9/14/2016.
 */

import React from 'react';
import './Details.scss';

// Local components
import Skblock from './components/details.skblock';
import Overview from './components/Overview';
import Fetaures from './components/Features';
import History from './components/History';
import PetrolConsumption from './components/PetrolConsumption';
import Performance from './components/Performance';
import Safety from './components/Safety';
import InspectorsReport from './components/InspectorsReport/Details.inspectors-report';
import Reviews from './components/Reviews';
import CarDetailsMainImage from './components/MainImage';
import Checkout from './components/CheckoutPanel/details.checkout';
import CarPreview from './../../components/CarPreview';

// List of rows
import image_testcar from '../../static/images/cars/accord/accord.jpg';

const cars = {
  other: [
    {
      src: image_testcar, href: '/details', year: 2012, brand: 'Audi', price: 12100, mileage: 85000, engine: '3.0',
      power: '225 kW', doors: 4, seats: 5, comment: 'Comes with winter tires'
    },
    {
      src: image_testcar, href: '/details', year: 2012, brand: 'Audi', price: 12100, mileage: 85000, engine: '3.0',
      power: '225 kW', doors: 4, seats: 5, comment: 'Comes with winter tires'
    }
  ]
};

import {StickyContainer, Sticky} from 'react-sticky';

class CarDetails extends React.Component {

  async componentWillMount() {
    console.log(this.props);
    await this.props.getDataAsync();
    console.log(this.props);
  }

  render() {
    const car_data = this.props.car_data;
    if (this.props.isLoading)
      return <div>Loading...</div>;

    return (
      <div className="car-details">
        <div className="container">
          <CarDetailsMainImage car={car_data}/>
        </div>

        <div className="container">
          <StickyContainer>
            <div className="row">
              <div className="col col-md-7">

                <Overview overview={car_data.overview}/>

                {car_data.descriptions.map((description, i) =>
                  <Skblock key={i} header={description.title}>{description.text}</Skblock>)}

                <Fetaures features={car_data.features}/>
                <History history={car_data.history}/>
                <PetrolConsumption petrol_consumption={car_data.petrol_consumption}/>
                <Performance performance={car_data.performance}/>
                <Safety stars={car_data.safety_stars}/>
                <InspectorsReport report={car_data.report}/>
                <Reviews reviews={car_data.reviews} />

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
