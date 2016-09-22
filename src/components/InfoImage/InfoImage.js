/**
 * Created by jevgenir on 17/09/2016.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InfoImage.css';

class InfoImage extends React.Component {
  render() {
    return (<div className={s.info_image}>
      <a href={this.props.href}>
        <img src={this.props.src} className={s.info_image__image} />
      </a>

      <div className={s.info_image__info_panel_bg}>
      </div>

      <div className={s.info_image__info_panel}>
        {this.props.children}
      </div>
    </div>);
  }
}

export default withStyles(s)(InfoImage);
