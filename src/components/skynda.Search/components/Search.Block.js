import React, {PropTypes} from 'react'
import {Row, Col} from "react-bootstrap";
import ButtonGroupContainer from "../containers/SelectBtnContainer";
import SliderContainer from "../containers/SliderContainer";
import ToggleBtnContainer from "../containers/ToggleBtnContainer";
import SearchBtnContainer from "../containers/SearchBtnContainer";
import SearchResultsContainer from "..//containers/ResultsContainer"
import "./Search.Block.scss";
import {Translate} from 'react-redux-i18n';
import Plus from 'react-icons/lib/fa/plus'
import Minus from 'react-icons/lib/fa/minus'

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

class SearchComponent extends React.Component {
  async componentWillMount() {
    await this.props.getClassificationsAsync();
  }

  render() {
    const data = this.props.seats;
    if (data === undefined) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h2 className='primary-header-2 text-center'><Translate value="home_page.search"/></h2>
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
                          title={<Translate value="components.car_search.price"/>}
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
                          title={<Translate value="components.car_search.year"/>}
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

                {
                  this.props.showAdvancedSearch ?
                    (<Row id='advanceSearch' aria-expanded='false'>
                      <Col md={12}>

                        <Row>
                          <Col md={8}>
                            <Row>
                              <Col md={12} className='range-slider-wrapper'>
                                <label><Translate value="components.car_search.colors"/></label><br />
                                <ButtonGroupContainer type={"colors"} md={1} xs={2} options={colors} shape='circle'/>
                              </Col>
                            </Row>
                          </Col>
                          <Col md={4}>
                            <Row>
                              <Col md={12} className='range-slider-wrapper'>
                                <SliderContainer
                                  title={<Translate value="components.car_search.petrolConsumption"/>}
                                  step={0.1}
                                  min={this.props.sliderValues.petrolConsumption.min}
                                  max={this.props.sliderValues.petrolConsumption.max}
                                  units={this.props.sliderValues.petrolConsumption.units}
                                  type={"petrolConsumption"}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>

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
                                  title={<Translate value="components.car_search.power"/>}
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
                        {
                          this.props.showAdvancedSearch
                            ? <Minus/>
                            : <Plus />
                        }
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

