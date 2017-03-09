export const CLEAR_VEHICLE_DATA = "VEHICLE/CLEAR_VEHICLE_DATA";

function clearVehicleData() {
  return {
    type: CLEAR_VEHICLE_DATA,
    item: {},
    isFetching: false
  };
}

export default function clear() {
  return (dispatch) => {
    dispatch(clearVehicleData());
  };
}
