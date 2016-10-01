/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import "./Footer.scss";
// import Link from '../Link';
import { Link } from "react-router";
import translations from "../../store/locales/en";

function Footer () {
  return (
    <div className='root'>
      <div className='container footer-container'>
        <span className='text'>{translations.components.footer.your_company}</span>
        <span className='spacer'>·</span>
        <Link className='link' to='/'>{translations.components.footer.home}</Link>
        <span className='spacer'>·</span>
        <Link className='link' to='/privacy'>{translations.components.footer.privacy}</Link>
        <span className='spacer'>·</span>
        <Link className='link' to='/not-found'>{translations.components.footer.not_found}</Link>
      </div>
    </div>
  );
}

export default Footer;
