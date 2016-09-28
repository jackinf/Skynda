/**
 * Created by jevgenir on 17/09/2016.
 */

import React from 'react';
import './CarSearchFilterGroup.scss';
import ButtonGroup from './CarSearchButtonGroup';

import {Button, Row, Col} from 'react-bootstrap';
import Slider from 'rc-slider';
import moment from 'moment';


const brands = [
  {id: -1, name: 'All'},
  {id: 0, name: 'BMW'},
  {id: 1, name: 'Chrysler'},
  {id: 2, name: 'Citroen'},
  {id: 3, name: 'Fiat'},
  {id: 4, name: 'Ford'},
  {id: 5, name: 'Honda'},
  {id: 6, name: 'Hyundai'},
  {id: 7, name: 'Kia'},
  {id: 8, name: 'Lexus'},
  {id: 9, name: 'Mazda'},
  {id: 10, name: 'Nissan'},
  {id: 11, name: 'Opel'},
  {id: 12, name: 'Peugeot'},
  {id: 13, name: 'Renault'},
  {id: 14, name: 'Seat'},
  {id: 15, name: 'Skoda'},
  {id: 16, name: 'Subaru'},
  {id: 17, name: 'Volkswagen'},
  {id: 18, name: 'Volvo'}
];

const colors = [
  {id: -1, name: 'All', toggled: true},
  {id: 0, name: 'red', style: {'backgroundColor': '#EF1717'}, toggled: true, hideName: true},
  {id: 1, name: 'orange', style: {'backgroundColor': '#E87846'}, toggled: true, hideName: true},
  {id: 2, name: 'yellow', style: {'backgroundColor': '#DECC44'}, toggled: true, hideName: true},
  {id: 3, name: 'green', style: {'backgroundColor': '#91DD59'}, toggled: true, hideName: true},
  {id: 4, name: 'green', style: {'backgroundColor': '#3AC99D'}, toggled: true, hideName: true},
  {id: 5, name: 'green', style: {'backgroundColor': '#44DE62'}, toggled: true, hideName: true},
  {id: 6, name: 'blue', style: {'backgroundColor': '#15A6DB'}, toggled: true, hideName: true},
  {
    id: 7,
    name: 'white',
    style: {'backgroundColor': '#FFFFFF'},
    toggled: true,
    hideName: true,
    extraClass: 'btn-inverse'
  },
  {id: 8, name: 'black', style: {'backgroundColor': '#000000'}, toggled: true, hideName: true}
];

const features = [
  {id: -1, name: 'All', toggled: true},
  {id: 0, name: 'Parking Sensors'},
  {id: 1, name: 'Bluetooth'},
  {id: 2, name: 'Sunroof'},
  {id: 3, name: 'Navigation'},
  {id: 4, name: 'leather'},
  {id: 5, name: 'Premium Lights'}
];

const transmissions = [
  {id: 0, name: 'Automatic', toggled: true},
  {id: 1, name: 'Manual', toggled: true}
];

const doors = [
  {id: -1, name: 'All', toggled: true},
  {id: 0, name: '2'},
  {id: 1, name: '3'},
  {id: 2, name: '4+'}
];

const seats = [
  {id: -1, name: 'All', toggled: true},
  {id: 0, name: '2'},
  {id: 1, name: '3'},
  {id: 2, name: '5'},
  {id: 3, name: '6+'}
];
// const options = [brands, colors, features, transmissions, doors, seats];


class CarSearch extends React.Component {
  constructor() {
    super();
    this.state = {showAdvancedSearch: false};
    this.search = this.search.bind(this);
  }

  search() {
    console.log("search is not implemented");
  }

  toggleAdvanced(value) {
    this.setState({showAdvancedSearch: value});
  }

  render() {
    return (<div className="car-search">
      <section className="search">

        <Row>
          <Col md={12}>
            <label>Brand</label>
            <ButtonGroup options={brands}/>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Row>
              <Col md={12} className="range-slider-wrapper">
                <label>Mileage</label>
                <Slider range allowCross={false} defaultValue={[0, 500000]} min={0} max={500000} step={100}/>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12}  className="range-slider-wrapper">
                <label>Price</label>
                <Slider range allowCross={false} defaultValue={[0, 500000]} min={0} max={500000} step={100}/>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={12} className="range-slider-wrapper">
                <label>Year</label>
                <Slider range allowCross={false} defaultValue={[0, moment().year()]} min={1970} max={moment().year()}
                        step={1}/>
              </Col>
            </Row>
          </Col>
        </Row>

        {this.state.showAdvancedSearch ? (<Row id="advanceSearch" aria-expanded="false">
          <Col md={12}>

            <Row>
              <Col md={8}>
                <Row>
                  <Col md={12} className="range-slider-wrapper">
                    <label>Colors</label><br />
                    <ButtonGroup md={1} options={colors} shape="circle"/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12} className="range-slider-wrapper">
                    <label>Petrol consumption</label><br />
                    <Slider range allowCross={false} defaultValue={[0, 20]} min={0} max={20} step={0.1}/>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Row>
                  <Col md={12} className="range-slider-wrapper">
                    <label>Features</label>
                    <ButtonGroup md={3} options={features}/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12} className="range-slider-wrapper">
                    <label>Horse power</label>
                    <Slider range allowCross={false} defaultValue={[0, 500]} min={0} max={500} step={1}/>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Row>
                  <Col md={12}  className="range-slider-wrapper">
                    <label>Doors</label><br />
                    <ButtonGroup md={2} options={doors} shape="circle"/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12}  className="range-slider-wrapper">
                    <label>Seats</label><br />
                    <ButtonGroup md={2} options={seats} shape="circle"/>
                  </Col>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <Col md={12}  className="range-slider-wrapper">
                    <label>Transmission</label><br />
                    <ButtonGroup md={8} options={transmissions}/>
                  </Col>
                </Row>
              </Col>
            </Row>

          </Col>
        </Row>) : ""}

        <div className="row">
          <div className="col-md-12">
            <div className="text-right">
              <button className="btn btn-link fk-filter-advance" role="button" data-toggle="collapse"
                      data-target="#advanceSearch" aria-expanded="false" aria-controls="collapseExample"
                      onClick={e => this.toggleAdvanced(!this.state.showAdvancedSearch)}>
                <span className="more glyphicon glyphicon-plus"></span>
                <span className="less glyphicon glyphicon-minus"></span>
                ADVANCED FILTERS
              </button>

              <Button className="btn btn-info sk-btn--search" onClick={this.search}>
                <span className="glyphicon glyphicon-search"></span>
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/*<!-- SEARCH RESULTS -->*/}
      <label>
        {/*{{$ctrl.searchedCars.length}} {{$ctrl.searchedCars.length === 1 ? 'beauty' : 'beauties'}} found*/}
      </label>
      {/*<image-grid values="$ctrl.searchedCars"></image-grid>*/}
    </div>)
  }
}

export default CarSearch;
