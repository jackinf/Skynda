/**
 * Created by jevgenir on 18/09/2016.
 */

import React from "react";
import "./Home.hero.scss";
import {Button} from "react-bootstrap";
import {browserHistory} from "react-router";
import heroImageUrl from "../../../static/images/standard/hero-01-2.jpg";
import translations from "../../../store/locales/et";

/**
 * Main jumbotron for a primary marketing message or call to action
 */
class Hero extends React.Component {
  constructor() {
    super();

    this.gotoDetails = this.gotoDetails.bind(this);
  }

  gotoDetails() {
    browserHistory.push("details");
  }

  render() {
    return (<div className='sk_hero'>
      <img className='sk_hero__image' src={heroImageUrl} alt='image' />
      <div className='sk_hero__text'>
        <div className='container'>
          <div className='grid'>
            <div className='col-md-9'>
              <h2>{translations.routes.home_page.hero.main_text}</h2>
            </div>
            <div className='col-md-3'>
              <Button className='primary-button' onClick={this.gotoDetails}>{translations.routes.home_page.hero.read_more}</Button>
            </div>
          </div>
        </div>
      </div>

    </div>);
  }
}

export default Hero;
