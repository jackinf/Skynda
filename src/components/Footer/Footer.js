/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";
import "./Footer.scss";
import {Link} from "react-router";
import translations from "../../store/locales/en";

function Footer() {
  return (
    <div className='footer-root'>
      <div className='container footer-container'>
        <span className='text'>{translations.components.footer.your_company}</span>
        <span className='spacer'>·</span>
        <span>{translations.components.footer.address}</span>
        <span className='spacer'>·</span>
        <Link className='link' to='/privacy'>{translations.components.footer.email}</Link>
        <span className='spacer'>·</span>
        <span className='text'>{translations.components.footer.phone}</span>
      </div>
    </div>
  );
}

export default Footer;
