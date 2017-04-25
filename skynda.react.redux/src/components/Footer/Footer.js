import React from "react";
import "./Footer.scss";
import {Link} from "react-router";
import { Translate  } from 'react-redux-i18n';
import iconFacebook from "./assets/fb-icon-min.png";

function Footer() {
  return (
    <div style={{paddingTop: "60px"}}>
      <div className='footer-root'>
        <div className='container footer-container'>
          <span className='text'><Translate value="components.footer.your_company"/></span>
          <span className='spacer'>·</span>
          <span className='link'><Translate value="components.footer.email"/></span>
          <span className='spacer'>·</span>
          <span className='text'>+372 5884 1553</span>
          <span className='spacer'>·</span>
          <span className='link'>
            <a href={"https://www.facebook.com/triven.eu"} target="_blank">
              <img src={iconFacebook} alt="Facebook" width={32} height={32}/>
            </a>
          </span>
          <span className='spacer'>·</span>
          <Link className='link' to='/privacy'><Translate value="components.footer.agreement"/></Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;
