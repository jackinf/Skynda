/**
 * Created by jevgenir on 17/09/2016.
 */

import React from "react";
import "./CarSearchFilterGroup.scss";
import ButtonGroup from "./CarSearchButtonGroup";

import {Button, Row, Col} from "react-bootstrap";
import SearchButton from "../../containers/SearchButtonContainer";
import moment from "moment";

import SliderWrapper from "./CarSearchSliderWrapper";

// translation
import translations from "../../../../store/locales/et";

const brands = [
  {id: -1, name: "Kõik"},
  {id: 0, name: "BMW"},
  {id: 1, name: "Chrysler"},
  {id: 2, name: "Citroen"},
  {id: 3, name: "Fiat"},
  {id: 4, name: "Ford"},
  {id: 5, name: "Honda"},
  {id: 6, name: "Hyundai"},
  {id: 7, name: "Kia"},
  {id: 8, name: "Lexus"},
  {id: 9, name: "Mazda"},
  {id: 10, name: "Nissan"},
  {id: 11, name: "Opel"},
  {id: 12, name: "Peugeot"},
  {id: 13, name: "Renault"},
  {id: 14, name: "Seat"},
  {id: 15, name: "Skoda"},
  {id: 16, name: "Subaru"},
  {id: 17, name: "Volkswagen"},
  {id: 18, name: "Volvo"}
];

const colors = [
  {id: -1, name: "Kõik", toggled: true},
  {id: 0, name: "red", style: {"backgroundColor": "#EF1717"}, toggled: true, hideName: true},
  {id: 1, name: "orange", style: {"backgroundColor": "#E87846"}, toggled: true, hideName: true},
  {id: 2, name: "yellow", style: {"backgroundColor": "#DECC44"}, toggled: true, hideName: true},
  {id: 3, name: "green", style: {"backgroundColor": "#91DD59"}, toggled: true, hideName: true},
  {id: 4, name: "green", style: {"backgroundColor": "#3AC99D"}, toggled: true, hideName: true},
  {id: 5, name: "green", style: {"backgroundColor": "#44DE62"}, toggled: true, hideName: true},
  {id: 6, name: "blue", style: {"backgroundColor": "#15A6DB"}, toggled: true, hideName: true},
  {
    id: 7,
    name: "white",
    style: {"backgroundColor": "#FFFFFF"},
    toggled: true,
    hideName: true,
    extraClass: "btn-inverse"
  },
  {id: 8, name: "black", style: {"backgroundColor": "#000000"}, toggled: true, hideName: true}
];

const features = [
  {id: -1, name: "Kõik", toggled: true},
  {id: 0, name: "Parking Sensors"},
  {id: 1, name: "Bluetooth"},
  {id: 2, name: "Sunroof"},
  {id: 3, name: "Navigation"},
  {id: 4, name: "leather"},
  {id: 5, name: "Premium Lights"}
];

const transmissions = [
  {id: 0, name: translations.components.car_search.automatic, toggled: true},
  {id: 1, name: translations.components.car_search.manual, toggled: true}
];

const doors = [
  {id: -1, name: "Kõik", toggled: true},
  {id: 0, name: "2"},
  {id: 1, name: "3"},
  {id: 2, name: "4+"}
];

const seats = [
  {id: -1, name: "Kõik", toggled: true},
  {id: 0, name: "2"},
  {id: 1, name: "3"},
  {id: 2, name: "5"},
  {id: 3, name: "6+"}
];

class CarSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      showAdvancedSearch: true,

      // NB! Do not change property names.
      sliderValues: {
        mileage: {min: 0, max: 500000, units: "KM"},
        price: {min: 0, max: 500000, units: "EUR"},
        year: {min: 1970, max: moment().year(), units: ""},
        petrol_consumption: {min: 0, max: 20, units: "L"},
        power: {min: 0, max: 500, units: "KW"}
      }
    };

    this.search = this.search.bind(this);
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }

  search() {
    console.log("search is not implemented");
  }

  toggleAdvanced(value) {
    this.setState({showAdvancedSearch: value});
  }

  onSliderChange(value, name) {
    // value 0 is rcslider's min value and value 1 is max value.
    const range = {min: value[0], max: value[1], units: this.state.sliderValues[name].units};
    let sliderValues = this.state.sliderValues;
    sliderValues[name] = range;
    this.setState({sliderValues});
  }

  render() {
    return (<div className='car-search'>
      <section className='search'>

        <Row>
          <Col md={12} className='range-slider-wrapper'>
            <label>{translations.components.car_search.brand}</label>
            <ButtonGroup options={brands}/>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Row>
              <Col md={12}>

                <SliderWrapper
                  title={translations.components.car_search.mileage}
                  step={100}
                  min={this.state.sliderValues.mileage.min}
                  max={this.state.sliderValues.mileage.max}
                  units={this.state.sliderValues.mileage.units}
                  onSliderChange={e => this.onSliderChange(e, "mileage")}
                />

              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12} className='range-slider-wrapper'>

                <SliderWrapper
                  title={translations.components.car_search.price}
                  step={100}
                  min={this.state.sliderValues.price.min}
                  max={this.state.sliderValues.price.max}
                  units={this.state.sliderValues.price.units}
                  onSliderChange={e => this.onSliderChange(e, "price")}
                />
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12} className='range-slider-wrapper'>
                <SliderWrapper
                  title={translations.components.car_search.year}
                  step={1}
                  min={this.state.sliderValues.year.min}
                  max={this.state.sliderValues.year.max}
                  units={this.state.sliderValues.year.units}
                  onSliderChange={e => this.onSliderChange(e, "year")}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        {this.state.showAdvancedSearch ? (<Row id='advanceSearch' aria-expanded='false'>
          <Col md={12}>

            <Row>
              <Col md={8}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <label>{translations.components.car_search.colors}</label><br />
                    <ButtonGroup md={1} xs={2} options={colors} shape='circle'/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <SliderWrapper
                      title={translations.components.car_search.petrol_consumption}
                      step={0.1}
                      min={this.state.sliderValues.petrol_consumption.min}
                      max={this.state.sliderValues.petrol_consumption.max}
                      units={this.state.sliderValues.petrol_consumption.units}
                      onSliderChange={e => this.onSliderChange(e, "petrol_consumption")}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <label>{translations.components.car_search.features}</label>
                    <ButtonGroup md={3} options={features}/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <SliderWrapper
                      title={translations.components.car_search.power}
                      step={1}
                      min={this.state.sliderValues.power.min}
                      max={this.state.sliderValues.power.max}
                      units={this.state.sliderValues.power.units}
                      onSliderChange={e => this.onSliderChange(e, "power")}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <label>{translations.components.car_search.doors}</label><br />
                    <ButtonGroup md={2} xs={2} options={doors} shape='circle'/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <label>{translations.components.car_search.seats}</label><br />
                    <ButtonGroup md={2} xs={2} options={seats} shape='circle'/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <label>{translations.components.car_search.transmission}</label><br />
                    <ButtonGroup md={8} xs={6} options={transmissions}/>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Col>
        </Row>) : ""}

        <div className='row'>
          <div className='col-md-12'>
            <div className='text-right'>
              {/*<Button className='btn btn-link fk-filter-advance'*/}
                      {/*role='button'*/}
                      {/*onClick={e => this.toggleAdvanced(!this.state.showAdvancedSearch)}>*/}
                {/*<span className='more glyphicon glyphicon-plus'/>*/}
                {/*/!* <span className='less glyphicon glyphicon-minus' /> *!/*/}
                {/*{translations.components.car_search.advanced_txt}*/}
              {/*</Button>*/}
              <SearchButton className='btn btn-link fk-filter-advance' actionMethod={() => this.props.toggleAdvancedSearch()}>
                <span className='more glyphicon glyphicon-plus'/>
                {/* <span className='less glyphicon glyphicon-minus' /> */}
                {translations.components.car_search.advanced_txt}
              </SearchButton>

              <SearchButton className='btn btn-info sk-btn--search' actionMethod={() => this.props.setIsSearching(true)}>
                <span className='glyphicon glyphicon-search'/>
                {translations.components.car_search.btn_search}
              </SearchButton>

            </div>
          </div>
        </div>
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
