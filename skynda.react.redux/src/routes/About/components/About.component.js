import React from "react";
import "./About.scss";

// 3rd party
import {Row, Col} from "react-bootstrap";
import {Translate} from "react-redux-i18n";

// Images
import imageTelia from "../assets/image-mask-6@2x.png.png";
import imageVunk from "../assets/group@2x.png.png";
import iconFacebook from "../assets/fb-icon-min.png";

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
          <AboutSkblock header={<Translate value="about_us.title_1" />}>
            <Col md={12} style={{marginLeft: "-14px"}}>
              {this.props.description}
            </Col>
          </AboutSkblock>

          {this.props.people.length > 0
            ? (<AboutSkblock header={<Translate value="about_us.title_2_our_team" />}>
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
              Valge tn 16<br />19095 Tallinn<br />Eesti Vabariik
            </Row>

            <Row>
              <span className='about__email'>hello@triven.eu</span>
              <br />
            </Row>

            <Row>
              +372 5884 1553
            </Row>

            <Row>
              <br/>
              <a href={"https://www.facebook.com/triven.eu"} target="_blank">
                <img src={iconFacebook} alt="Facebook" width={32} height={32}/>
              </a>
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
