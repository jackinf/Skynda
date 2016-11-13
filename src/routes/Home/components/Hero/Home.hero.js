import React from "react";
import "./Home.hero.scss";
import {Button} from "react-bootstrap";
import {browserHistory} from "react-router";
import heroImageUrl from "../../../../static/images/standard/hero-01-2.jpg";
import {Translate} from 'react-redux-i18n';
import {Row, Col, Grid} from "react-bootstrap";

class Hero extends React.Component {
  render() {
    return (
      <div className='sk_hero'>
        <img className='sk_hero__image' src={heroImageUrl} alt='image'/>
        <div className='sk_hero__text'>
          <div className='container'>
            <Row className="aligner grid">
              <Col md={9}>
                <h2>
                  <Translate value="home_page.hero.main_text"/>
                </h2>
              </Col>
              <Col md={3}>
                {/*<h2>*/}
                <Button className='primary-button read-more-btn' onClick={e => browserHistory.push("details/1")}>
                  <Translate value="home_page.hero.read_more"/>
                </Button>
                {/*</h2>*/}
              </Col>
            </Row>
          </div>
        </div>
      </div>);
  }
}

export default Hero;
