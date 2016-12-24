import React, {PropTypes} from 'react'
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'
import RefreshIndicator from 'material-ui/RefreshIndicator';

import "./Search.component.scss";
import ButtonGroupContainer from "../containers/Select.button.container";
import SliderContainer from "../../Slider/Slider.container";
import ToggleBtnContainer from "../containers/Search.toggle.button.container";
import SearchBtnContainer from "../containers/Search.button.container";
import SearchResultsContainer from "../containers/Search.results.container"

const colors = [
  {id: -1, name: "Kõik"},
  {id: 0, name: "red", style: {"backgroundColor": "#EF1717"}, hideName: true},
  {id: 1, name: "orange", style: {"backgroundColor": "#E87846"}, hideName: true},
  {id: 2, name: "yellow", style: {"backgroundColor": "#DECC44"}, hideName: true},
  {id: 3, name: "green", style: {"backgroundColor": "#91DD59"}, hideName: true},
  {id: 4, name: "green", style: {"backgroundColor": "#3AC99D"}, hideName: true},
  {id: 5, name: "green", style: {"backgroundColor": "#44DE62"}, hideName: true},
  {id: 6, name: "blue", style: {"backgroundColor": "#15A6DB"}, hideName: true},
  {
    id: 7,
    name: "white",
    style: {"backgroundColor": "#FFFFFF"},
    hideName: true,
    extraClass: "btn-inverse"
  },
  {id: 8, name: "black", style: {"backgroundColor": "#000000"}, hideName: true}
];

// Temporarily not used.
function ColorsComponent() {
  return (<Row>
    <Col md={12} className='range-slider-wrapper'>
      <label><Translate value="components.car_search.colors"/></label><br />
      <ButtonGroupContainer type={"colors"} md={1} xs={2} options={colors} shape='circle'/>
    </Col>
  </Row>)
}

class SearchComponent extends React.Component {
  defaultSliderValues = {
    mileage: {min: 0, max: 500000},
    price: {min: 0, max: 500000},
    year: {min: 2007, max: 2017},
    petrolConsumption: {min: 0, max: 20},
    power: {min: 0, max: 1000}
  };

  async componentWillMount() {
    await this.props.getClassificationsAsync();
  }

  render() {
    const {sliderValues} = this.props;
    const data = this.props.seats;
    if (data === undefined) {
      return <div><RefreshIndicator size={100} left={200} top={200} status="loading"/></div>;
    }

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 className='primary-header-2 text-center'><Translate value="home_page.search"/>:</h2>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className='car-search'>
              <section className='search'>
                <Row>
                  <Col md={12} className='range-slider-wrapper'>
                    <label><Translate value="components.car_search.brand"/></label>
                    <ButtonGroupContainer type={"brands"} options={this.props.brands}/>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <Row>
                      <Col md={12}>
                        <SliderContainer
                          title={<Translate value="components.car_search.mileage"/>}
                          step={100}
                          defaultMin={this.defaultSliderValues.mileage.min}
                          defaultMax={this.defaultSliderValues.mileage.max}
                          min={sliderValues.mileage.min}
                          max={sliderValues.mileage.max}
                          units={sliderValues.mileage.units}
                          type={"mileage"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col md={12} className='range-slider-wrapper'>
                        <SliderContainer
                          title={<Translate value="components.car_search.price"/>}
                          step={100}
                          defaultMin={this.defaultSliderValues.price.min}
                          defaultMax={this.defaultSliderValues.price.max}
                          min={sliderValues.price.min}
                          max={sliderValues.price.max}
                          units={sliderValues.price.units}
                          type={"price"}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col md={4}>
                    <Row>
                      <Col md={12} className='range-slider-wrapper'>

                        <SliderContainer
                          title={<Translate value="components.car_search.year"/>}
                          step={1}
                          defaultMin={this.defaultSliderValues.year.min}
                          defaultMax={this.defaultSliderValues.year.max}
                          min={sliderValues.year.min}
                          max={sliderValues.year.max}
                          units={sliderValues.year.units}
                          type={"year"}
                        />

                      </Col>
                    </Row>
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
                                <label><Translate value="components.car_search.features"/></label>
                                <ButtonGroupContainer type={"features"} md={3} options={this.props.features}/>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={4}>
                            <Row>
                              <Col md={12} className='range-slider-wrapper'>
                                <SliderContainer
                                  title={<Translate value="components.car_search.petrol_consumption"/>}
                                  step={0.1}
                                  defaultMin={this.defaultSliderValues.petrolConsumption.min}
                                  defaultMax={this.defaultSliderValues.petrolConsumption.max}
                                  min={sliderValues.petrolConsumption.min}
                                  max={sliderValues.petrolConsumption.max}
                                  units={sliderValues.petrolConsumption.units}
                                  type={"petrolConsumption"}
                                />
                              </Col>
                            </Row>

                            <Row>
                              <Col md={12} className='range-slider-wrapper'>
                                <SliderContainer
                                  title={<Translate value="components.car_search.power"/>}
                                  step={1}
                                  defaultMin={this.defaultSliderValues.power.min}
                                  defaultMax={this.defaultSliderValues.power.max}
                                  min={sliderValues.power.min}
                                  max={sliderValues.power.max}
                                  units={sliderValues.power.units}
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
                                <label><Translate value="components.car_search.doors"/></label><br />
                                <ButtonGroupContainer type={"doors"} md={2} xs={2} options={this.props.doors}
                                                      shape='circle'/>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={4}>
                            <Row>
                              <Col md={12} className='range-slider-wrapper'>
                                <label><Translate value="components.car_search.seats"/></label><br />
                                <ButtonGroupContainer type={"seats"} md={2} xs={2} options={this.props.seats}
                                                      shape='circle'/>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={4}>
                            <Row>
                              <Col md={12} className='range-slider-wrapper'>
                                <label><Translate value="components.car_search.transmission"/></label><br />
                                <ButtonGroupContainer type={"transmission"} md={8} xs={6}
                                                      options={this.props.transmissions}/>
                              </Col>
                            </Row>
                          </Col>
                        </Row>


                      </Col>
                    </Row>) : ""}


                <Row>
                  <Col md={12}>
                    <div className='text-right'>
                      <ToggleBtnContainer className='btn btn-link fk-filter-advance'>
                        {this.props.showAdvancedSearch ? <Minus/> : <Plus />}
                        &nbsp;&nbsp;
                        <Translate value="components.car_search.advanced_txt"/>
                      </ToggleBtnContainer>

                      <SearchBtnContainer className='btn btn-info sk-btn--search'>
                        <span className='glyphicon glyphicon-search'/>
                        <Translate value="components.car_search.btn_search"/>
                      </SearchBtnContainer>

                    </div>
                  </Col>
                </Row>
              </section>
            </div>
          </Col>
        </Row>
        <br/>
        <SearchResultsContainer />
      </div>
    );
  }
}

SearchComponent.propTypes = {
  getClassificationsAsync: React.PropTypes.func.isRequired
};

export default SearchComponent

