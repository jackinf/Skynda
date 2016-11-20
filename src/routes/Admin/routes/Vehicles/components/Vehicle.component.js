/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE} from "./../constants/Vehicle.constant";
import {
  renderTextField,
  renderDescriptions,
  renderFeatures,
  renderFaults,
  MainImageField,
  ImagesField
} from "./Vehicle.component.renderers";
import {renderCheckbox, renderSelectField} from "../../../components/FormRenderers";
import {submitVehicleForm} from "../actions/Vehicle";
import MenuItem from 'material-ui/MenuItem';
import {Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";
import NotificationSystem from "react-notification-system";

class Vehicle extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    submitVehicleForm: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    fillWithFakeData: React.PropTypes.func.isRequired,
    getVehicleModelsList: React.PropTypes.func.isRequired,

    // vehicle models data for combobox
    vehicleModels: React.PropTypes.shape({
      isFetching: React.PropTypes.bool,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        modelCode: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired
      }))
    }),

    colors: React.PropTypes.shape({
      isFetching: React.PropTypes.bool,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired
      }))
    }),

    // vehicle data
    initialValues: React.PropTypes.shape({
      vehicleModelsCode: React.PropTypes.string,
      faults: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.number,
          img: React.PropTypes.string,
          text: React.PropTypes.string
        })
      ),
      features: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.number,
          text: React.PropTypes.string
        })
      ),
      fuelCity: React.PropTypes.string,
      fuelHighway: React.PropTypes.string,
      id: React.PropTypes.number,
      images: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          id: React.PropTypes.number,
          original: React.PropTypes.string,
          thumbnail: React.PropTypes.string
        })
      ),
      isSold: React.PropTypes.bool,
      mileage: React.PropTypes.number,
      performance: React.PropTypes.shape({
        compressionRatio: React.PropTypes.number,
        compressionType: React.PropTypes.string,
        configuration: React.PropTypes.string,
        cylinders: React.PropTypes.string,
        displacement: React.PropTypes.string,
        doors: React.PropTypes.number,
        drivenWheels: React.PropTypes.string,
        fuelType: React.PropTypes.string,
        horsePower: React.PropTypes.number,
        powerTrain: React.PropTypes.string,
        size: React.PropTypes.number,
        torque: React.PropTypes.number,
        totalValves: React.PropTypes.number
      }),
      price: React.PropTypes.number,
      registrationNumber: React.PropTypes.string,
      safetyStars: React.PropTypes.number,
      vinCode: React.PropTypes.string,
      additionalInfo: React.PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_ID]
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleModelsList();
    this.props.getColors();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    this.props.handleSubmit(data => submitVehicleForm(data, this.props.formMode1))(e)
      .then(() => {
          if (!!this.props.submitSucceeded) {
            this.refs.notificationSystem.addNotification({
              message: 'Notification message',
              level: 'success'
            });
            browserHistory.push(`/admin/vehicle`);
          }
        },
        () => (console.log("error")));
  };

  render() {
    return (<div>
        <NotificationSystem ref="notificationSystem"/>

        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form onSubmit={this.onSubmit.bind(this)}>

            <Row>
              <Col xs={12}>
                <h3>{this.props.formMode1} (ID: {this.state.id})</h3>
                {this.props.formMode1 === FORM_MODE.ADDING
                  ? (<a onClick={this.props.fillWithFakeData}>Fill with fake data</a>)
                  : ""}
              </Col>
            </Row>

            <Row>
              <Col md={6} xs={12}>
                <h4>General data</h4>

                {this.props.vehicleModels.isFetching ? "Fetching vehicle models" : (
                  <Field name="model.id" label="Model Code *" component={renderSelectField}>
                    {this.props.vehicleModels.items.map((item, i) => (
                      <MenuItem key={i} value={item.id} primaryText={`${item.title} ${item.modelCode}`}/>
                    ))}
                  </Field>
                )}

                <MainImageField title="Main image"
                                onMainImageRemove={this.props.onMainImageRemove}
                                onMainImageUpload={this.props.onMainImageUpload} />

                {this.props.colors.isFetching ? "Fetching colors" : (
                  <Field name="colorInside.id" label="Color Inside *" component={renderSelectField}>
                    {this.props.colors.items.map((item, i) => (
                      <MenuItem key={i} value={item.id} primaryText={`${item.name}`}/>
                    ))}
                  </Field>
                )}

                {this.props.colors.isFetching ? "Fetching colors" : (
                  <Field name="colorOutside.id" label="Color Outside *" component={renderSelectField}>
                    {this.props.colors.items.map((item, i) => (
                      <MenuItem key={i} value={item.id} primaryText={`${item.name}`}/>
                    ))}
                  </Field>
                )}

                <FieldArray name="descriptions" label="Descriptions" component={renderDescriptions}/>
                <FieldArray name="features" label="Features" component={renderFeatures}/>
                <FieldArray name="faults" label="Faults" component={renderFaults}
                            onFaultFileAdd={this.props.onFaultFileUpload}
                            onFaultRemove={this.props.onFaultRemove}
                />
                <Field name="fuelCity" label="Fuel City" component={renderTextField}/>
                <Field name="fuelHighway" label="Fuel Highway" component={renderTextField}/>

                <ImagesField onImageFileUpload={this.props.onImageFileUpload}
                             onImageFileRemove={this.props.onImageFileRemove} />
                <br/>

                <Field name="isSold" label="Is Sold" component={renderCheckbox}/>
                <Field name="mileage" label="Mileage *" component={renderTextField} type="number"/>
                <Field name="price" label="Price *" component={renderTextField} type="number"/>
                <Field name="registrationNumber" label="Registration Number *" component={renderTextField}/>
                <Field name="safetyStars" label="Safety Stars" component={renderTextField} type="number"/>
                <Field name="vinCode" label="Vin Code *" component={renderTextField}/>
                <Field name="additional" label="Additional info" component={renderTextField}/>
              </Col>
              <Col md={6} xs={12}>
                <h4>Performance</h4>
                <Field name="compressionRatio" label="Compression Ratio" component={renderTextField}/>
                <Field name="compressionType" label="Compression Type" component={renderTextField}/>
                <Field name="configuration" label="Configuration" component={renderTextField}/>
                <Field name="cylinders" label="Cylinders" component={renderTextField}/>
                <Field name="displacement" label="Displacement" component={renderTextField}/>
                <Field name="size" label="Size" component={renderTextField} type="number"/>
                <Field name="torque" label="Torque" component={renderTextField} type="number"/>
                <Field name="totalValves" label="Total Valves" component={renderTextField} type="number"/>
              </Col>
            </Row>

            <br />

            <button type="submit" disabled={this.props.submitting}>Submit</button>
            {/*<RaisedButton label="Submit" />*/}
          </form>

        )}
      </div>
    )
  }
}

export default Vehicle;
