import fetch from "isomorphic-fetch";
import remoteConfig from "../../../store/remoteConfig";
import {toggleLoading} from "./Details.module.toggle-loading";

export const SET_VEHICLE_DATA = "SET_VEHICLE_DATA";

export const getDataAsync = (id) => (dispatch, getState) => {
    dispatch(toggleLoading(true));

    return fetch(`${remoteConfig.remote}/api/vehicle/${id}/detailed`, {
      method: "GET",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"}
    })
      .then(resp => resp.json())
      .then(data => {
        const mappedData = map(data);
        dispatch(setCarData(mappedData));
        dispatch(toggleLoading(false));
      });
};

export function setCarData(value) {
  return {
    type: SET_VEHICLE_DATA,
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
  [SET_VEHICLE_DATA]: (state, action) => action.payload
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {};
export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}

function map(vehicleData) {
  const safetyStars = vehicleData.safetyStars;
  const safetyUrl = vehicleData.safetyUrl;
  const additional = vehicleData.additional;
  const vehicleDetailsMainImage = {
    src: vehicleData.mainImage.url,
    year: parseInt(vehicleData.model.year),
    brand: vehicleData.model.vehicleManufacturer.name,
    model: vehicleData.model.modelCode,
    engine: vehicleData.model.engine,
    horsepower: parseInt(vehicleData.model.horsePower),
    images: vehicleData.images,
    price: vehicleData.price
  };
  const overview = {
    manufacturer: vehicleData.model.vehicleManufacturer.name,
    engine: vehicleData.model.engine,
    horsePower: parseInt(vehicleData.model.horsePower),
    mileage: vehicleData.mileage,
    transmission: vehicleData.model.transmission ? vehicleData.model.transmission.name : "",
    drive: vehicleData.model.drivetrain ? vehicleData.model.drivetrain.name : "",
    colorOutsideHex: vehicleData.colorOutsideHex,
    colorInsideHex: vehicleData.colorInsideHex,
    doors: parseInt(vehicleData.model.doors),
    seats: vehicleData.model.seats
  };
  const descriptions = vehicleData.descriptions
    ? vehicleData.descriptions.map(description => (
      {
        title: description.title,
        content: description.content
      }
    )) : [];
  const features = vehicleData.features
    ? vehicleData.features.map(featureItem => featureItem.feature != null ? featureItem.feature.name : "")
    : [];
  const history = {
    problems: [],
    vinCode: vehicleData.vinCode,
    registrationNumber: vehicleData.registrationNumber
  };
  const petrolConsumption = {
    city: vehicleData.fuelCity,
    highway: vehicleData.fuelHighway,  // isRequired
    average: vehicleData.fuelAverage,   // isRequired
    fuelType: vehicleData.model.fuelType ? vehicleData.model.fuelType.name : ""
  };
  const report = {
    reportCategories: vehicleData.reportCategories,
    faults: vehicleData.faults ? vehicleData.faults.map(fault => ({
        text: fault.text,
        img: fault.image ? fault.image.url : ""
      })) : [],
    inspector: vehicleData.inspector
  };

  const reviews = vehicleData.reviews.map(review => {
    return {
      text: review.text,
      rating: review.rating,
      logoUrl: review.logo != null ? review.logo.url : "",
      videoUrl: review.video != null ? review.video.url : ""
    }
  });

  return {
    vehicleDetailsMainImage,
    overview,
    descriptions,
    features,
    history,
    petrolConsumption,
    safetyStars,
    safetyUrl,
    report,
    reviews,
    additional
  }
}


// // TODO: This is temporary car information for testing purposes (when there is no connection to the internet)
// // Images
// import imageOverview1 from "./../../../static/images/standard/group-114@2x.png";
// import imageOverview2 from "./../../../static/images/standard/group-115@2x.png";
// import imageOverview3 from "./../../../static/images/standard/group-116@2x.png";
// import imageOverview4 from "./../../../static/images/standard/group-117@2x.png";
// import imageOverview5 from "./../../../static/images/standard/group-119@2x.png";
// import imageOverview6 from "./../../../static/images/standard/group-120@2x.png";
// import imageOverview7 from "./../../../static/images/standard/group-121@2x.png";
// import dummyImage1 from "./../../../static/images/cars/accord/accord.jpg";
// import dummyImage2 from "./../../../static/images/cars/accord/accord2.jpg";
// import dummyImage3 from "./../../../static/images/cars/accord/accord3.jpg";
//
// // We can also see the entire structure of the object
// const fakeCarData = {
//   general: {
//     src: dummyImage1,
//     year: 2012,
//     brand: "Honda",
//     model: "Accord",
//     engine: "3.0",
//     horsepower: "225 kW",
//     mileage: "75 000 km",
//     transmission: "automaatne",
//     drive: "Esivedu",
//     colorOutside: "Tumesinine",
//     colorInside: "Must",
//     doors: "2",
//     seats: "5"
//   },
//   overview: [
//     {label: "75 000 km", iconUrl: imageOverview1},
//     {label: "Automaatne", iconUrl: imageOverview2},
//     {label: "3.0 (225 kW)", iconUrl: imageOverview3},
//     {label: "Esivedu", iconUrl: imageOverview4},
//     {label: "2 ust 5 istekohta", iconUrl: imageOverview5},
//     {label: "Tumesinine", iconUrl: imageOverview6},
//     {label: "Must", iconUrl: imageOverview7}
//   ],
//   images: [
//     {
//       original: dummyImage1,
//       thumbnail: dummyImage1
//     },
//     {
//       original: dummyImage2,
//       thumbnail: dummyImage2
//     },
//     {
//       original: dummyImage3,
//       thumbnail: dummyImage3
//     }
//   ],
//   descriptions: [{
//     title: "Mis on mudeli eripära?",
//     text: `The BMW 3 Series offers the a combination of luxury and performance that is unmatched
// by its competitors. With refined driving dynamics and drop-dead gorgeous looks to
// match, this elegant sports coupe is truly an amazing driving machine`
//   }, {
//     title: "Meil on see suurepärases seisukorras!",
//     text: `Triven seller Aju is switching things up with a new ride! Triven Inspector Nicolas thought this
// car was in excellent condition. We would love to drop off this great BMW right in your
// driveway! Triven bought this car from private seller Aju, and now Skyda is offering this car for
// sale`
//   }],
//   features: [
//     "Steering Wheel Controls",
//     "Paddle Shifters",
//     "Premium Lights",
//     "Turbocharger",
//     "Parking Sensors"
//   ],
//   history: {
//     problems: [],
//     vinCode: "WVWHV71K68W164858"
//   },
//   petrolConsumption: {
//     city: "7.5 l / 100 km",
//     highway: "6.5 l / 100 km",
//     average: "7.0 l / 100 km"
//   },
//   performance: {
//     drivenWheels: "Tagavedu",
//     doors: 4,
//     compressionRatio: 10,
//     compressorType: "Turbo",
//     configuration: "Inline",
//     cylinders: 4,
//     displacement: 1997,
//     fuelType: "Premium unlead",
//     horsePower: 240,
//     size: 2,
//     torque: 255,
//     totalValves: 16,
//     powerTrain: "Gas"
//   },
//   safetyStars: 5,
//   report: {
//     categories: [
//       {
//         title: "Kategooria 1",
//         points: [
//           {text: "Automatic transmission flawless in cold temperature", pass: true},
//           {text: "Steering wheel centered", pass: true},
//           {text: "Steering wheel centered", pass: true},
//           {text: "Automatic transmission flawless in cold temperature", pass: false},
//           {text: "Automatic transmission flawless in cold temperature", pass: true},
//           {text: "Steering wheel centered", pass: true}
//         ]
//       },
//       {
//         title: "Kategooria 2",
//         points: [
//           {text: "Automatic transmission flawless in cold temperature", pass: true},
//           {text: "Steering wheel centered", pass: true},
//           {text: "Steering wheel centered", pass: true},
//           {text: "Automatic transmission flawless in cold temperature", pass: false},
//           {text: "Automatic transmission flawless in cold temperature", pass: true},
//           {text: "Steering wheel centered", pass: true}
//         ]
//       }
//     ],
//     faults: [
//       {text: "Scratches near the ignition", img: "TODO"},
//       {text: "Scratches on the glovebox", img: "TODO"},
//       {text: "Scratches on the back door", img: "TODO"}
//     ]
//   },
//   reviews: [
//     {
//       logoUrl: imageOverview1,
//       videoUrl: null,
//       text: "The Dacia Sandero demands compromises, but it’s likeable and offers more practicality than " +
//       "anything in this price range",
//       rating: 4
//     },
//     {
//       logoUrl: imageOverview2,
//       videoUrl: null,
//       text: "The Jeep Renegade stands out from the crowd with its chunky looks and excellent off-road " +
//       "performance.",
//       rating: 3
//     }
//   ]
// };
