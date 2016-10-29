/**
 * Created by zekar on 9/14/2016.
 */

import React from "react";
import "./Details.scss";

// Local components
import Skblock from "./BlockContainer";

import Overview from "./Overview";
import Fetaures from "./Features";
import History from "./History";
import PetrolConsumption from "./PetrolConsumption";
import Safety from "./Safety";
import InspectorsReport from "./InspectorsReport/Details.inspectors-report";
import Reviews from "./Reviews";
import CarDetailsMainImage from "./MainImage";
import Checkout from "./CheckoutPanel/Details.checkout";
import CarPreview from "./../../../components/CarPreview";

// List of rows
import imageTestcar from "../../../static/images/cars/accord/accord.jpg";
import { Translate } from 'react-redux-i18n';

const cars = {
  other: [
    {
      src: imageTestcar,
      href: "/details",
      year: 2012,
      brand: "Audi",
      price: 12100,
      mileage: 85000,
      engine: "3.0",
      power: "225 kW",
      doors: 4,
      seats: 5,
      comment: "Comes with winter tires"
    },
    {
      src: imageTestcar,
      href: "/details",
      year: 2012,
      brand: "Audi",
      price: 12100,
      mileage: 85000,
      engine: "3.0",
      power: "225 kW",
      doors: 4,
      seats: 5,
      comment: "Comes with winter tires"
    }
  ]
};

import {StickyContainer, Sticky} from "react-sticky";

class CarDetails extends React.Component {

  async componentWillMount() {
    await this.props.getDataAsync();
  }

  render() {
    const carData = this.props.car_data;
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className='car-details'>
        <div className='container'>
          <CarDetailsMainImage car={carData}/>
        </div>

        <div className='container'>
          <StickyContainer>
            <div className='row'>
              <div className='col col-md-7'>

                <Overview overview={carData.overview}/>

                {carData.descriptions.map((description, i) =>
                  <Skblock key={i} header={description.title}>{description.text}</Skblock>)}

                <Fetaures features={carData.features}/>
                <History history={carData.history}/>
                <PetrolConsumption petrolConsumption={carData.petrolConsumption}/>
                <Safety stars={carData.safetyStars}/>
                <InspectorsReport report={carData.report}
                                  sendQuestionByEmailAsync={this.props.sendQuestionByEmailAsync}/>
                <Reviews reviews={carData.reviews}/>

              </div>
              <div className='col col-md-5'>
                <Sticky>
                  <Checkout sendEmailAsync={this.props.sendEmailAsync}/>
                </Sticky>
              </div>
            </div>
          </StickyContainer>

          <div className='row'>
            <Skblock header={<Translate value="details.other_txt"/>}>
              <CarPreview.Grid cars={cars.other}/>
            </Skblock>
          </div>
        </div>
      </div>
    );
  }
}

CarDetails.propTypes = {
  getDataAsync: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  sendEmailAsync: React.PropTypes.func.isRequired,
  sendQuestionByEmailAsync: React.PropTypes.func.isRequired,
  car_data: React.PropTypes.object.isRequired
};

export default CarDetails;
