import React from "react";
import "./PreviewItem.scss";
import {Translate, Localize} from 'react-redux-i18n';
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router";

class CarPreview extends React.Component {
  render() {
    const {id, thumbnailUrl, price, mileage, comment, vehicleManufacturerName} = this.props.vehicle;
    let mainImage = this.props.vehicle.mainImage;
    let model = this.props.vehicle.model;

    const localizedMileage = <Localize value={mileage}/>;
    const doorsText = <Translate value="components.car_preview.doors"/>;
    const seatsText = <Translate value="components.car_preview.seats"/>;
    return (<div className='car-preview'>
      <Link to={"/details/" + id}>
        <img src={thumbnailUrl ? thumbnailUrl : mainImage ? mainImage.url : ""} className='car-preview__image'/>
      </Link>

      <div className='car-preview__info-panel-bg'/>

      {model ? (
          <div className='car-preview__info-panel'>
            <Row className='car-preview__info-panel-primary-row'>
              <Col sm={7}>{model.year} {vehicleManufacturerName}</Col>
              <Col sm={5} className="align-right">{price} EUR</Col>
            </Row>
            <Row>
              <Col sm={7}><span >{"2.0"} ({model.horsePower} kW)</span></Col>
              <Col sm={5} className="align-right">{localizedMileage} km</Col>
            </Row>
            <Row>
              <Col sm={7}> {model.doors} {doorsText}</Col>
              <Col sm={5} className="align-right">{model.seats} {seatsText}</Col>
            </Row>

            <Row>
              <Col sm={12}>{comment}</Col>
            </Row>

          </div>
        ): (
          <div className='car-preview__info-panel'>
            <Row className='car-preview__info-panel-primary-row'>
              <Col sm={7}>{this.props.vehicle.modelYear} {vehicleManufacturerName}</Col>
              <Col sm={5} className="align-right">{price} EUR</Col>
            </Row>
            <Row>
              <Col sm={7}><span >{"2.0"} ({this.props.vehicle.modelHorsePower} kW)</span></Col>
              <Col sm={5} className="align-right">{localizedMileage} km</Col>
            </Row>
            <Row>
              <Col sm={7}> {this.props.vehicle.modelDoors} {doorsText}</Col>
              <Col sm={5} className="align-right">{this.props.vehicle.modelSeats} {seatsText}</Col>
            </Row>

            <Row>
              <Col sm={12}>{comment}</Col>
            </Row>

          </div>
        )}
    </div>);
  }
}

CarPreview.propTypes = {
  vehicle: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    thumbnailUrl: React.PropTypes.string.isRequired,
    modelYear: React.PropTypes.number.isRequired,
    modelSeats: React.PropTypes.number,
    modelDoors: React.PropTypes.number,
    modelHorsePower: React.PropTypes.number,
    vehicleManufacturerName: React.PropTypes.string,
    price: React.PropTypes.number.isRequired,
    mileage: React.PropTypes.number.isRequired,
    // engine: React.PropTypes.string,
    comment: React.PropTypes.string
  }).isRequired
};

export default CarPreview;
