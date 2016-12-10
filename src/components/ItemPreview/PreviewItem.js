import React from "react";
import "./PreviewItem.scss";
import {Translate, Localize} from 'react-redux-i18n';
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router";

class CarPreview extends React.Component {
  render() {
    const {id, mainImage, model, price, mileage, comment} = this.props.vehicle;

    return (<div className='car-preview'>
      <Link to={"/details/" + id}>
        <img src={mainImage.url} className='car-preview__image'/>
      </Link>

      <div className='car-preview__info-panel-bg'/>

      <div className='car-preview__info-panel'>
        <Row className='car-preview__info-panel-primary-row'>
          <Col sm={7}>{model.year} {model.vehicleManufacturer.name}</Col>
          <Col sm={5}><span style={{margin: "0 0 0 12px"}}>{price} EUR</span></Col>
        </Row>
        <Row>
          <Col sm={7}><span style={{margin: "0 25px 0 0"}}>{"2.0"} ({model.horsePower} kW)</span></Col>
          <Col sm={5}><span style={{margin: "0 25px 0 12px"}}><Localize value={mileage}/> km</span></Col>
        </Row>
        <Row>
          <Col sm={7}> <span style={{margin: "0 25px 0 0"}}>{model.doors} <Translate
            value="components.car_preview.doors"/></span></Col>
          <Col sm={5}><span style={{margin: "0 0 0 12px"}}>{model.seats} <Translate
            value="components.car_preview.seats"/></span></Col>
        </Row>

        <Row>
          <Col sm={12}>{comment}</Col>
        </Row>

      </div>
    </div>);
  }
}

CarPreview.propTypes = {
  vehicle: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    mainImage: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired
    }),
    model: React.PropTypes.shape({
      year: React.PropTypes.number.isRequired,
      seats: React.PropTypes.number,
      doors: React.PropTypes.number,
      vehicleManufacturer: React.PropTypes.shape({
        name: React.PropTypes.string
      }),
      horsePower: React.PropTypes.number
    }),
    price: React.PropTypes.number.isRequired,
    mileage: React.PropTypes.number.isRequired,
    // engine: React.PropTypes.string,
    comment: React.PropTypes.string
  }).isRequired
};

export default CarPreview;
