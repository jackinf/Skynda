import React, {PropTypes} from "react";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./Navigation.scss";
import Link from "../Link";
import { Translate } from 'react-redux-i18n';

function Navigation({className}) {
  return (
    <div className={cx(s.root, className)} role='navigation'>
      <Link className={s.link} to='/about'><Translate value="components.navigation.about"/></Link>
      <Link className={s.link} to='/contact'><Translate value="components.navigation.contact"/></Link>
      <span className={s.spacer}> | </span>
      <Link className={s.link} to='/login'><Translate value="components.navigation.log_in"/></Link>
      <span className={s.spacer}>or</span>
      <Link className={cx(s.link, s.highlight)} to='/register'><Translate value="components.navigation.sign_up"/></Link>
    </div>
  );
}

Navigation.propTypes = {
  className: PropTypes.string
};

export default withStyles(s)(Navigation);
