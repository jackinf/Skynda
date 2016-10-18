import React, { PropTypes } from 'react'
import {Button, Row, Col} from "react-bootstrap";
import ButtonGroup from "./CarSearchButtonGroup";
import SliderContainer from "../../containers/SliderContainer";
import ToggleButton from "../../containers/ToggleAdvancedSearchContainer";
import SearchButton from "../../containers/SearchButtonContainer";

// translation
import translations from "../../../../store/locales/et";


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

class SearchComponent extends React.Component {

  async componentWillMount() {
    await this.props.loadBaseData();
  }

  render() {
    const data = this.props.seats;
    if (data === undefined) {
      return <div>Loading...</div>;
    }

    return (<div>

      <Row>
        <Col md={12} className='range-slider-wrapper'>
          <label>{translations.components.car_search.brand}</label>
          <ButtonGroup options={this.props.brands}/>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Row>
            <Col md={12}>

              <SliderContainer
                title={translations.components.car_search.mileage}
                step={100}
                min={this.props.sliderValues.mileage.min}
                max={this.props.sliderValues.mileage.max}
                units={this.props.sliderValues.mileage.units}
                type={"mileage"}
              />

            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={12} className='range-slider-wrapper'>

              <SliderContainer
                title={translations.components.car_search.price}
                step={100}
                min={this.props.sliderValues.price.min}
                max={this.props.sliderValues.price.max}
                units={this.props.sliderValues.price.units}
                type={"price"}
              />

            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <Row>
            <Col md={12} className='range-slider-wrapper'>

              <SliderContainer
                title={translations.components.car_search.year}
                step={1}
                min={this.props.sliderValues.year.min}
                max={this.props.sliderValues.year.max}
                units={this.props.sliderValues.year.units}
                type={"year"}
              />

            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <div className='text-right'>
            <ToggleButton className='btn btn-link fk-filter-advance' >
              {
                this.props.showAdvancedSearch ?
                <span className='glyphicon glyphicon-minus' /> : <span className='glyphicon glyphicon-plus'/>
              }
              {translations.components.car_search.advanced_txt}
            </ToggleButton>

            <SearchButton className='btn btn-info sk-btn--search' >
              <span className='glyphicon glyphicon-search'/>
              {translations.components.car_search.btn_search}
            </SearchButton>

          </div>
        </Col>
      </Row>

      {
        this.props.showAdvancedSearch ?
          (<Row id='advanceSearch' aria-expanded='false'>
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
                  <SliderContainer
                    title={translations.components.car_search.petrol_consumption}
                    step={0.1}
                    min={this.props.sliderValues.petrol_consumption.min}
                    max={this.props.sliderValues.petrol_consumption.max}
                    units={this.props.sliderValues.petrol_consumption.units}
                    type={"petrol_consumption"}
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
                  <ButtonGroup md={3} options={this.props.features}/>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <Col md={12} className='range-slider-wrapper'>
                  <SliderContainer
                    title={translations.components.car_search.power}
                    step={1}
                    min={this.props.sliderValues.power.min}
                    max={this.props.sliderValues.power.max}
                    units={this.props.sliderValues.power.units}
                    type={"power"}
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
                  <ButtonGroup md={2} xs={2} options={this.props.doors} shape='circle'/>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <Col md={12} className='range-slider-wrapper'>
                  <label>{translations.components.car_search.seats}</label><br />
                  <ButtonGroup md={2} xs={2} options={this.props.seats} shape='circle'/>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <Col md={12} className='range-slider-wrapper'>
                  <label>{translations.components.car_search.transmission}</label><br />
                  <ButtonGroup md={8} xs={6} options={this.props.transmissions}/>
                </Col>
              </Row>
            </Col>
          </Row>


        </Col>
      </Row>) : ""}
    </div>);
  }
}

SearchComponent.propTypes = {
  loadBaseData: React.PropTypes.func.isRequired
};

export default SearchComponent

