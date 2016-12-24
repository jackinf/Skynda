import React from "react";
import "./About.scss";

// 3rd party
import {Row, Col} from "react-bootstrap";

// Images
import imageLogo from "./../assets/skynda logo 4-mask-8@2x.png.png";
import imageGoogle from "./../assets/Google Maps@2x.png.png";
import imageTelia from "./../assets/image-mask-6@2x.png.png";
import imageVunk from "./../assets/group@2x.png.png";

// Components
import AboutSkblock from "./AboutSkblock";

export class About extends React.Component {
  static propTypes = {
    loadDescription: React.PropTypes.func.isRequired,
    loadPeople: React.PropTypes.func.isRequired,

    people: React.PropTypes.array,
    description: React.PropTypes.string,
  };

  componentWillMount() {
    this.props.loadDescription();
    this.props.loadPeople();
  }

  render() {
    const personBlockFn = (person, i) => (<Col key={i} md={3} className='about__person-block'>
        <img className='about__person-image' src={person.imageUrl} alt=''/>
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
            <Col md={12} style={{marginLeft: "-14px"}}>
              {this.props.description}
            </Col>
          </AboutSkblock>

          {this.props.people.length > 0
            ? (<AboutSkblock header='Skynda Tiim'>
                  <Row>
                    {this.props.people.map((person, i) => personBlockFn(person, i))}
                  </Row>
                </AboutSkblock>)
            : <h2>Is loading</h2>}
        </Col>

        <Col md={4}>
          <div className='well about__our-contacts'>
            <h4 className='about__our-contacts-header'>Meie kontaktid</h4>

            <Row>
              <img src={imageLogo} alt='logo'/>
            </Row>

            <br />

            <Row>
              Skynda AS
            </Row>

            <br />

            <Row>
              <img src={imageGoogle} alt='google'/>
            </Row>

            <br />

            <Row>
              Valge tn 16<br />19095 Tallinn<br />Eesti Vabariik
            </Row>

            <Row>
              <span className='about__email'>hello@skynda.me</span>
              <br />
            </Row>

            <Row>
              +372 5144 750
            </Row>

            <h4 className='about__our-contacts-header'>Partnerid</h4>

            <Row>
              <img src={imageTelia} alt=''/>
            </Row>

            <br />

            <Row>
              <img src={imageVunk} alt=''/>
            </Row>
          </div>
        </Col>
      </Row>
    </div>);
  }
}

About.propTypes = {
  people: React.PropTypes.array,
  description: React.PropTypes.string.isRequired,
  loadDescription: React.PropTypes.func.isRequired,
  loadPeople: React.PropTypes.func.isRequired
};

export default About;
