/**
 * Created by zekar on 9/14/2016.
 */

import React from 'react';
import './details.scss';
import {Row, Col} from 'react-bootstrap';

// Images
import image_overview_1 from './../../static/images/standard/group-114@2x.png';
import image_overview_2 from './../../static/images/standard/group-115@2x.png';
import image_overview_3 from './../../static/images/standard/group-116@2x.png';
import image_overview_4 from './../../static/images/standard/group-117@2x.png';
import image_overview_5 from './../../static/images/standard/group-118@2x.png';
import image_overview_6 from './../../static/images/standard/group-119@2x.png';
import image_overview_7 from './../../static/images/standard/group-120@2x.png';
import dummy_image1 from './../../static/images/cars/accord/accord.jpg';
import dummy_image2 from './../../static/images/cars/accord/accord2.jpg';
import dummy_image3 from './../../static/images/cars/accord/accord3.jpg';

// Local components
import Skblock from './components/details.skblock';
import Overview from './components/Overview';
import Fetaures from './components/Features';
import History from './components/History';
import PetrolConsumption from './components/details.petrol-consumption';
import Performance from './components/details.performance';
import Safety from './components/Safety';
import InspectorsReport from './components/details.inspectors-report';
import SkyndaCare from './components/details.skynda-care';
import Reviews from './components/details.reviews';
import Checkout from './components/details.checkout';
import CarDetailsMainImage from './components/MainImage/details.mainimage';
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

    const car_data = {//TODO: REPLACE with api data
      general: {
        src: dummy_image1,
        year: 2012,
        brand: 'Honda',
        model: 'Accord',
        engine: '3.0',
        horsepower: '225 kW',
        mileage: '75 000 km',
        transmission: 'automatic',
        drive: 'Front Wheel Drive',
        color_outside: 'Dark Blue',
        color_inside: 'Black',
        doors: '2',
        seats: '5',
      },
      overview: [
        { label: '75 000 km', iconUrl: image_overview_1 },
        { label: 'Automatic', iconUrl: image_overview_2 },
        { label: '3.0 (225 kW)', iconUrl: image_overview_3 },
        { label: 'Front Wheel Drive', iconUrl: image_overview_4 },
        { label: '2 doors 5 seats', iconUrl: image_overview_5 },
        { label: 'Dark Blue', iconUrl: image_overview_6 },
        { label: 'Black', iconUrl: image_overview_7 },
      ],
      images: [
        {
          original: dummy_image1,
          thumbnail: dummy_image1
        },
        {
          original: dummy_image2,
          thumbnail: dummy_image2
        },
        {
          original: dummy_image3,
          thumbnail: dummy_image3
        }
      ],
      descriptions: [{
        title: "What's This Model About?",
        text: `The BMW 3 Series offers the a combination of luxury and performance that is unmatched
by its competitors. With refined driving dynamics and drop-dead gorgeous looks to
match, this elegant sports coupe is truly an amazing driving machine`
      }, {
        title: "We Have It In Excellent Condition",
        text: `Skynda seller Aju is switching things up with a new ride! Skynda Inspector Nicolas thought this
car was in excellent condition. We would love to drop off this great BMW right in your
driveway! Skynda bought this car from private seller Aju, and now Skyda is offering this car for
sale`
      }],
      features: [
        "Steering Wheel Controls",
        "Paddle Shifters",
        "Premium Lights",
        "Turbocharger",
        "Parking Sensors"
      ],
      history: {
        problems: [],
        vin_code: 'WVWHV71K68W164858'
      },
      petrol_consumption: {
        city: '7.5 l / 100 km',
        highway: '6.5 l / 100 km',
        average: '7.0 l / 100 km'
      },
      performance: {
        driven_wheels: 'Rear wheel drive',
        doors: 4,
        compression_ratio: 10,
        compressor_type: 'Turbocharger',
        configuration: 'Inline',
        cylinders: 4,
        displacement: 1997,
        fuel_type: 'Premium unlead',
        horsepower: 240,
        size: 2,
        torque: 255,
        total_valves: 16,
        power_train: 'Gas'
      },
      safety_stars: 5,
      report: [
        {
          categories: [
            {
              title: 'Category 1',
              points: [
                {text: 'Automatic transmission flawless in cold temperature', pass: true},
                {text: 'Steering wheel centered', pass: true},
                {text: 'Steering wheel centered', pass: true},
                {text: 'Automatic transmission flawless in cold temperature', pass: false},
                {text: 'Automatic transmission flawless in cold temperature', pass: true},
                {text: 'Steering wheel centered', pass: true}
              ]
            },
            {
              title: 'Category 2',
                points: [
                  {text: 'Automatic transmission flawless in cold temperature', pass: true},
                  {text: 'Steering wheel centered', pass: true},
                  {text: 'Steering wheel centered', pass: true},
                  {text: 'Automatic transmission flawless in cold temperature', pass: false},
                  {text: 'Automatic transmission flawless in cold temperature', pass: true},
                  {text: 'Steering wheel centered', pass: true}
                ]
            }
          ],
          faults: [
            {text: 'Scratches near the ignition', img: 'TODO'},
            {text: 'Scratches on the glovebox', img: 'TODO'},
            {text: 'Scratches on the back door', img: 'TODO'}
          ]
        }
      ],
      reviews: [
        {
          logoUrl: 'TODO',
          videoUrl: null,
          text: 'The Dacia Sandero demands compromises, but it’s likeable and offers more practicality than anything in this price range',
          rating: 4
        },
        {
          logoUrl: 'TODO',
          videoUrl: null,
          text: 'The Jeep Renegade stands out from the crowd with its chunky looks and excellent off-road performance.',
          rating: 3
        }
      ]
    };

    return (
      <div className="car-details">
        <div className="container">
          <CarDetailsMainImage car={car_data}/>
        </div>

        <br />

        <div className="container">
          <StickyContainer>
            <div className="row">
              <div className="col col-md-7">

                <Overview overview={car_data.overview} />

                {car_data.descriptions.map((description, i) => <Skblock key={i} header={description.title}>{description.text}</Skblock>)}

                <Fetaures features={car_data.features} />

                <History history={car_data.history} />

                <PetrolConsumption petrol_consumption={car_data.petrol_consumption} />

                <Performance performance={car_data.performance} />

                <Safety stars={car_data.safety_stars} />

                <br />

                <InspectorsReport report={car_data.report} />

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
