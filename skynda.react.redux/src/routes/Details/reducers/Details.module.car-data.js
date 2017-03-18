import {toggleLoading} from "./Details.module.toggle-loading";
import {VehicleService} from "../../../webServices"

export const SET_VEHICLE_DATA = "SET_VEHICLE_DATA";

export const getDataAsync = (id) => (dispatch, getState) => {
  dispatch(toggleLoading(true));
  const promise = VehicleService.getDataAsync(id);
  promise.then(data => {
    const mappedData = map(data);
    dispatch(setCarData(mappedData));
    dispatch(toggleLoading(false));
  }).catch(err => {
    throw err;
  })
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
    brand: vehicleData.vehicleManufacturerName,
    model: vehicleData.model.modelCode,
    engine: vehicleData.model.engine,
    horsepower: parseInt(vehicleData.model.horsePower),
    images: vehicleData.images,
    price: vehicleData.price
  };
  const overview = {
    manufacturer: vehicleData.vehicleManufacturerName,
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
    reportCategories: vehicleData.reportCategories instanceof Array ? vehicleData.reportCategories : [],
    faults: vehicleData.faults instanceof Array ? vehicleData.faults.map(fault => ({
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
