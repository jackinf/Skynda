import React from "react";
import {Translate} from 'react-redux-i18n';
import CarPreview from "./../../../../components/CarPreview";
import imageTestcar from "../../../../static/images/cars/accord/accord.jpg";
import {Row, Col} from "react-bootstrap";

// TODO: redux
const cars = {
  searchResults: [],
  recentlyAdded: [
    {
      src: imageTestcar,
      href: "/details",
      year: 2012,
      brand: "Audi",
      price: 12100,
      mileage: 85000,
      engine: "3.0",
      power: "225 kW",
      doors: 4,
      seats: 5,
      comment: "Comes with winter tires"
    },
    {
      src: imageTestcar,
      href: "/details",
      year: 2012,
      brand: "Audi",
      price: 12100,
      mileage: 85000,
      engine: "3.0",
      power: "225 kW",
      doors: 4,
      seats: 5,
      comment: "Comes with winter tires"
    },
    {
      src: imageTestcar,
      href: "/details",
      year: 2012,
      brand: "Audi",
      price: 12100,
      mileage: 85000,
      engine: "3.0",
      power: "225 kW",
      doors: 4,
      seats: 5,
      comment: "Comes with winter tires"
    }
  ]
};
class ResultsComponent extends React.Component {

  render() {
    return (
      <Col md={12}>
        {
          this.props.isSearching
            ? (
            <Row>
              <Translate value="home_page.searching"/>
            </Row>)
            : cars.searchResults.length > 0
            ? (
            <Row>
              <Col sm={12}>
                <h2 className='primary-header-2 text-center'>
                  <Translate value="home_page.found"/> : {cars.searchResults[0].length}
                </h2>
              </Col>
              <br />
              <Row>
                <Col md={12}>
                  <CarPreview.Grid cars={cars.searchResults}/>
                </Col>
              </Row>
            </Row>)
            : ("")
        }

        <br />

        {
          /**
           * RECENTLY ADDED
           */
        }
        <Row>
            <Col sm={12}>
              <h2 className='primary-header-2 text-center'>
                <Translate value="home_page.recently_added"/>
              </h2>
            </Col>
            <br />
            <Row>
              <Col md={12}>
                <CarPreview.Grid cars={cars.recentlyAdded}/>
              </Col>
            </Row>
          </Row>
      </Col>)
  }
}


export default ResultsComponent;
