/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray, change, reduxForm} from 'redux-form';
import {toastr} from "react-redux-toastr";

import {ROUTE_PARAMS, FORM_MODE, FORMS} from "./../constants/Vehicle.constant";
import {
  renderTextField,
  renderDescriptions,
  renderReportItems,
  renderFeatures,
  renderFaults,
  MainImageField,
  ImagesField,
  selectRenderer,
  ErrorBlockRenderer
} from "./Vehicle.redux-form.renderers";
import {onHandleSubmit} from "./Vehicle.redux-form.actions";
import {renderCheckbox, renderSelectField} from "../../../components/FormRenderers";
import {Row, Col} from "react-bootstrap";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";

class Vehicle extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
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
      fuelCity: React.PropTypes.number,
      fuelHighway: React.PropTypes.number,
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

  /**
   * For cleanup in order to avoid bugs.
   */
  componentWillUnmount() {
    toastr.clean();
    this.props.clear();
  }

  /**
   * Select2 on change option
   * @param name - field name, like transmission.id, or firstname
   * @param chosenOption - object {label: string (visible text), value: int (ID)}
   */
  setField = (name, chosenOption) => {
    this.props.dispatch(change(FORMS.VEHICLE_FORM, name, chosenOption.value));
  };

  /**
   * Form submission. Create or update.
   * @param e
   */
  onSubmit(e) {
    let promise = this.props.handleSubmit(data => onHandleSubmit(data, this.props.formMode1))(e);
    promise && promise.then(resp => {this.props.onHandleSubmitFinished(resp)});
  };

  render() {
    const vehicleModels = !this.props.vehicleModels.isFetching
      ? this.props.vehicleModels.items.map(item => ({label: item.title + " " + item.modelCode, value: item.id}))
      : [];
    const colors = !this.props.colors.isFetching
      ? this.props.colors.items.map(item => ({label: item.name, value: item.id}))
      : [];

    // Validation errors
    const springErrors = this.props.errors;
    const errors = fromSpringToReduxFormError(springErrors);

    return (<div>
        {this.props.isFetching || this.props.submitting
          ? <div><RefreshIndicator size={100} left={200} top={200} status="loading"/></div>
          : (<form onSubmit={this.onSubmit.bind(this)}>

            <ErrorBlockRenderer errors={springErrors} />

            <Row>
              <Col xs={12}>
                {this.props.formMode1 === FORM_MODE.UPDATING
                  ? <h3><span className="label label-primary">ID: {this.state.id}</span></h3>
                  : <h3><span className="label label-success">{this.props.formMode1}</span></h3>}
              </Col>
            </Row>

            <Row>
              <Col md={6} xs={12}>
                <h4>General data</h4>

                <Field name="model.id" label="Model Code *" component={selectRenderer(vehicleModels, this.setField)}/>

                <MainImageField title="Main image"
                                errors={errors}
                                onMainImageRemove={this.props.onMainImageRemove}
                                onMainImageUpload={this.props.onMainImageUpload}/>

                <Field name="colorInside.id"
                       label="Color Inside *"
                       errors={errors}
                       component={selectRenderer(colors, this.setField)}/>

                <Field name="colorOutside.id"
                       label="Color Outside *"
                       errors={errors}
                       component={selectRenderer(colors, this.setField)}/>

                <FieldArray name="descriptions" label="Descriptions" component={renderDescriptions} errors={errors}/>
                <FieldArray name="reportItems" label="Report Items" component={renderReportItems} errors={errors}/>
                <FieldArray name="features" label="Features" component={renderFeatures} errors={errors}/>
                <FieldArray name="faults" label="Faults" component={renderFaults}
                            onFaultFileAdd={this.props.onFaultFileUpload}
                            onFaultRemove={this.props.onFaultRemove}
                            errors={errors}
                />
                <Field name="fuelCity" label="Fuel City" component={renderTextField} errors={errors}/>
                <Field name="fuelHighway" label="Fuel Highway" component={renderTextField} errors={errors}/>

                <ImagesField onImageFileUpload={this.props.onImageFileUpload}
                             onImageFileRemove={this.props.onImageFileRemove}
                             errors={errors}/>
                <br/>

                <Field name="isSold" label="Is Sold" component={renderCheckbox} errors={errors}/>
                <Field name="mileage" label="Mileage *" component={renderTextField} type="number" errors={errors}/>
                <Field name="price" label="Price *" component={renderTextField} type="number" errors={errors}/>
                <Field name="registrationNumber" label="Registration Number *" component={renderTextField} errors={errors}/>
                <Field name="safetyStars" label="Safety Stars" component={renderTextField} type="number" errors={errors}/>
                <Field name="vinCode" label="Vin Code *" component={renderTextField} errors={errors}/>
                <Field name="additional" label="Additional info" component={renderTextField} errors={errors}/>
              </Col>
              <Col md={6} xs={12}>
                <h4>Performance</h4>
                <Field name="compressionRatio" label="Compression Ratio" component={renderTextField} errors={errors}/>
                <Field name="compressionType" label="Compression Type" component={renderTextField} errors={errors}/>
                <Field name="configuration" label="Configuration" component={renderTextField} errors={errors}/>
                <Field name="cylinders" label="Cylinders" component={renderTextField} errors={errors}/>
                <Field name="displacement" label="Displacement" component={renderTextField} errors={errors}/>
                <Field name="size" label="Size" component={renderTextField} type="number" errors={errors}/>
                <Field name="torque" label="Torque" component={renderTextField} type="number" errors={errors}/>
                <Field name="totalValves" label="Total Valves" component={renderTextField} type="number" errors={errors}/>
              </Col>
            </Row>

            <br />

            <button className="btn btn-success"
                    style={{padding: "10px", fontSize: "20px", marginBottom: "20px"}}
                    type="submit"
                    disabled={this.props.submitting}>Submit</button>
          </form>

        )}
      </div>
    )
  }
}

export default reduxForm({form: FORMS.VEHICLE_FORM})(Vehicle);
