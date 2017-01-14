/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray, change, reduxForm} from 'redux-form';
import {toastr} from "react-redux-toastr";
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import {ROUTE_PARAMS, FORM_MODE, FORMS} from "./../constants/Vehicle.constant";
import {
  renderTextField,
  descriptionRenderer,
  renderReportItems,
  renderFeatures,
  renderFaults,
  MainImageCardField,
  ImagesCardField,
  selectRenderer,
  ErrorBlockRenderer,
  ColorRenderer
} from "./Vehicle.redux-form.renderers";
import {onHandleSubmit} from "./Vehicle.redux-form.actions";
import {renderCheckbox, renderSelectField} from "../../../components/FormRenderers";
import {Row, Col} from "react-bootstrap";
import RefreshIndicator from 'material-ui/RefreshIndicator';
import fromSpringToReduxFormError from "../../../../../utils/formUtils/fromSpringToReduxFormError";
import "./Vehicle.component.scss";

import VehicleModel from "../../VehicleModels/containers/VehicleModel.container";
import {Modal} from "react-bootstrap";
import {ROUTE_PARAMS as VEHICLE_MODEL_ROUTE_PARAMS} from "../../VehicleModels/constants/VehicleModel.constant";
import _ from "underscore";
import {CropToolCard, CropToolSimple} from "../../../../../components/ReduxForm/CropTool";

const SubmitCardActions = ({disabled}) => (<CardActions>
  <hr/>
  <button className="btn btn-success vehicle-component--button-success" type="submit" disabled={disabled}>Save</button>
</CardActions>);

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
      id: this.props.params[ROUTE_PARAMS.VEHICLE_ID],
      isVehicleModelDialogOpen: false
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleModelsList();
    // this.props.getColors();
  }

  /**
   * We need to clean toastr's already shown messages.
   * We also clear the form (I am not sure if this is necessary).
   */
  componentWillUnmount() {
    toastr.clean();
    this.props.clear();
  }


  /**
   * Simple wrapper, which changes value using redux-form.
   * @param name - value type variable, e.g. "colorInside"
   * @param value - value type variable, e.g. "blue" or "#faf"
   * @param event
   */
  onSetField = (name, value, event) => {
    this.props.dispatch(change(FORMS.VEHICLE_FORM, name, value))
  };

  /**
   * Select2 on change option
   * @param name - field name, like transmission.id, or firstname
   * @param chosenOption - object {label: string (visible text), value: int (ID)}
   */
  onSelectItemChange = (name, chosenOption) => {
    const hackName = name.replace(".id", "");
    if (chosenOption.value !== chosenOption.label) {
      this.props.dispatch(change(FORMS.VEHICLE_FORM, hackName, {id: chosenOption.value}));
    } else if (hackName === "model") {
      this.openVehicleModelDialog(null);
    }
  };



  openVehicleModelDialog = (e) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({isVehicleModelDialogOpen: true});
  };

  /**
   *
   * @param e - event, if exists. E.g. button click event.
   * @param value - vehicle model id
   */
  closeVehicleModelDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({isVehicleModelDialogOpen: false});

    const promise = this.props.getVehicleModelsList();
    if (value && promise) {
      promise.then(() => { this.onSelectItemChange("model", {value}) });
    }
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
                  ? <h3><span className="label label-primary">ID: {this.props.id || this.state.id}</span></h3>
                  : <h3><span className="label label-success">{this.props.formMode1}</span></h3>}
              </Col>
            </Row>

            <Row>
              <Col md={6} xs={12}>

                {/*<MainImageCardField title="Main image"*/}
                                    {/*errors={errors}*/}
                                    {/*onMainImageRemove={this.props.onMainImageRemove}*/}
                                    {/*onMainImageUpload={this.props.onMainImageUpload}*/}
                                    {/*onMainImageCropComplete={this.props.onMainImageCropComplete}*/}
                {/*>*/}
                  {/*<SubmitCardActions disabled={this.props.submitting} />*/}
                {/*</MainImageCardField>*/}

                <CropToolCard
                  name="mainImage"
                  reduxFormName={FORMS.VEHICLE_FORM}
                  title="Main image"
                  errors={errors}
                >
                  <SubmitCardActions disabled={this.props.submitting} />
                </CropToolCard>

                <br/>

                <Card>
                  <CardTitle title={<h3>General</h3>} />
                  <CardText>
                    <Field name="model.id" label="Vehicle model *" component={selectRenderer(vehicleModels, this.onSelectItemChange)}/>

                    <Modal show={this.state.isVehicleModelDialogOpen} onHide={this.closeVehicleModelDialog}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <VehicleModel params={{[VEHICLE_MODEL_ROUTE_PARAMS.VEHICLE_MODEL_ID]: "new"}}
                                      onSubmitCustom={this.closeVehicleModelDialog} />
                      </Modal.Body>
                    </Modal>

                    <Field name="colorInsideHex"
                           label="Color inside *"
                           errors={errors}
                           onChangeComplete={this.onSetField}
                           component={ColorRenderer} />

                    <Field name="colorInside.id"
                           label="Color Inside * (Obsolete)"
                           errors={errors}
                           component={selectRenderer(colors, this.onSelectItemChange)}/>

                    <Field name="colorOutsideHex"
                           label="Color outside *"
                           errors={errors}
                           onChangeComplete={this.onSetField}
                           component={ColorRenderer} />

                    <Field name="colorOutside.id"
                           label="Color Outside *  (Obsolete)"
                           errors={errors}
                           component={selectRenderer(colors, this.onSelectItemChange)}/>

                    <FieldArray name="descriptions" label="Descriptions" component={descriptionRenderer} errors={errors}/>
                    {/*<FieldArray name="reportItems" label="Report Items" component={renderReportItems} errors={errors}/>*/}
                    <FieldArray name="faults" label="Faults " component={renderFaults}
                                onFaultFileAdd={this.props.onFaultFileUpload}
                                onFaultRemove={this.props.onFaultRemove}
                                errors={errors}
                    />
                    <Field name="fuelCity" label="Fuel City" component={renderTextField} errors={errors}/>
                    <Field name="fuelHighway" label="Fuel Highway" component={renderTextField} errors={errors}/>
                    <Field name="isSold" label="Is Sold" component={renderCheckbox} errors={errors}/>
                    <Field name="mileage" label="Mileage *" component={renderTextField} type="number" errors={errors}/>
                    <Field name="price" label="Price *" component={renderTextField} type="number" errors={errors}/>
                    <Field name="registrationNumber" label="Registration Number *" component={renderTextField} errors={errors}/>
                    <Field name="safetyStars" label="Safety Stars" component={renderTextField} type="number" errors={errors}/>
                    <Field name="vinCode" label="Vin Code *" component={renderTextField} errors={errors}/>
                    <Field name="additional" label="Additional info" component={renderTextField} errors={errors}/>
                  </CardText>
                  <SubmitCardActions disabled={this.props.submitting} />
                </Card>

                <br/>

                <Card>
                  <CardTitle title={<h3>Performance</h3>} />
                  <CardText>
                    <Field name="compressionRatio" label="Compression Ratio" component={renderTextField} errors={errors}/>
                    <Field name="compressionType" label="Compression Type" component={renderTextField} errors={errors}/>
                    <Field name="configuration" label="Configuration" component={renderTextField} errors={errors}/>
                    <Field name="cylinders" label="Cylinders" component={renderTextField} errors={errors}/>
                    <Field name="displacement" label="Displacement" component={renderTextField} errors={errors}/>
                    <Field name="size" label="Size" component={renderTextField} type="number" errors={errors}/>
                    <Field name="torque" label="Torque" component={renderTextField} type="number" errors={errors}/>
                    <Field name="totalValves" label="Total Valves" component={renderTextField} type="number" errors={errors}/>
                  </CardText>

                  <SubmitCardActions disabled={this.props.submitting} />
                </Card>
              </Col>
              <Col md={6} xs={12}>
                <ImagesCardField onImageFileUpload={this.props.onImageFileUpload}
                                 onImageFileRemove={this.props.onImageFileRemove}
                                 errors={errors}>
                  <SubmitCardActions disabled={this.props.submitting} />
                </ImagesCardField>
              </Col>
            </Row>
          </form>

        )}
      </div>
    )
  }
}

export default reduxForm({form: FORMS.VEHICLE_FORM})(Vehicle);
