import React from "react";
import "./Details.scss";

// Local components
import Skblock from "./BlockContainer";
import Overview from "./Overview";
import Fetaures from "./Features";
import History from "./History";
import PetrolConsumption from "./PetrolConsumption";
import Safety from "./Safety";
import InspectorsReport from "./InspectorsReport/Details.inspectors-report";
import Reviews from "./Reviews";
import VehicleDetailsMainImage from "./MainImage";
import Checkout from "./CheckoutPanel/Details.checkout";
import ItemPreview from "./../../../components/ItemPreview";
import {Translate} from 'react-redux-i18n';
import {StickyContainer, Sticky} from "react-sticky";

class VehicleDetails extends React.Component {

  componentWillMount() {
    this.props.getDataAsync(this.props.params["id"]);
  }

  render() {
    const vehicleData = this.props.car_data;
    if (this.props.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div className='car-details'>
        <div className='container'>
          <VehicleDetailsMainImage vehicleDetailsMainImage={vehicleData.vehicleDetailsMainImage}/>
        </div>

        <div className='container'>
          <StickyContainer>
            <div className='row'>
              <div className='col col-md-7'>
                <Overview overview={vehicleData.overview}/>

                {vehicleData.descriptions.map((description, i) =>
                  <Skblock key={i} header={description.title}>
                    {description.content}
                  </Skblock>)
                }

                <Fetaures features={vehicleData.features}/>
                <History history={vehicleData.history}/>
                <PetrolConsumption
                  petrolConsumption={vehicleData.petrolConsumption}
                />
                <Safety stars={vehicleData.safetyStars}/>
                <InspectorsReport
                  report={vehicleData.report}
                  sendQuestionByEmailAsync={this.props.sendQuestionByEmailAsync}/>
                <Reviews reviews={vehicleData.reviews}/>
                <Skblock header={<Translate value="details.components.additional_info.header"/>}>
                  {vehicleData.additional}
                </Skblock>

              </div>
              <div className='col col-md-5'>
                <Sticky>
                  <Checkout sendEmailAsync={this.props.sendEmailAsync}/>
                </Sticky>
              </div>
            </div>
          </StickyContainer>

          <div className='row'>
            <Skblock header={<Translate value="details.other_txt"/>}>
              {/*<CarPreview.Grid vehicles={vehicles.other}/>*/}
            </Skblock>
          </div>
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
