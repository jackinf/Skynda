/**
 * Created by jevgenir on 11/26/2016.
 */
import React from "react";
import "./SellNewCar.component.scss";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col, Button} from "react-bootstrap";
import {change} from "redux-form";
import {Parallax} from 'react-parallax';
import {
  rowWrapper,
  rowWrapperCentered,
  selectRenderer,
  buttonRenderer,
  circleButtonRenderer,
  ColorRenderer
} from "./SellNewCar.redux-form.renderers";
import heroImageUrl from "../assets/heroimage.jpg";
import {toastr, actions as toastrActions} from 'react-redux-toastr';
import Scroll from "react-scroll";


var scroll = Scroll.animateScroll;

const additionalInfoCard = (props, vehicleModels, drivetrains, transmissions, features, fuels) => (<Card>
    <CardHeader title={<h3 className="sell-your-car__block-header">Sinu auto andmed</h3>} />
    <CardText>
      {props.manufacturer.isFetching
        ? "Fetching"
        : rowWrapperCentered(<Field name="manufacturer.id"
                                    label="Auto mark *"
                                    component={selectRenderer(vehicleManufacturers, this.setFieldAndLoadModels)}/>, 4)}

      {props.vehicleModels.isFetching || vehicleModels.length <= 0
        ? ""
        : rowWrapperCentered(<Field name="model.id"
                                    label="Auto mudel *"
                                    component={selectRenderer(vehicleModels, this.setField)}/>, 4)}

      {rowWrapper(<Field name="mileage" component={TextField} hintText="Läbisõit kilomeetrites"/>)}

      {props.drivetrain.isFetching
        ? "Fetching"
        : rowWrapperCentered(<Field name="drivetrain.id"
                                    label="Käigukasti tüüp"
                                    component={buttonRenderer(drivetrains, this.setField)}/>, 10)}

      {rowWrapper(<Field name="" component={TextField} hintText="Mootori tüüp ja maht"/>)}

      {props.transmission.isFetching
        ? "Fetching"
        : rowWrapperCentered(<Field name="transmission.id"
                                    label="Vedav sild"
                                    component={buttonRenderer(transmissions, this.setField)}/>, 8)}

      {rowWrapperCentered(<Field name="doors"
                                 label="Uski"
                                 component={circleButtonRenderer([1, 2, 3, 4, 5], this.setField)}/>)}

      {rowWrapperCentered(<Field name="seats"
                                 label="Istekohti"
                                 component={circleButtonRenderer([1, 2, 3, 4, 5], this.setField)}/>)}

      {rowWrapperCentered(<Field name="colorOutside"
                                 label="Kere värv"
                                 onChangeComplete={this.handleColorChangeComplete}
                                 component={ColorRenderer} />)}

      {rowWrapperCentered(<Field name="colorInside"
                                 label="Salongi värv"
                                 onChangeComplete={this.handleColorChangeComplete}
                                 component={ColorRenderer} />)}

      {rowWrapper(<Field name="" component={TextField} hintText="Ostetud riigist"/>)}

      {props.feature.isFetching
        ? "Fetching"
        : rowWrapperCentered(<Field name="features"
                                    label="Lisavarustus"
                                    component={selectRenderer(features, this.setField, true)}/>, 4)}

      {rowWrapper(<Field name="" component={TextField} hintText="Registrinumber"/>)}
      {rowWrapper(<Field name="" component={TextField} hintText="VIN kood *"/>)}

      {props.fuel.isFetching
        ? "Fetching"
        : rowWrapperCentered(<Field name="fuel.id"
                                    label="Kütuse liik"
                                    component={selectRenderer(fuels, this.setField)}/>, 4)}


    </CardText>

  </Card>);

export default class extends React.Component {
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

      <div className="container">
        {!isSuccessfullySent ? (
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
                <CardHeader title={<h3 className="sell-your-car__block-header">Saada meile enda ja oma auto andmed</h3>} />
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

                  {rowWrapper(<input type="submit" className="btn sell-your-car__button-submit" value={"Saadan"} />)}
                </CardText>
            </Card>

              </form>

          </Col>
        </Row>)}
      </div>

    </div>);
  }
}
