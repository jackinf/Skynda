/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import "./Home.scss";

import {Row, Col} from "react-bootstrap";

import CarPreview from "./../../components/CarPreview";
import SearchBlock from "./components/SearchBlock";

// Images
import imageTestcar from "../../static/images/cars/accord/accord.jpg";
// Inner components
import Hero from "./components/Home.hero";
// translation
import translations from "../../store/locales/et";

// List of rows
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
    }
  ]
};

class Home extends React.Component {

  constructor() {
    super();
    this.executeSearch = this.executeSearch.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);

    // TODO: redux
    this.state = {searchText: "", isSearching: false};
  }

  executeSearch() {
    // TODO: redux
    this.setState({isSearching: true});
    setTimeout(() => {
      cars.searchResults.length = 0;
      cars.searchResults.push(cars.recentlyAdded);
      this.setState({isSearching: false});
    }, 2000);
  }

  updateSearchText(text) {
    this.setState({searchText: text});
  }

  render() {
    return (
      <div>

        <Hero/>
        <br/>

        <div className='container'>

          {
            /**
             * SEARCH
             */
          }

          <SearchBlock />

          <br/>

          {
            /**
             * SEARCH RESULTS
             */
          }

          {this.state.isSearching
            ? (<Row>{translations.home_page.searching}</Row>) : cars.searchResults.length > 0
            ? (<Row>
              <Col sm={12}>
                <h2 className='primary-header-2 text-center'>
                  {translations.routes.home_page.found}: {cars.searchResults[0].length}
                </h2>
              </Col>
              <br />
              <Row>
                <Col md={12}>
                  <CarPreview.Grid cars={cars.searchResults}/>
                </Col>
              </Row>
            </Row>) : (<Row/>)}

          <br />

          {
            /**
             * RECENTLY ADDED
             */
          }
          <Row>
            <Row>
              <Col sm={12}>
                <h2 className='primary-header-2 text-center'>{translations.routes.home_page.recently_added}</h2>
              </Col>
              <br />
              <Row>
                <Col md={12}>
                  <CarPreview.Grid cars={cars.recentlyAdded}/>
                </Col>
              </Row>
            </Row>
          </Row>

        </div>
      </div>
    );
  }
}

export default Home;
