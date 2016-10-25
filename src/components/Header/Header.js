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
import {Row, Col} from "react-bootstrap";

class Header extends React.Component {
  render() {
    return (
      <div className='container header-container'>
        <LocaleContainer/>
        <Row>
            <nav className='sk-navbar navbar navbar_default aligner'>
              <Col md={4} >
                  <a className='sk_logo' href='/'>
                    <img className='pull-left' src={image1}/>
                    <img src={image2}/>
                  </a>
              </Col>
              <Col md={8}>
                <div id='navbar' className='navbar_collapse'>
                  <ul className='nav navbar_nav sk-menu pull-right'>
                    <li className='sk_menu__sell'>
                      <a href='#' onClick={e => this.sellCar(e)} className='orange_header'>
                        <Translate value="components.header.sell_car_txt"/>
                      </a>
                    </li>
                    <li className='sk_menu__buy'>
                      <a href='/search' >
                        <Translate value="components.header.buy_car_txt"/>
                      </a>
                    </li>
                    <li className='sk_menu__about'>
                      <a href='/search' className='dark_header'>
                        <Translate value="components.header.about_us"/>
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
            </nav>
        </Row>

      </div>);
  }
}

export default Header;
