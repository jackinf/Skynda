/**
 * Created by jevgenir on 17/09/2016.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AdvancedSearch.scss';

class Search extends React.Component {
  constructor() {
    super();
    this.search = this.search.bind(this);
  }

  search() {
    console.log("search is not implemented");
  }

  render() {
    return (<div>
        {/*<sk-navbar></sk-navbar>*/}

        <div className="container">
          <section className="search">
            <label>Brand</label>
            {/*<btn-group options="$ctrl.brands" model="$ctrl.selectedBrands"></btn-group>*/}

            <div className="row">
              <div className="col-md-4">
                <div className="range-slider-wrapper">
                  <label>Mileage</label>
                  <range-slider label="'KM'" min="0" max="500000" model-min="$ctrl.mileageMin" model-max="$ctrl.mileageMax">
                  </range-slider>
                </div>
              </div>
              <div className="col-md-4">
                <div className="range-slider-wrapper">
                  <label>Price</label>
                  <range-slider label="'EUR'" min="1" max="500000" model-min="$ctrl.priceMin" model-max="$ctrl.priceMax">
                  </range-slider>
                </div>
              </div>
              <div className="col-md-4">
                <div className="range-slider-wrapper">
                  <label>Year</label>
                  <range-slider min="1970" max="2016" model-min="$ctrl.yearMin" model-max="$ctrl.yearMax">
                  </range-slider>
                </div>
              </div>
            </div>

            <div className="row collapse" id="advanceSearch" aria-expanded="false">
              <div className="col-md-8">>
                <label>Color</label>
                <btn-group className="colors" options="$ctrl.colors" model="$ctrl.selectedColors" shape="'circle'">
                </btn-group>

                <label>Features</label>
                <btn-group options="$ctrl.features" model="$ctrl.selectedFeatures">
                </btn-group>

                <div className="row">
                  <div className="col-md-6">
                    <label>Doors</label>
                    <btn-group options="$ctrl.doors" model="$ctrl.selectedDoors" shape="'circle'">
                    </btn-group>
                  </div>
                  <div className="col-md-6">
                    <label>Seats</label>
                    <btn-group options="$ctrl.seats" model="$ctrl.selectedSeats" shape="'circle'">
                    </btn-group>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="range-slider-wrapper">
                  <label>Petrol Consumption (average)</label>
                  <range-slider label="'L'" min="0" max="20" model-min="$ctrl.petrolMin" model-max="$ctrl.petrolMax">
                  </range-slider>
                </div>
                <div className="range-slider-wrapper">

                  <label>Horsepower</label>
                  <range-slider label="'KW'" min="0" max="500" model-min="$ctrl.horsepowerMin" model-max="$ctrl.horsepowerMax">
                  </range-slider>
                </div>
                <label>Transmission</label>
                <btn-group options="$ctrl.transmissions" model="$ctrl.selectedTransmissions">
                </btn-group>

              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="text-right">
                  <button className="btn btn-link fk-filter-advance" role="button" data-toggle="collapse" data-target="#advanceSearch" aria-expanded="false" aria-controls="collapseExample">
                    <span className="more glyphicon glyphicon-plus"></span>
                    <span className="less glyphicon glyphicon-minus"></span>
                    ADVANCED FILTERS
                  </button>

                  <button className="btn btn-info sk-btn--search" onClick={this.search}>
                    <span className="glyphicon glyphicon-search"></span>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/*<!-- SEARCH RESULTS -->*/}
          <label>
            {/*{{$ctrl.searchedCars.length}} {{$ctrl.searchedCars.length === 1 ? 'beauty' : 'beauties'}} found*/}
          </label>
          {/*<image-grid values="$ctrl.searchedCars"></image-grid>*/}
        </div>
      </div>)
  }
}

export default withStyles(s)(Search);
