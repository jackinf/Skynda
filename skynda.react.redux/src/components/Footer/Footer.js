import React from "react";
import "./Footer.scss";
import {Link} from "react-router";
import { Translate  } from 'react-redux-i18n';

function Footer() {
  return (
    <div className='footer-root'>
      <div className='container footer-container'>
        <span className='text'><Translate value="components.footer.your_company"/></span>
        <span className='spacer'>·</span>
        <span className='link'><Translate value="components.footer.email"/></span>
        <span className='spacer'>·</span>
        <span className='text'><Translate value="components.footer.phone"/></span>
        <span className='spacer'>·</span>
        <Link className='link' to='/privacy'><Translate value="components.footer.agreement"/></Link>
      </div>
    </div>
  );
}

export default Footer;
