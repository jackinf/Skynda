/**
 * Created by jevgenir on 17/09/2016.
 */

import React from 'react';
import './CarSearch.scss';

import {Button, Row, Col} from 'react-bootstrap';
import Slider from 'rc-slider';
import moment from 'moment';

// import a from 'react-icons/md/done.js';
let IconBase = require('react-icon-base');
class MdDone extends React.Component {
  render() {
    return (
      <IconBase viewBox="0 0 40 40" {...this.props}>
        <g><path d="m15 27l17.7-17.7 2.3 2.3-20 20-9.3-9.3 2.3-2.3z"/></g>
      </IconBase>
    );
  }
}

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

class ButtonGroup extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle(option) {
    option.toggled = !option.toggled;
    if (option.id === -1 && option.toggled)
      this.toggleAll(option.toggled);
    this.forceUpdate();
  };

  toggleAll(value) {
    for (var i = 0; i < this.props.options.length; i++) {
      var option = this.props.options[i];
      option.toggled = value;
    }
  }

  render() {
    var mdCol = this.props.md ? this.props.md : 2;
    var smCol = this.props.sm ? this.props.sm : 3;

    return (<div className="btn-group list-inline">
      {this.props.options.map((option, key) => (<Col md={mdCol} sm={smCol} key={key} className="btn-group__element">
        <Button style={option.style ? option.style : this.props.shape==='circle' ? {} : {width: "100%"}}
                className={this.props.shape==='circle' ? 'btn-group__circle': ""}
                bsStyle={(!option.toggled ? "default": "primary")}
                onClick={e => this.toggle(option)}>
          {option.hideName ? <MdDone /> : option.name}
        </Button>
      </Col>))}
    </div>);
  }
}

class AdvancedSearch extends React.Component {
  constructor() {
    super();
    this.state = {showAdvancedSearch: true};
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
          <label>Brand</label>
          <ButtonGroup options={brands}/>
        </Row>

        <Row>
          <Col md={4}>
            <div className="range-slider-wrapper">
              <label>Mileage</label>
              <Slider range allowCross={false} defaultValue={[0, 500000]} min={0} max={500000} step={100}/>
            </div>
          </Col>
          <Col md={4}>
            <div className="range-slider-wrapper">
              <label>Price</label>
              <Slider range allowCross={false} defaultValue={[0, 500000]} min={0} max={500000} step={100}/>
            </div>
          </Col>
          <Col md={4}>
            <div className="range-slider-wrapper">
              <label>Year</label>
              <Slider range allowCross={false} defaultValue={[0, moment().year()]} min={1970} max={moment().year()} step={1}/>
            </div>
          </Col>
        </Row>

        {this.state.showAdvancedSearch ? (<Row id="advanceSearch" aria-expanded="false">
            <Row>
              <Col md={8}>
                <Row>
                  <label>Colors</label>
                  <ButtonGroup md={1} options={colors} shape="circle"/>
                </Row>
              </Col>
              <Col md={4}>
                <div className="range-slider-wrapper">
                  <label>Petrol consumption</label>
                  <Slider range allowCross={false} defaultValue={[0, 20]} min={0} max={20} step={0.1}/>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={8}>
                <Row>
                  <label>Features</label>
                  <ButtonGroup md={3} options={features}/>
                </Row>
              </Col>
              <Col md={4}>
                <div className="range-slider-wrapper">
                  <label>Horse power</label>
                  <Slider range allowCross={false} defaultValue={[0, 500]} min={0} max={500} step={1}/>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Row>
                  <label>Doors</label>
                  <ButtonGroup md={2} options={doors}  shape="circle"/>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <label>Seats</label>
                  <ButtonGroup md={2} options={seats}  shape="circle"/>
                </Row>
              </Col>
              <Col md={4}>
                <Row>
                  <label>Transmission</label>
                  <ButtonGroup md={6} options={transmissions} />
                </Row>
              </Col>
            </Row>
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

export default AdvancedSearch;
