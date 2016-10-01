import React from "react";
import "./About.scss";

import { Row, Col } from "react-bootstrap";

import AboutSkblock from "./AboutSkblock";

export class About extends React.Component {
  componentWillMount () {
    this.props.loadDescription();
    this.props.loadPeople();
  }

  render () {
    const personBlockFn = (person, i) => (<Col key={i} md={3} className='about__person-block'>
        <img className='about__person-image' src={person.imageUrl} alt='' />
        <Row>
          <Col md={12}>
            <span className='about__person-name'>{person.name}</span>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <span className='about__person-position'>{person.position}</span>
          </Col>
        </Row>
      </Col>
    );

    return (<div className='container'>
      <Row>
        <Col md={8}>
          <AboutSkblock header='Skynda muudab auto ostmise ja müümise kogemust'>
            <Col md={12}>
              {this.props.description}
            </Col>
          </AboutSkblock>

          {this.props.people.length > 0 ?
            (<AboutSkblock header='Skynda Tiim'>
              <Row>
                {this.props.people.map((person, i) => personBlockFn(person, i))}
              </Row>
            </AboutSkblock>)
            : "Is loading"}
        </Col>

        <Col md={4}>
          <div className='well about__our-contacts'>
            <h4 className='about__our-contacts-header'>Meie kontaktid</h4>

            <Row>
              Skynda AS
            </Row>

            <Row>
              Valge tn 16<br />19095 Tallinn<br />Eesti Vabariik
            </Row>

            <Row>
              hello@skynda.me
            </Row>

            <Row>
              +372 5144 750
            </Row>

            <h4 className='about__our-contacts-header'>Meie kontaktid</h4>
          </div>
        </Col>
      </Row>
    </div>);
  }
}

About.propTypes = {
  people: React.PropTypes.array,
  description: React.PropTypes.string.isRequired
};

export default About;
