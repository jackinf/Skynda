import React from "react";
import "./SellNewCar.component.scss";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Parallax} from 'react-parallax';
import {
  rowWrapper,
  rowWrapperCentered,
  selectRenderer,
  buttonRenderer,
  circleButtonRenderer,
  ColorRenderer
} from "./SellNewCar.redux-form.renderers";

export const additionalInfoCard = (props, vehicleModels, drivetrains, transmissions, features, fuels) => (<Card>
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
