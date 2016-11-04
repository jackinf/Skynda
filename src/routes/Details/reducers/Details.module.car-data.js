/**
 * Created by jevgenir on 10/1/2016.
 */

import fetch from "isomorphic-fetch";
import remoteConfig from "../../../store/remoteConfig";
import {toggleLoading} from "./Details.module.toggle-loading";

// Images
import imageOverview1 from "./../../../static/images/standard/group-114@2x.png";
import imageOverview2 from "./../../../static/images/standard/group-115@2x.png";
import imageOverview3 from "./../../../static/images/standard/group-116@2x.png";
import imageOverview4 from "./../../../static/images/standard/group-117@2x.png";
import imageOverview5 from "./../../../static/images/standard/group-119@2x.png";
import imageOverview6 from "./../../../static/images/standard/group-120@2x.png";
import imageOverview7 from "./../../../static/images/standard/group-121@2x.png";
import dummyImage1 from "./../../../static/images/cars/accord/accord.jpg";
import dummyImage2 from "./../../../static/images/cars/accord/accord2.jpg";
import dummyImage3 from "./../../../static/images/cars/accord/accord3.jpg";

// TODO: This is temporary car information for testing purposes (when there is no connection to the internet)
// We can also see the entire structure of the object
const fakeCarData = {
  general: {
    src: dummyImage1,
    year: 2012,
    brand: "Honda",
    model: "Accord",
    engine: "3.0",
    horsepower: "225 kW",
    mileage: "75 000 km",
    transmission: "automaatne",
    drive: "Esivedu",
    colorOutside: "Tumesinine",
    colorInside: "Must",
    doors: "2",
    seats: "5"
  },
  overview: [
    {label: "75 000 km", iconUrl: imageOverview1},
    {label: "Automaatne", iconUrl: imageOverview2},
    {label: "3.0 (225 kW)", iconUrl: imageOverview3},
    {label: "Esivedu", iconUrl: imageOverview4},
    {label: "2 ust 5 istekohta", iconUrl: imageOverview5},
    {label: "Tumesinine", iconUrl: imageOverview6},
    {label: "Must", iconUrl: imageOverview7}
  ],
  images: [
    {
      original: dummyImage1,
      thumbnail: dummyImage1
    },
    {
      original: dummyImage2,
      thumbnail: dummyImage2
    },
    {
      original: dummyImage3,
      thumbnail: dummyImage3
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
    vinCode: "WVWHV71K68W164858"
  },
  petrolConsumption: {
    city: "7.5 l / 100 km",
    highway: "6.5 l / 100 km",
    average: "7.0 l / 100 km"
  },
  performance: {
    drivenWheels: "Tagavedu",
    doors: 4,
    compressionRatio: 10,
    compressorType: "Turbo",
    configuration: "Inline",
    cylinders: 4,
    displacement: 1997,
    fuelType: "Premium unlead",
    horsePower: 240,
    size: 2,
    torque: 255,
    totalValves: 16,
    powerTrain: "Gas"
  },
  safetyStars: 5,
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
      logoUrl: imageOverview1,
      videoUrl: null,
      text: "The Dacia Sandero demands compromises, but it’s likeable and offers more practicality than " +
      "anything in this price range",
      rating: 4
    },
    {
      logoUrl: imageOverview2,
      videoUrl: null,
      text: "The Jeep Renegade stands out from the crowd with its chunky looks and excellent off-road " +
      "performance.",
      rating: 3
    }
  ]
};


export const SET_CAR_DATA = "SET_CAR_DATA";

export const getDataAsync = (id = 110) => (dispatch, getState) => {
    dispatch(toggleLoading(true));

    return fetch(`${remoteConfig.remote}/api/car/${id}/detailed`, {
      method: "GET",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(data => {
        data["general"] = data["carGeneralDto"];
        dispatch(setCarData(data));
        dispatch(toggleLoading(false));
      });
      // .catch((error) => {
      //   console.log("ERROR: ", error);
      //   dispatch(setCarData(fakeCarData));
      //   dispatch(toggleLoading(false));
      // });

};

export function setCarData(value) {
  return {
    type: SET_CAR_DATA,
    payload: value
  };
}

export const actions = {
  getDataAsync
};

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_CAR_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

