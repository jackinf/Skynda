/**
 * Created by jevgenir on 10/21/2016.
 */
import {setCars} from "./../reducers/SetCars.reducer";

export const getList = () => (dispatch) => {
  dispatch(setCars({isFetching: true}));
  return setTimeout(() => {
    dispatch(setCars({isFetching: false, cars: [{id: 1, name: "BMW"}]}));
  }, 1000);
};
