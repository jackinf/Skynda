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
    src: vehicleData.mainImageUrl,
    year: parseInt(vehicleData.year),
    brand: vehicleData.vehicleManufacturerName,
    model: vehicleData.modelCode,
    engine: vehicleData.engine,
    horsepower: parseInt(vehicleData.horsePower),
    images: vehicleData.images,
    price: vehicleData.price
  };
  const overview = {
    manufacturer: vehicleData.vehicleManufacturerName,
    engine: vehicleData.engine,
    horsePower: parseInt(vehicleData.horsePower),
    mileage: vehicleData.mileage,
    transmission: vehicleData.transmissionName,
    drive: vehicleData.vehicleDrivetrain,
    colorOutsideHex: vehicleData.colorOutsideHex,
    colorInsideHex: vehicleData.colorInsideHex,
    doors: parseInt(vehicleData.doors),
    seats: vehicleData.seats,
    fuel: vehicleData.fuelName
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
    foundHistory: vehicleData.foundHistory,
    vinCode: vehicleData.vinCode,
    registrationNumber: vehicleData.registrationNumber
  };
  const petrolConsumption = {
    city: vehicleData.fuelCity,
    highway: vehicleData.fuelHighway,  // isRequired
    average: vehicleData.fuelAverage
  };
  const report = {
    reportCategories: vehicleData.reports instanceof Array ? vehicleData.reports : [],
    faults: vehicleData.faults instanceof Array ? vehicleData.faults.map(fault => ({
      text: fault.text,
      img: fault.image ? fault.image.thumbnailUrl : ""
    })) : []
  };
  const reviews = vehicleData.reviews.map(review => {
    return {
      text: review.text,
      rating: review.rating,
      logoUrl: review.logoUrl,
      videoUrl: review.videoUrl
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
