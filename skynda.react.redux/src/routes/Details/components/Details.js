import React from "react";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Row, Col} from "react-bootstrap";
import {Link} from "react-router";
import "./Details.scss";
import Skblock from "./BlockContainer";
import Overview from "./Overview";
import Fetaures from "./Features";
import History from "./History";
import PetrolConsumption from "./PetrolConsumption";
import Safety from "./Safety";
import InspectorsReport from "./InspectorsReport/Details.inspectors-report";
import Reviews from "./Reviews";
import VehicleDetailsMainImage from "./MainImage";
import Checkout from "./CheckoutPanel";
import {Translate} from 'react-redux-i18n';
import {StickyContainer, Sticky} from "react-sticky";
import okImageUrl from "../assets/ok-sinine-min.png";
import MultilineText from "../../../components/MultilineText";

class VehicleDetails extends React.Component {

  componentWillMount() {
    this.props.getDataAsync(this.props.params["id"]);
  }

  render() {

    const vehicleData = this.props.car_data;

    if (this.props.isLoading) {
      return (<div><RefreshIndicator size={100} left={200} top={200} status="loading"/></div>);
    }

    if (this.props.isCheckoutSubmitted && this.props.isShowThanksToVehicleId == this.props.params["id"]) {
      const {year, brand, model, engine, horsepower} = vehicleData.vehicleDetailsMainImage;

      return (<div className="car-details__thanks">
        <Row className="car-details__thanks__row1">
          <Col sm={6} smOffset={3}>
            {year} {brand} {model} {engine} ({horsepower} kW)
          </Col>
        </Row>
        <Row className="car-details__thanks__row2">
          <Col sm={6} smOffset={3}>
            <img src={okImageUrl} alt="ok" width={64} height={64}/>
          </Col>
        </Row>
        <Row className="car-details__thanks__row3">
          <Col sm={6} smOffset={3}>
            <h3>Aitäh, saime sinu ostusoovi kätte!</h3>
          </Col>
        </Row>
        <Row className="car-details__thanks__row4">
          <Col sm={6} smOffset={3}>
            Valmistage nüüd ette vajalikud dokumendid ning võtame Sinuga 2 tööpäeva jooksul ühendust.
          </Col>
        </Row>
        <Row className="car-details__thanks__row5">
          <Col sm={6} smOffset={3}>
            Kui Sul on Küsimusi ostuprotsessi kohta, siis paljudele küsimustele leiad vastust
            &nbsp;<Link to="/how-it-works">siit</Link>
          </Col>
        </Row>
        <Row className="car-details__thanks__row6">
          <Col sm={6} smOffset={3}>
            Ootame Sind sõbraks Facebookis - <a href={"https://www.facebook.com/triven.eu"}
                                                target="_blank">triven.eu</a>,
            &nbsp;kus jagame praktilist infot ja nippe autoomanikele.
          </Col>
        </Row>
      </div>);
    }

    return (
      <div className='car-details'>
        <div className='container'>
          <VehicleDetailsMainImage vehicleDetailsMainImage={vehicleData.vehicleDetailsMainImage}/>
        </div>

        <div className='container'>
          <StickyContainer>
            <div className='row'>
              <div className='col col-md-8'>
                <Overview overview={vehicleData.overview}/>

                <Row>
                  <Col md={12}>
                    <label className="sk_details__label">
                      <Translate value="details.components.history.vin"/>:
                    </label>
                    <span>  {vehicleData.history.vinCode}</span>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <label className="sk_details__label">
                      <Translate value="details.components.history.registration_plate"/>:
                    </label>
                    <span>  {vehicleData.history.registrationNumber}</span>
                  </Col>
                </Row>

                <PetrolConsumption petrolConsumption={vehicleData.petrolConsumption}/>

                <InspectorsReport
                  report={vehicleData.report}
                  sendQuestionByEmailAsync={this.props.sendQuestionByEmailAsync}/>

                {vehicleData.descriptions.map((description, i) =>
                  <Skblock key={i} header={description.title}>
                    <MultilineText value={description.content}/>
                  </Skblock>)
                }

                <Fetaures features={vehicleData.features}/>

                <History history={vehicleData.history}/>

                <Safety stars={vehicleData.safetyStars}
                        safetyUrl={vehicleData.safetyUrl}/>

                {vehicleData.additional
                  ?
                  <Skblock header={<Translate value="details.components.additional_info.header"/>}>
                    <MultilineText value={vehicleData.additional}/>
                  </Skblock> : ""
                }

                <Reviews reviews={vehicleData.reviews}/>

              </div>
              <div className='col col-md-4'>
                <Sticky>
                  <Checkout sendEmailAsync={this.props.sendEmailAsync} id={this.props.params["id"]}/>
                </Sticky>
              </div>
            </div>
          </StickyContainer>

          {/*<div className='row'>*/}
          {/*<Skblock header={<Translate value="details.other_txt"/>}>*/}
          {/*<CarPreview.Grid vehicles={vehicles.other}/>*/}
          {/*</Skblock>*/}
          {/*</div>*/}
        </div>
      </div>
    );
  }
}

VehicleDetails.propTypes = {
  getDataAsync: React.PropTypes.func.isRequired,
  isLoading: React.PropTypes.bool.isRequired,
  sendEmailAsync: React.PropTypes.func.isRequired,
  sendQuestionByEmailAsync: React.PropTypes.func.isRequired,
  car_data: React.PropTypes.object.isRequired
};

export default VehicleDetails;
