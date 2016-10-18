/**
 * Created by jevgenir on 17/09/2016.
 */

import React from "react";
import "./CarSearchFilterGroup.scss";

import SearchContainer from "../../containers/SearchContainer";

class CarSearch extends React.Component {
  render() {
    return (<div className='car-search'>
      <section className='search'>

        <SearchContainer />

      </section>

      {/* <!-- SEARCH RESULTS --> */}
      <label>
        {/* {{$ctrl.searchedCars.length}} {{$ctrl.searchedCars.length === 1 ? 'beauty' : 'beauties'}} found */}
      </label>
      {/* <image-grid values="$ctrl.searchedCars"></image-grid> */}
    </div>);
  }
}


export default CarSearch;
