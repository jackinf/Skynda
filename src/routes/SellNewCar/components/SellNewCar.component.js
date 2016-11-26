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

export const selectRenderer = (items, onChange) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label htmlFor={input.name}>{label}</label>
      <Select name={input.name} value={input.value} options={items} onChange={value => onChange(input.name, value)}/>
    </Col>
  </Row>
);

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

  setField = (name, value) => {
    this.props.dispatch(change("sellNewCarForm", name, value));
  };

  render() {
    const vehicleManufacturers = !this.props.manufacturer.isFetching
      ? this.props.manufacturer.items.map(item => ({label: item.name, value: item.value}))
      : [];
    const vehicleModels = !this.props.vehicleModels.isFetching
      ? this.props.vehicleModels.items.map(item => ({label: item.title + " " + item.modelCode, value: item.modelCode}))
      : [];
    const colors = !this.props.color.isFetching
      ? this.props.color.items.map(item => ({label: item.name, value: item.value}))
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

                {this.props.vehicleModels.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="model.id"
                                              label="Auto mudel *"
                                              component={selectRenderer(vehicleModels, this.setField)}/>)}

                {rowWrapper(<Field name="" component={TextField} hintText="Läbisõit kilomeetrites"/>)}

                {rowWrapper(<Field name="" component={TextField} hintText="Käigukasti tüüp"/>)}

                {rowWrapper(<Field name="" component={TextField} hintText="Mootori tüüp ja maht"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Vedav sild"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Uksi"/>)}
                {rowWrapper(<Field name="" component={TextField} hintText="Istekohti"/>)}

                {this.props.vehicleModels.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="colorInside.id"
                                              label="Kere värv"
                                              component={selectRenderer(colors, this.setField)}/>)}

                {this.props.vehicleModels.isFetching
                  ? "Fetching"
                  : rowWrapperCentered(<Field name="colorOutside.id"
                                              label="Salongi värv"
                                              component={selectRenderer(colors, this.setField)}/>)}

                {/*{rowWrapper(<Field name="" component={TextField} hintText="Kere värv"/>)}*/}
                {/*{rowWrapper(<Field name="" component={TextField} hintText="Salongi värv"/>)}*/}

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
