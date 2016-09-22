/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import './Home.scss';

import {InputGroup, InputGroupButton, Input, Button} from 'reactstrap';

import ImageGrid from '../../components/ImageGrid/ImageGrid';
import image_testcar from '../../static/images/cars/accord/accord.jpg';

import Hero from './components/Home.hero';
import Keypoints from './components/Home.keypoints';

// List of rows
const cars = {
  searchResults: [],
  recentlyAdded: [[
    {src: image_testcar, href: '/details', title: 'one', description: 'awesome car'},
    {src: image_testcar, href: '/details', title: 'two', description: 'awesome car'},
    {src: image_testcar, href: '/details', title: 'three', description: 'awesome car'},
    {src: image_testcar, href: '/details', title: 'four', description: 'awesome car'},
    {src: image_testcar, href: '/details', title: 'five', description: 'awesome car'},
    {src: image_testcar, href: '/details', title: 'six', description: 'awesome car'}
  ]]
};

class Home extends React.Component {

  constructor(){
    super();
    this.executeSearch = this.executeSearch.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);

    this.state = {searchText: '', isSearching: false};
  }

  executeSearch() {
    this.setState({isSearching: true});
    setTimeout(() => {
      cars.searchResults.length = 0;
      cars.searchResults.push([
        {src: image_testcar, href: '/details', title: 'one', description: 'awesome car'},
        {src: image_testcar, href: '/details', title: 'two', description: 'awesome car'}
      ]);
      this.setState({isSearching: false});
     }, 2000);
  }

  updateSearchText(text) {
    this.setState({searchText: text});
  }

  render() {
    return (
      <div>

        <Hero />
        <br />

        <div className="container">

          <Keypoints />
          <br />
          <br />

          {
            /**
             * SEARCH
             */
          }
          <div className="row">
            <div className="col-sx-12">
              <h2 className="primary-header-2 text-center">Search</h2>
            </div>

            <div className="row">
              <div className="col-md-6 col-md-offset-3 offset-md-3">
                <div className="input-group sk_search">
                  <InputGroup>
                    <Input placeholder="Enter a car name" style={{padding: "17px"}}
                           onChange={e => this.updateSearchText(e.target.value)}/>
                    <InputGroupButton>
                      <Button className="primary-button" onClick={this.executeSearch}>Search</Button>
                    </InputGroupButton>
                  </InputGroup>
                </div>
              </div>
            </div>
          </div>

          <br />

          {/*<h2 ng-show="cars.found.length > 0">*/}
          {/*Total found: {{cars.found.length}}*/}
          {/*</h2>*/}
          {/*<image-grid ng-if="cars.found.length > 0" values="cars.found"></image-grid>*/}

          {
            /**
             * SEARCH RESULTS
             */
          }

          {this.state.isSearching
            ? (<div className="row">Searching</div>) : cars.searchResults.length > 0
            ? (<div className="row">
                <div className="col-sx-12">
                  <h2 className="primary-header-2 text-center">Found: {cars.searchResults[0].length}</h2>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <ImageGrid rows={cars.searchResults}/>
                  </div>
                </div>
              </div>) : (<div className="row"></div>)}


          {/*<div className="row" ng-show="cars.found.length > 0">*/}
          {/*<button className="btn btn-white pull-right" ng-click="showAdvancedSearch()">Show advanced search</button>*/}
          {/*</div>*/}

          <br />

          {
            /**
              * RECENTLY ADDED
              */
          }
          <div className="row">
            <div className="row">
              <div className="col-sx-12">
                <h2 className="primary-header-2 text-center">Recently Added</h2>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <ImageGrid rows={cars.recentlyAdded}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

// Home.propTypes = {
//   news: PropTypes.arrayOf(PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     link: PropTypes.string.isRequired,
//     contentSnippet: PropTypes.string,
//   })).isRequired,
// };

export default Home;
