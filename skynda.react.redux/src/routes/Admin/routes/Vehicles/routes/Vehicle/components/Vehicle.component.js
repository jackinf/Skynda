import React from 'react';
import {Field, FieldArray, change} from 'redux-form';
import {toastr} from "react-redux-toastr";
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Row, Col, Modal, Button} from "react-bootstrap";
import _ from "underscore";
import {TableHeaderColumn} from "react-bootstrap-table";
import "./Vehicle.component.scss";
import {ROUTE_PARAMS, FORM_MODE, FORMS} from "../../../constants/Vehicles.constant";
import {
  descriptionRenderer,
  ImagesCardField,
  selectFeaturesRenderer
} from "./FormRenderers";
import {
  renderTextField,
  selectRenderer,
  ErrorBlockRenderer,
  ColorRenderer,
  renderCheckbox
} from "../../../../../components/FormRenderers";
import BootstrapTable from "./Vehicle.bootstrap-table.component";
import fromSpringToReduxFormError from "../../../../../../../utils/formUtils/fromSpringToReduxFormError";
import {ROUTE_PARAMS as VEHICLE_MODEL_ROUTE_PARAMS} from "../../../../VehicleModels/constants/VehicleModel.constant";
import {ROUTE_PARAMS as VEHICLE_REPORT_ROUTE_PARAMS} from "../../../../VehicleReports/constants/VehicleReport.constant";
import {ROUTE_PARAMS as VEHICLE_REVIEW_ROUTE_PARAMS} from "../../../../VehicleReviews/constants/VehicleReview.constant";
import VehicleModel from "../../../../VehicleModels/routes/VehicleModel/containers/VehicleModel.container";
import VehicleReport from "../../../../VehicleReports/containers/VehicleReport.container";
import VehicleReview from "../../../../VehicleReviews/containers/VehicleReview.container";
import {CropToolCard} from "../../../../../../../components/ReduxForm/CropTool";

const SubmitCardActions = ({disabled}) => (<CardActions>
  <hr/>
  <button className="btn btn-success vehicle-component--button-success" type="submit" disabled={disabled}>Save</button>
</CardActions>);

class Vehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_ID],
      isVehicleModelDialogOpen: false,
      isVehicleReportDialogOpen: false,
      isVehicleReviewDialogOpen: false,
      vehicleReportId: VEHICLE_REPORT_ROUTE_PARAMS.values.NEW,
      vehicleReviewId: VEHICLE_REVIEW_ROUTE_PARAMS.values.NEW
    };
  }

  componentDidMount() {
    this.props.onHandleLoad(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleModelsList();
    this.props.getVehicleReportsList(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getVehicleReviewsList(this.props.params[ROUTE_PARAMS.VEHICLE_ID]);
    this.props.getFeaturesList();
    // this.props.getColors();
  }

  /**
   * We need to clean toastr's already shown messages.
   * We also clear the form (I am not sure if this is necessary). Yes it is. Somewhere something said it is.
   */
  componentWillUnmount() {
    toastr.clean();
    this.props.onHandleClear();
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
    // TODO: cure this cancer :O
  onSelectItemChange = (name, chosenOption) => {
    const hackName = name.replace(".id", "");
    if (chosenOption.value !== chosenOption.label) {
      this.props.dispatch(change(FORMS.VEHICLE_FORM, hackName, {id: chosenOption.value}));
    } else if (hackName === "model") {
      // this.openVehicleModelDialog(null);
      this.setState({isVehicleModelDialogOpen: true});
    }
  };

  // openVehicleModelDialog = (e) => {
  //   if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
  //     e.preventDefault(); // stop event propagation to avoid form submission.
  // };

  /**
   *
   * @param e - event, if exists. E.g. button click event.
   * @param value - vehicle model id
   */
    // TODO: eraldi failisse - VehicleSublistActions/Vehicle.close-vehicle-model-dialog.action.js
  closeVehicleModelDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({isVehicleModelDialogOpen: false});

    const promise = this.props.getVehicleModelsList();
    if (value && promise) {
      promise.then(() => {
        this.onSelectItemChange("model", {value})
      });
    }
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.open-vehicle-report-dialog.action.js
  openVehicleReportDialog = (e) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    if (e && !!e.id) {
      this.setState({vehicleReportId: e.id});
    }
    this.setState({isVehicleReportDialogOpen: true});
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.close-vehicle-report-dialog.action.js
  closeVehicleReportDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({vehicleReportId: VEHICLE_REPORT_ROUTE_PARAMS.values.NEW});
    this.setState({isVehicleReportDialogOpen: false});
    this.props.getVehicleReportsList(value);
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.delete-report-item.action.js
  deleteReportItem = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    const functionDeleteSingleReportItem = this.props.deleteSingleReportItem;
    if (confirm(`Are you sure you want to delete report with ID(s) ${dropRowKeysStr}?`)) {
      // If the confirmation is true, call the function that
      _.each(dropRowKeys, function (i) {
        functionDeleteSingleReportItem(i);
      });
      // continues the deletion of the record.
      next();
    }
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.open-vehicle-review-dialog.action.js
  openVehicleReviewDialog = (e) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    if (e && !!e.id) {
      this.setState({vehicleReviewId: e.id});
    }
    this.setState({isVehicleReviewDialogOpen: true});
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.close-vehicle-review-dialog.action.js
  closeVehicleReviewDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({vehicleReviewId: VEHICLE_REVIEW_ROUTE_PARAMS.values.NEW});
    this.setState({isVehicleReviewDialogOpen: false});
    this.props.getVehicleReviewsList(value);
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.delete-review-item.action.js
  deleteReviewItem = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    const deleteSingleReview = this.props.deleteSingleReview;
    if (confirm(`Are you sure you want to delete report with ID(s) ${dropRowKeysStr}?`)) {
      // If the confirmation is true, call the function that
      _.each(dropRowKeys, function (i) {
        deleteSingleReview(i);
      });
      // continues the deletion of the record.
      next();
    }
  };

  setField = (name, value) => {
    this.props.dispatch(change(FORMS.VEHICLE_FORM, name, value));
  };


  render() {
    const vehicleReports = this.props.vehicleReports && !this.props.vehicleReports.isFetching
      ? this.props.vehicleReports.items : [];
    const vehicleReviews = this.props.vehicleReviews && !this.props.vehicleReviews.isFetching
      ? this.props.vehicleReviews.items : [];
    const featuresList =  this.props.featuresList && !this.props.featuresList.isFetching
      ? this.props.featuresList.items : [];
    const vehicleModels = this.props.vehicleModels && !this.props.vehicleModels.isFetching
      ? this.props.vehicleModels.items.map(item => ({label: item.title + " " + item.modelCode, value: item.id}))
      : [];
    const colors = this.props.colors && !this.props.colors.isFetching
      ? this.props.colors.items.map(item => ({label: item.name, value: item.id}))
      : [];

    // Validation errors
    const springErrors = this.props.errors;
    const errors = fromSpringToReduxFormError(springErrors);  // TODO: LOL, spring, LOL. there is only one spring - time of the year... so fuck you, java.
    const bootstrapTableOptionsReport = {
      onRowClick: this.openVehicleReportDialog,
      onAdd: this.openVehicleReportDialog,
      handleConfirmDeleteRow: this.deleteReportItem,
      defaultSortName: "id",
      defaultSortOrder: 'asc',
    };
    const bootstrapTableOptionsReview = {
      onRowClick: this.openVehicleReviewDialog,
      onAdd: this.openVehicleReviewDialog,
      handleConfirmDeleteRow: this.deleteReviewItem,
      defaultSortName: "id",
      defaultSortOrder: 'asc',
    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    return (<div>
        {this.props.isFetching || this.props.submitting
          ? <div><RefreshIndicator size={100} left={200} top={200} status="loading"/></div>
          : (<div>
            <form>

              <ErrorBlockRenderer errors={springErrors}/>

              <Row>
                <Col xs={12}>
                  {this.props.formModeVehicle === FORM_MODE.UPDATING
                    ? <h3><span className="label label-primary">ID: {this.props.id || this.state.id}</span></h3>
                    : <h3><span className="label label-success">{this.props.formModeVehicle}</span></h3>}
                </Col>
              </Row>

              <Row>
                <Col md={6} xs={12}>
                  {/* TODO: See panna Vehicle.main-card.component.js */}
                  <Card>
                    <CropToolCard
                      name="mainImage"
                      reduxFormName={FORMS.VEHICLE_FORM}
                      title="Main image"
                      errors={errors}
                    >
                    </CropToolCard>

                    <CardText>
                      <Field name="isSold" label="Is Sold" component={renderCheckbox} errors={errors}/>

                      <Field name="model.id" label="Vehicle model *"
                             component={selectRenderer(vehicleModels, this.onSelectItemChange)}/>
                      <Modal show={this.state.isVehicleModelDialogOpen} onHide={this.closeVehicleModelDialog}>
                        <Modal.Header closeButton>
                          <Modal.Title>Modal heading</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <VehicleModel params={{[VEHICLE_MODEL_ROUTE_PARAMS.VEHICLE_MODEL_ID]: "new"}}
                                        onSubmitCustom={this.closeVehicleModelDialog}/>
                        </Modal.Body>
                      </Modal>

                      <Field name="price" label="Price *" component={renderTextField} type="number" errors={errors}/>
                      <Field name="mileage" label="Mileage *" component={renderTextField} type="number"
                             errors={errors}/>
                      <Card>
                        <CardText>
                          <label>Fuel:</label>
                          <Field name="fuelCity" label="Fuel City" component={renderTextField} errors={errors}/>
                          <Field name="fuelHighway" label="Fuel Highway" component={renderTextField} errors={errors}/>
                        </CardText>
                      </Card>
                      <br/>
                      <Card>
                        <CardText>
                          <label>History:</label>
                          <Field name="vinCode" label="Vin Code *" component={renderTextField} errors={errors}/>
                          <Field name="registrationNumber" label="Registration Number *" component={renderTextField}
                                 errors={errors}/>
                        </CardText>
                      </Card>
                      <br/>
                      <Card>
                        <CardText>
                          <label>Safety:</label>
                          <Field name="safetyStars" label="Safety Stars" component={renderTextField} type="number"
                                 errors={errors}/>
                          <Field name="safetyUrl" label="Safety Url" component={renderTextField}
                                 errors={errors}/>
                        </CardText>
                      </Card>
                      <br/>
                      <Field name="colorInsideHex"
                             label="Color inside *"
                             errors={errors}
                             onChangeComplete={this.onSetField}
                             component={ColorRenderer}/>

                      <Field name="colorOutsideHex"
                             label="Color outside *"
                             errors={errors}
                             onChangeComplete={this.onSetField}
                             component={ColorRenderer}/>
                    </CardText>

                    <CardTitle title={<h3>Vehicle Features</h3>}/>
                    <CardText>
                      {featuresList && featuresList != null
                        ?
                        (
                          <Field name="featuresAdminSelect"
                                 label="Features select"
                                 component={selectFeaturesRenderer(featuresList, this.setField, true)}/>
                        )
                        : "Fetching..."}

                    </CardText>

                    <CardTitle title={<h3>Descriptions & addition info</h3>}/>
                    <CardText>
                      <FieldArray name="descriptions" label="Descriptions" component={descriptionRenderer}
                                  errors={errors}/>
                      <Field name="additional" label="Additional info" component={renderTextField} errors={errors}/>
                    </CardText>

                    <Button disabled={this.props.submitting} onClick={e => this.props.onHandleSubmit(this.props.onSubmitCustom)}/>
                  </Card>
                </Col>
                <Col md={6} xs={12}>
                  <ImagesCardField onImageFileUpload={this.props.onImageFileUpload}
                                   onImageFileRemove={this.props.onImageFileRemove}
                                   errors={errors}>
                    {!isNaN(this.state.id) ?
                      <SubmitCardActions disabled={this.props.submitting}/>
                      :(<div>
                          <span className="color-red">Please save vehicle before saving Images</span>
                          <SubmitCardActions disabled={true}/>
                        </div>)
                    }
                  </ImagesCardField>
                </Col>
              </Row>
            </form>

            <br/>

            {!isNaN(this.state.id)
              ?
              <div>
                {/* TODO: See panna Vehicle.reports-card.component.js */}
                <Card>
                  <CardTitle title="Vehicle reports"/>
                  <CardText>
                    <Modal show={this.state.isVehicleReportDialogOpen} onHide={this.closeVehicleReportDialog}>
                      <Modal.Header closeButton>
                        <Modal.Title>REPORT CATEGORY</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <VehicleReport params={{
                          [VEHICLE_REPORT_ROUTE_PARAMS.VEHICLE_REPORT_ID]: this.state.vehicleReportId,
                          [VEHICLE_REPORT_ROUTE_PARAMS.VEHICLE_ID]: this.props.id || this.state.id
                        }}
                                       onSubmitCustom={this.closeVehicleReportDialog}/>
                      </Modal.Body>
                    </Modal>

                    {vehicleReports && vehicleReports != null && vehicleReports instanceof Array
                      ? (<div>
                        <BootstrapTable ref="tableReport" data={vehicleReports}
                        options={bootstrapTableOptionsReport}
                        selectRow={selectRow}
                        deleteRow
                        insertRow
                        >
                        <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Report
                        ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="title" dataSort={true}>Report Title</TableHeaderColumn>
                        </BootstrapTable>
                      </div>)
                      : ""}

                  </CardText>
                </Card>

                <br/>
                {/* TODO: See panna Vehicle.reviews-card.component.js */}
                <Card>
                  <CardTitle title="Vehicle reviews"/>
                  <CardText>

                    <Modal show={this.state.isVehicleReviewDialogOpen} onHide={this.closeVehicleReviewDialog}>
                      <Modal.Header closeButton>
                        <Modal.Title>REVIEW ITEM</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <VehicleReview params={{
                          [VEHICLE_REVIEW_ROUTE_PARAMS.VEHICLE_REVIEW_ID]: this.state.vehicleReviewId,
                          [VEHICLE_REVIEW_ROUTE_PARAMS.VEHICLE_ID]: this.props.id || this.state.id
                        }}
                                       onSubmitCustom={this.closeVehicleReviewDialog}/>
                      </Modal.Body>
                    </Modal>

                    {vehicleReviews && vehicleReviews != null && vehicleReviews instanceof Array
                      ? (<div>
                        <BootstrapTable ref="tableReview" data={vehicleReviews}
                                        options={bootstrapTableOptionsReview}
                                        selectRow={selectRow}
                                        deleteRow
                                        insertRow>
                          <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>
                            Review ID
                          </TableHeaderColumn>
                          <TableHeaderColumn dataField="text" dataSort={true}>Review Text</TableHeaderColumn>
                        </BootstrapTable>
                      </div>)
                      : ""}

                  </CardText>
                </Card>
              </div>
            : ""
            }
          </div>)}
      </div>
    )
  }
}

Vehicle.propTypes = {
  onHandleLoad: React.PropTypes.func.isRequired,
  onHandleSubmit: React.PropTypes.func.isRequired,
  onHandleClear: React.PropTypes.func.isRequired,
  getVehicleModelsList: React.PropTypes.func.isRequired,
  getVehicleReportsList: React.PropTypes.func.isRequired,
  deleteSingleReportItem: React.PropTypes.func.isRequired,
  getVehicleReviewsList: React.PropTypes.func.isRequired,
  deleteSingleReview: React.PropTypes.func.isRequired,
  getFeaturesList: React.PropTypes.func.isRequired,
  onImageFileRemove: React.PropTypes.func,
  onImageFileUpload: React.PropTypes.func,
  onMainImageCropComplete: React.PropTypes.func,


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
    reportCategories: React.PropTypes.array,
    fuelCity: React.PropTypes.number,
    fuelHighway: React.PropTypes.number,
    fuelAverage: React.PropTypes.number,
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

export default Vehicle;
