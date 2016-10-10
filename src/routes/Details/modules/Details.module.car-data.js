/**
 * Created by jevgenir on 10/1/2016.
 */

import {toggleLoading} from "./Details.module.toggle-loading";

// Images
import image_overview_1 from "./../../../static/images/standard/group-114@2x.png";
import image_overview_2 from "./../../../static/images/standard/group-115@2x.png";
import image_overview_3 from "./../../../static/images/standard/group-116@2x.png";
import image_overview_4 from "./../../../static/images/standard/group-117@2x.png";
import image_overview_5 from "./../../../static/images/standard/group-119@2x.png";
import image_overview_6 from "./../../../static/images/standard/group-120@2x.png";
import image_overview_7 from "./../../../static/images/standard/group-121@2x.png";
import dummy_image1 from "./../../../static/images/cars/accord/accord.jpg";
import dummy_image2 from "./../../../static/images/cars/accord/accord2.jpg";
import dummy_image3 from "./../../../static/images/cars/accord/accord3.jpg";

export const SET_CAR_DATA = "SET_CAR_DATA";

export const getDataAsync = () => {
  return (dispatch, getState) => {
    dispatch(toggleLoading(true));
    return new Promise((resolve) => {
      setTimeout(() => {
        // TODO: temporary data. Use API data.
        const car_data = {// TODO: REPLACE with api data
          general: {
            src: dummy_image1,
            year: 2012,
            brand: "Honda",
            model: "Accord",
            engine: "3.0",
            horsepower: "225 kW",
            mileage: "75 000 km",
            transmission: "automaatne",
            drive: "Esivedu",
            color_outside: "Tumesinine",
            color_inside: "Must",
            doors: "2",
            seats: "5"
          },
          overview: [
            {label: "75 000 km", iconUrl: image_overview_1},
            {label: "Automaatne", iconUrl: image_overview_2},
            {label: "3.0 (225 kW)", iconUrl: image_overview_3},
            {label: "Esivedu", iconUrl: image_overview_4},
            {label: "2 ust 5 istekohta", iconUrl: image_overview_5},
            {label: "Tumesinine", iconUrl: image_overview_6},
            {label: "Must", iconUrl: image_overview_7}
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
            title: "Mis on mudeli eripära?",
            text: `The BMW 3 Series offers the a combination of luxury and performance that is unmatched
by its competitors. With refined driving dynamics and drop-dead gorgeous looks to
match, this elegant sports coupe is truly an amazing driving machine`
          }, {
            title: "Meil on see suurepärases seisukorras!",
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
            vin_code: "WVWHV71K68W164858"
          },
          petrol_consumption: {
            city: "7.5 l / 100 km",
            highway: "6.5 l / 100 km",
            average: "7.0 l / 100 km"
          },
          performance: {
            driven_wheels: "Tagavedu",
            doors: 4,
            compression_ratio: 10,
            compressor_type: "Turbo",
            configuration: "Inline",
            cylinders: 4,
            displacement: 1997,
            fuel_type: "Premium unlead",
            horsepower: 240,
            size: 2,
            torque: 255,
            total_valves: 16,
            power_train: "Gas"
          },
          safety_stars: 5,
          report: {
            categories: [
              {
                title: "Kategooria 1",
                points: [
                  {text: "Automatic transmission flawless in cold temperature", pass: true},
                  {text: "Steering wheel centered", pass: true},
                  {text: "Steering wheel centered", pass: true},
                  {text: "Automatic transmission flawless in cold temperature", pass: false},
                  {text: "Automatic transmission flawless in cold temperature", pass: true},
                  {text: "Steering wheel centered", pass: true}
                ]
              },
              {
                title: "Kategooria 2",
                points: [
                  {text: "Automatic transmission flawless in cold temperature", pass: true},
                  {text: "Steering wheel centered", pass: true},
                  {text: "Steering wheel centered", pass: true},
                  {text: "Automatic transmission flawless in cold temperature", pass: false},
                  {text: "Automatic transmission flawless in cold temperature", pass: true},
                  {text: "Steering wheel centered", pass: true}
                ]
              }
            ],
            faults: [
              {text: "Scratches near the ignition", img: "TODO"},
              {text: "Scratches on the glovebox", img: "TODO"},
              {text: "Scratches on the back door", img: "TODO"}
            ]
          },
          reviews: [
            {
              logoUrl: image_overview_1,
              videoUrl: null,
              text: "The Dacia Sandero demands compromises, but it’s likeable and offers more practicality than anything in this price range",
              rating: 4
            },
            {
              logoUrl: image_overview_2,
              videoUrl: null,
              text: "The Jeep Renegade stands out from the crowd with its chunky looks and excellent off-road performance.",
              rating: 3
            }
          ]
        };

        dispatch(setCarData(car_data));
        dispatch(toggleLoading(false));
        resolve();
      }, 200);
    });
  };
};

export function setCarData(value) {
  return {
    type    : SET_CAR_DATA,
    payload : value
  };
}

export const actions = {
  getDataAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CAR_DATA] : (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

