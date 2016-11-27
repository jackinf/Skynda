/**
 * Created by jevgenir on 11/26/2016.
 */
import React from "react";
import "./SellNewCar.component.scss";
import {rowWrapper, rowWrapperCentered} from "./helpers";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {Row, Col, Button} from "react-bootstrap";
import Select from "react-select";
import {change} from "redux-form";
import {TwitterPicker} from 'react-color';

const selectRenderer = (items, onChange) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      <Select name={input.name} value={input.value} options={items} onChange={value => onChange(input.name, value)}/>
    </Col>
  </Row>
);

const buttonRenderer = (items, onChange) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
      <br />
      {items.map((item, i) => (<Button key={i}
                                       className={input.value === item.value ? "sell-your-car__button-active" : "sell-your-car__button"}
                                       onClick={e => onChange(input.name, item.value)}>
                                  {item.value}
                                </Button>))}
    </Col>
  </Row>
);

const circleButtonRenderer = (items, onChange) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
      <br />
      {items.map((item, i) => (<Button key={i}
                                       className={input.value === item ? "sell-your-car__circle-button-active" : "sell-your-car__circle-button"}
                                       onClick={e => onChange(input.name, item)}>
                                  {item}
                                </Button>))}
    </Col>
  </Row>
);

const colorRenderer = (onChangeComplete) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
      {input.value
        ? (<div style={{background: input.value}} className="sell-your-car__color-renderer-display">&nbsp;</div>)
        : ""}
      <TwitterPicker onChangeComplete={(color, event) => onChangeComplete(input.name, color, event) }
                     color={input.value}
                     triangle="hide"/>
    </Col>
  </Row>
);

export default class extends React.Component {
  componentDidMount() {
    this.props.getModels();
    this.props.getManufacturers();
    this.props.getFeatures();
    this.props.getFuels();
    this.props.getTransmissions();
    this.props.getDrivetrains();
  }

  setField = (name, value) => {
    this.props.dispatch(change("sellNewCarForm", name, value));
  };

  handleColorChangeComplete = (name, color, event) => {
    this.props.dispatch(change("sellNewCarForm", name, color.hex))
  };

  render() {
    const vehicleManufacturers = !this.props.manufacturer.isFetching
      ? this.props.manufacturer.items.map(item => ({label: item.name, value: item.value}))
      : [];
    const vehicleModels = !this.props.vehicleModels.isFetching
      ? this.props.vehicleModels.items.map(item => ({label: item.title + " " + item.modelCode, value: item.modelCode}))
      : [];
    const features = !this.props.feature.isFetching
      ? this.props.feature.items.map(item => ({label: item.name, value: item.value}))
      : [];
    const fuels = !this.props.fuel.isFetching
      ? this.props.fuel.items.map(item => ({label: item.name, value: item.value}))
      : [];
    const transmissions = !this.props.transmission.isFetching
      ? this.props.transmission.items.map(item => ({label: item.name, value: item.value}))
      : [];
    const drivetrains = !this.props.drivetrain.isFetching
      ? this.props.drivetrain.items.map(item => ({label: item.name, value: item.value}))
      : [];

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

                {this.props.vehicleModels.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="manufacturer.id"
                                              label="Auto mark *"
                                              component={selectRenderer(vehicleManufacturers, this.setField)}/>)}

                {this.props.transmission.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="model.id"
                                              label="Auto mudel *"
                                              component={selectRenderer(vehicleModels, this.setField)}/>)}

                {rowWrapper(<Field name="mileage" component={TextField} hintText="Läbisõit kilomeetrites"/>)}

                {this.props.drivetrain.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="drivetrain.id"
                                              label="Käigukasti tüüp"
                                              component={buttonRenderer(drivetrains, this.setField)}/>)}

                {rowWrapper(<Field name="" component={TextField} hintText="Mootori tüüp ja maht"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Vedav sild"/>)}

                {this.props.transmission.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="transmission.id"
                                              label="Vedav sild"
                                              component={buttonRenderer(transmissions, this.setField)}/>)}

                {rowWrapperCentered(<Field name="doors"
                                           label="Uski"
                                           component={circleButtonRenderer([1, 2, 3, 4, 5], this.setField)}/>)}

                {rowWrapperCentered(<Field name="seats"
                                           label="Istekohti"
                                           component={circleButtonRenderer([1, 2, 3, 4, 5], this.setField)}/>)}

                {rowWrapperCentered(<Field name="colorOutside"
                                           label="Kere värv"
                                           component={colorRenderer(this.handleColorChangeComplete)}/>)}

                {rowWrapperCentered(<Field name="colorInside"
                                           label="Salongi värv"
                                           component={colorRenderer(this.handleColorChangeComplete)}/>)}

                {rowWrapper(<Field name="" component={TextField} hintText="Ostetud riigist"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Lisavarustus (features?)"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Registrinumber"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="VIN kood *"/>)}

                {this.props.fuel.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="fuel.id"
                                              label="Kütuse liik"
                                              component={selectRenderer(fuels, this.setField)}/>)}

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
