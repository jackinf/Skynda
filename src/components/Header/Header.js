/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import "./Header.scss";

import image1 from "./../../static/images/standard/skynda logo 4-mask-4@2x.png";
import image2 from "./../../static/images/standard/SKYNDA@2x.png";
import LocaleContainer from "../Locale/LocaleContainer";
import {Translate} from 'react-redux-i18n';


class Header extends React.Component {
  render() {
    return (
      <div className='container header-container'>
        <nav className='sk_navbar navbar navbar_default'>
          <div className='navbar_header'>
            <a className='sk_logo navbar_brand' href='/'>
              <img className='pull-left' src={image1}/>
              <img src={image2}/>
            </a>
          </div>
          <div>
            <LocaleContainer />
          </div>
          <div id='navbar' className='navbar_collapse collapse'>
            <ul className='nav navbar-nav pull-right'>
              <li className='sk_menu__sell'>
                <a href='#' onClick={e => this.sellCar(e)} className='orange_header'>
                  <Translate value="components.header.sell_car_txt"/>
                </a>
              </li>
              <li className='sk_menu__buy'>
                <a href='/search' className='blue_header'>
                  <Translate value="components.header.buy_car_txt"/>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
