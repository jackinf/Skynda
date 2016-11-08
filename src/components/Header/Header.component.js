/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import {Translate} from 'react-redux-i18n';
import {Row, Col, Navbar, Nav, NavItem, NavDropdown, MenuItem} from "react-bootstrap";
import {Link, browserHistory} from "react-router";
import {isLoggedInAs} from "../../utils/userUtils";

// Local imports
import "./Header.scss";
import LocaleContainer from "../Locale/LocaleContainer";

// Images
import image1 from "./../../static/images/standard/skynda logo 4-mask-4@2x.png";
import image2 from "./../../static/images/standard/SKYNDA@2x.png";

class Header extends React.Component {
  sellCar = (e) => {
    alert("Not implemented");
  };

  render() {
    const adminOptions = isLoggedInAs(["admin"])
      ? [<MenuItem eventKey={3.1} onClick={e => browserHistory.push("/admin")}>Admin</MenuItem>]
      : [];

    return (
      <div className='container header-container'>
        <LocaleContainer/>
        <Row>
          <nav className='sk-navbar navbar navbar_default aligner'>
            <Col md={4}>
              <Link className='sk_logo' to='/'>
                <img className='pull-left' src={image1}/>
                <img src={image2}/>
              </Link>
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
                    <Link to="/search">
                      <Translate value="components.header.buy_car_txt"/>
                    </Link>
                  </li>
                  <li className='sk_menu__about'>
                    <Link to="/about">
                      <Translate value="components.header.about_us"/>
                    </Link>
                  </li>

                  {this.props.auth.isLoggedIn ? (
                    <NavDropdown eventKey={3} title={`Hello, ${this.props.auth.user.firstName}!`} id="nav-user-name">
                      <MenuItem eventKey={3.1}>Settings</MenuItem>
                      {adminOptions}
                      <MenuItem divider/>
                      <MenuItem eventKey={3.3} onClick={this.props.submitLogout}>Logout</MenuItem>
                    </NavDropdown>): (
                    <NavDropdown eventKey={3} title={`Hello, guest!`} id="nav-user-name">
                      <MenuItem eventKey={3.1} onClick={e => browserHistory.push("/login")}>Login</MenuItem>
                    </NavDropdown>)}
                </ul>
              </div>
            </Col>
          </nav>
        </Row>

      </div>);
  }
}

export default Header;
