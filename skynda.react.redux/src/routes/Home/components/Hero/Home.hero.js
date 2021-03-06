import React from "react";
import "./Home.hero.scss";
import {Button} from "react-bootstrap";
import {browserHistory} from "react-router";
// import heroImageUrl from "../../../../static/images/standard/hero-01-2.jpg";
import heroImageUrl from "../../assets/heroimage2.jpg";
import {Translate} from 'react-redux-i18n';
import {Row, Col, Grid} from "react-bootstrap";
import {Parallax} from 'react-parallax';

class Hero extends React.Component {
  render() {
    return (
      <div className='sk_hero'>
        <Parallax bgImage={heroImageUrl} strength={100}>
          <div className="sk-hero__parallax-container">
            <h2>
              <Row>
                <Col sm={8} smOffset={2} xs={10} xsOffset={1} className="sk-hero__header">
                  <Translate value="home_page.hero.main_text_line1"/> <Translate value="home_page.hero.main_text_line2"/>
                </Col>
              </Row>
            </h2>

            <Button className='primary-button read-more-btn' onClick={e => browserHistory.push("/how-it-works")}>
              <Translate value="home_page.hero.read_more"/>
            </Button>
          </div>
        </Parallax>
      </div>);
  }
}

export default Hero;
