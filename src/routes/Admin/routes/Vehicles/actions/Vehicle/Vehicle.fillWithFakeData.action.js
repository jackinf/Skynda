/**
 * Created by jevgenir on 10/24/2016.
 */
import {setVehicleData} from "../../reducers/Vehicle.reducer";

export default function fillWithFakeData() {
  const fakeData = {
    "vehicleManufacturerCode": "string",
    "vehicleModelsCode": "string",
    "colorInside": "string",
    "colorOutside": "string",
    "faults": [
      {
        "id": 0,
        "img": "string",
        "text": "string"
      }
    ],
    "features": [
      {
        "id": 0,
        "text": "string"
      }
    ],
    "fuelCity": "string",
    "fuelHighway": "string",
    "id": 0,
    "images": [
      {
        "id": 0,
        "original": "string",
        "thumbnail": "string"
      }
    ],
    "isSold": true,
    "mileage": 0,
    "performance": {
      "compressionRatio": 0,
      "compressionType": "string",
      "configuration": "string",
      "cylinders": "string",
      "displacement": "string",
      "doors": 0,
      "drivenWheels": "string",
      "fuelType": "string",
      "horsePower": 0,
      "powerTrain": "string",
      "size": 0,
      "torque": 0,
      "totalValves": 0
    },
    "price": 0,
    "registrationNumber": "string",
    "safetyStars": 0,
    "vinCode": "string"
  };

  return (dispatch) => dispatch(setVehicleData({isFetching: false, data: fakeData}));
}
