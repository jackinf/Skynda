/**
 * Created by jevgenir on 11/26/2016.
 */
import React from "react";
import "./SellNewCar.component.scss";
import {rowWrapper} from "./helpers";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {Row, Col, Button} from "react-bootstrap";

export default class extends React.Component {
  componentDidMount() {
    this.props.getModels();
    this.props.getManufacturers();
    this.props.getColors();
    this.props.getFeatures();
    this.props.getFuels();
    this.props.getTransmissions();
    this.props.getDrivetrains();
  }

  render() {
    return (<div className="sell-your-car">
      <div className="sell-your-car__centered sell-your-car__main-image-background">
        <h3 className="sell-your-car__main-image-background__title">Skynda aitab sinu autole ostja leida</h3>
        <Button className="sell-your-car__main-image-background__button">Panen auto müüki</Button>
      </div>

      <div className="container">
        <Row>
          <Col sm={12}>

            <form className="sell-your-car__centered">
              <div>
                {rowWrapper(<h3 className="sell-your-car__block-header">Sinu andmed</h3>)}

                {rowWrapper(<Field name="user_fullname" component={TextField} hintText="Sinu nimi *"/>)}
                {rowWrapper(<Field name="user_email" component={TextField} hintText="Sinu e-posti aadress *" type="email"/>)}
                {rowWrapper(<Field name="user_phone" component={TextField} hintText="Sinu telefoninumber *"/>)}
              </div>

              <div>
                {rowWrapper(<h3 className="sell-your-car__block-header">Sinu auto andmed</h3>)}

                {rowWrapper(<Field name="" component={TextField} hintText="Auto mark *"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Auto mudel *"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Läbisõit kilomeetrites"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Käigukasti tüüp"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Mootori tüüp ja maht"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Vedav sild"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Uksi"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Istekohti"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Kere värv"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Salongi värv"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Ostetud riigist"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Lisavarustus (features?)"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Registrinumber"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="VIN kood *"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Kütuse liik"/>)}

                {rowWrapper(<Button className="sell-your-car__button-submit"
                                    onClick={e => this.props.submitAsync(e)}>Saadan Skyndale</Button>)}
              </div>
            </form>

          </Col>
        </Row>
      </div>

    </div>);
  }
}
