/**
 * Created by jevgenir on 12/3/2016.
 */
import React from "react";
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {rowWrapper, selectRenderer} from "./helpers";
import {Button} from "react-bootstrap";

export default class VehicleModel extends React.Component {
  componentDidMount() {
    this.props.getDrivetrains();
    this.props.getFuels();
    this.props.getTransmissions();
    // this.props.getVehicleBodies();
    this.props.getManufacturers();
  }

  render() {
    const drivetrains = !this.props.drivetrain.isFetching
      ? this.props.drivetrain.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const fuels = !this.props.fuel.isFetching
      ? this.props.fuel.items.map(item => ({label: item.name, value: item.id}))
      : [];
    const transmissions = !this.props.transmission.isFetching
      ? this.props.transmission.items.map(item => ({label: item.name, value: item.id}))
      : [];
    // const vehicleBodies = !this.props.vehicleBody.isFetching
    //   ? this.props.vehicleBody.items.map(item => ({label: item.name, value: item.id}))
    //   : [];
    const manufacturers = !this.props.manufacturer.isFetching
      ? this.props.manufacturer.items.map(item => ({label: item.name, value: item.id}))
      : [];

    console.log(this.props.vehicleModelInfo);

    return (<div>
      <form>
        {rowWrapper(<Field name="modelCode" component={TextField} hintText="Model Code"/>)}
        {rowWrapper(<Field name="title" component={TextField} hintText="Title"/>)}
        {rowWrapper(<Field name="description" component={TextField} hintText="Description"/>)}
        {rowWrapper(<Field name="doors" component={TextField} type="number" hintText="Doors"/>)}
        {rowWrapper(<Field name="horsepower" component={TextField} hintText="Horse Power"/>)}
        {rowWrapper(<Field name="engine" component={TextField} hintText="Engine"/>)}
        {rowWrapper(<Field name="seats" component={TextField} type="number" hintText="Seats"/>)}
        {rowWrapper(<Field name="year" component={TextField} type="number" hintText="Year"/>)}

        {this.props.drivetrain.isFetching
          ? "Fetching"
          : rowWrapper(<Field name="drivetrain.id"
                              label="Drivetrain *"
                              component={selectRenderer(drivetrains, this.setField)}/>, 4)}

        {this.props.fuel.isFetching
          ? "Fetching"
          : rowWrapper(<Field name="fuel.id"
                              label="Fuel type *"
                              component={selectRenderer(fuels, this.setField)}/>, 4)}

        {this.props.transmission.isFetching
          ? "Fetching"
          : rowWrapper(<Field name="transmissions.id"
                              label="Transmission *"
                              component={selectRenderer(transmissions, this.setField)}/>, 4)}

        {/*{this.props.vehicleBody.isFetching*/}
          {/*? "Fetching"*/}
          {/*: rowWrapper(<Field name="vehicleBody.id"*/}
                              {/*label="Auto mark *"*/}
                              {/*component={selectRenderer(vehicleBodies, this.setField)}/>, 4)}*/}

        {this.props.manufacturer.isFetching
          ? "Fetching"
          : rowWrapper(<Field name="manufacturer.id"
                              label="Manufacturer *"
                              component={selectRenderer(manufacturers, this.setField)}/>, 4)}

        {rowWrapper(<Button onClick={e => this.props.submitAsync(e)}>Submit</Button>)}
      </form>
    </div>)
  }
}
