/**
 * Created by jevgenir on 17/09/2016.
 */

import React from "react";
import "./InfoImage.scss";

class InfoImage extends React.Component {
  render() {
    return (<div className={'info_image'}>
      <a href={this.props.href}>
        <img src={this.props.src} className={'info_image__image'}/>
      </a>

      <div className={'info_image__info_panel_bg'}/>

      <div className='info_image__info_panel'>
        {this.props.children}
      </div>
    </div>);
  }
}

InfoImage.propTypes = {
  src: React.PropTypes.string,
  href: React.PropTypes.string,
  children: React.PropTypes.array
};

export default InfoImage;
