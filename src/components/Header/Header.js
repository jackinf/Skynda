/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import './Header.scss';
// import Link from '../Link';
// import Navigation from '../Navigation';

import image_1 from './../../static/images/standard/skynda logo 4-mask-4@2x.png';
import image_2 from './../../static/images/standard/SKYNDA@2x.png';

class Header extends React.Component {

  sellCar = () => {

  };

  render() {
    return (
      <div className="container header-container">

        <nav className="sk_navbar navbar navbar_default">
            <div className="navbar_header">
              <a className="sk_logo navbar_brand" href="/">
                <img className="pull-left" src={image_1} />
                <img src={image_2} />
              </a>
            </div>
            <div id="navbar" className="navbar_collapse collapse">
              <ul className="nav navbar-nav pull-right">
                <li className="sk_menu__sell"><a href="#" onClick={e => this.sellCar(e)} className="orange_header">Sell Your Car</a></li>
                <li className="sk_menu__buy"><a href="/search" className="blue_header">Buy Your Car</a></li>
              </ul>
            </div>
        </nav>

      </div>
    );

  }
}

export default Header;
