/**
 * Created by jevgenir on 11/26/2016.
 */
import React from "react";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col, Button} from "react-bootstrap";
import {change} from "redux-form";
import {Parallax} from 'react-parallax';
import LaddaButton, { S, SLIDE_UP } from 'react-ladda';
import {toastr, actions as toastrActions} from 'react-redux-toastr';
import Scroll from "react-scroll";

import "./SellNewCar.component.scss";
import {rowWrapper} from "./SellNewCar.redux-form.renderers";
import heroImageUrl from "../assets/heroimage.jpg";

export default class extends React.Component {
  static propTypes = {
    isSubmitting: React.PropTypes.bool,
    errors: React.PropTypes.object,
    isSuccessfullySent: React.PropTypes.bool
  };

  componentDidMount() {
    setTimeout(() => {window.scrollBy(0, 1);}, 100);  // hack to fix parallax image
  }

  setField = (name, value) => {
    this.props.dispatch(change("sellNewCarForm", name, value));
  };

  setFieldAndLoadModels = (name, value) => {
    this.setField(name, value);
    this.props.getModels(); // todo: search models by value
  };

  handleColorChangeComplete = (name, color, event) => {
    this.props.dispatch(change("sellNewCarForm", name, color.hex))
  };

  componentWillUnmount() {
    toastr.clean(); // hack. Clean toasts so that they would not reappear on next page.
  }

  onSubmit = (values) => {
    this.props.submitAsync(values);
  } ;

  render() {
    const {errors, isSuccessfullySent} = this.props;

    return (<div className="sell-your-car">
      {isSuccessfullySent ? null : (
        <Parallax bgImage={heroImageUrl} strength={250} >
          <div className="sell-your-car__centered sell-your-car__main-image-background2">
            <Row>
              <Col sm={3}/>
              <Col sm={6}>
                <h3 className="sell-your-car__main-image-background__title__line">
                  Ainult Triveniga saad oma auto müüdud arvuti tagant lahkumata ja müügikuulutuse avaldamine on alati tasuta
                </h3>
              </Col>
              <Col sm={3}/>
            </Row>

            <Scroll.Link activeClass="active" to="fill-form-scroll-to" spy={true} smooth={true} offset={50} duration={500}>
              <Button className="how-it-works__main-image-background__secondary-button sell-new-car-image-background__secondary-button">Panen auto müüki</Button>
            </Scroll.Link>
          </div>
        </Parallax>
      )}

      <div className="container">
        {isSuccessfullySent ? (
          <Row>
            <Col sm={12}>
              <h4 style={{marginTop: "25px"}}>Täname! Saime andmed kätte! Võtame Sinuga ühendust ühe tööpäeva jooksul.</h4>
            </Col>
          </Row>
          ) : (
        <Row>
          <Col sm={12}>

            <form className="sell-your-car__centered" onSubmit={this.props.handleSubmit(this.onSubmit)}>

              <br/>

              <Card>
                <CardHeader title={<h3 className="sell-your-car__block-header">Saada meile enda ja oma auto andmed</h3>} textStyle={{paddingRight: "0px"}}/>
                <CardText>
                  <Row style={{marginTop: "-23px"}}>
                    <Col smOffset={3} sm={6}>
                      Võtame Sinuga ühendust 1 tööpäeva jooksul, viime auto ise taustakontrolli, teeme pildid ja valmistame kõik müügiks ette. Peale seda saad meilt sellise hinnapakkumise, millega teame, et saame Su auto müüdud. Kui pakutud hind sobib, hakkamegi kohe autole ostjat otsima.
                    </Col>
                  </Row>
                  <br/>
                  <Scroll.Element name="fill-form-scroll-to" />
                  {rowWrapper(<Field name="fullName" component={TextField} hintText="Sinu nimi *" errorText={errors && errors["fullName"]}/>)}
                  {rowWrapper(<Field name="email" component={TextField} hintText="Sinu e-posti aadress *" type="email" errorText={errors && errors["email"]}/>)}
                  {rowWrapper(<Field name="phone" component={TextField} hintText="Sinu telefoninumber *" errorText={errors && errors["phone"]}/>)}
                  {rowWrapper(<Field name="vehicleRegistrationMark" component={TextField} hintText="Auto registreerimismärk" errorText={errors && errors["vehicleRegistrationMark"]}/>)}

                  {rowWrapper(<LaddaButton
                    loading={this.props.isSubmitting}
                    className={"btn sell-your-car__button-submit"}
                    data-color="#eee"
                    data-size={S}
                    data-style={SLIDE_UP}
                    data-spinner-size={30}
                    data-spinner-color="#ddd"
                    data-spinner-lines={12}
                  >
                    Submit
                  </LaddaButton>)}
                </CardText>
            </Card>

          </form>

          </Col>
        </Row>)}
      </div>

    </div>);
  }
}
