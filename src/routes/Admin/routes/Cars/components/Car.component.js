/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE} from "./../constants/Car.constant";
import {
  renderTextField,
  renderCheckbox,
  renderSelectField,
  renderDescriptions,
  renderFeatures,
  renderFaults
} from "./Car.component.renderers";
import {submitCarForm} from "../actions/Car";
import MenuItem from 'material-ui/MenuItem';
import {Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";
import Dropzone from "react-dropzone";

class Car extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    submitCarForm: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    fillWithFakeData: React.PropTypes.func.isRequired,
    getCarModelsList: React.PropTypes.func.isRequired,

    // car models data for combobox
    carModels: React.PropTypes.shape({
      isFetching: React.PropTypes.bool,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        modelCode: React.PropTypes.string.isRequired,
        manufacturerCode: React.PropTypes.string.isRequired
      }))
    }),

    // car data
    initialValues: React.PropTypes.shape({
      "carModelsCode": React.PropTypes.string,
      "colorInside": React.PropTypes.string,
      "colorOutside": React.PropTypes.string,
      "faults": React.PropTypes.arrayOf(
        React.PropTypes.shape({
          "id": React.PropTypes.number,
          "img": React.PropTypes.string,
          "text": React.PropTypes.string
        })
      ),
      "features": React.PropTypes.arrayOf(
        React.PropTypes.shape({
          "id": React.PropTypes.number,
          "text": React.PropTypes.string
        })
      ),
      "fuelCity": React.PropTypes.string,
      "fuelHighway": React.PropTypes.string,
      "id": React.PropTypes.number,
      "images": React.PropTypes.arrayOf(
        React.PropTypes.shape({
          "id": React.PropTypes.number,
          "original": React.PropTypes.string,
          "thumbnail": React.PropTypes.string
        })
      ),
      "isSold": React.PropTypes.bool,
      "mileage": React.PropTypes.number,
      "performance": React.PropTypes.shape({
        "compressionRatio": React.PropTypes.number,
        "compressionType": React.PropTypes.string,
        "configuration": React.PropTypes.string,
        "cylinders": React.PropTypes.string,
        "displacement": React.PropTypes.string,
        "doors": React.PropTypes.number,
        "drivenWheels": React.PropTypes.string,
        "fuelType": React.PropTypes.string,
        "horsePower": React.PropTypes.number,
        "powerTrain": React.PropTypes.string,
        "size": React.PropTypes.number,
        "torque": React.PropTypes.number,
        "totalValves": React.PropTypes.number
      }),
      "price": React.PropTypes.number,
      "registrationNumber": React.PropTypes.string,
      "safetyStars": React.PropTypes.number,
      "vinCode": React.PropTypes.string,
      "additionalInfo": React.PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.CAR_ID],

      // Files that should be cleaned from file storage
      filesToDelete: [] // (blobName + containerName)
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.CAR_ID]);
    this.props.getCarModelsList();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    this.props.handleSubmit(data => submitCarForm(data, this.props.formMode1))(e)
      .then(() => {
          if (!!this.props.submitSucceeded) {
            alert("Success!");
            browserHistory.push(`/admin/car`);
          }
        },
        () => (console.log("error")));
  };

  render() {
    return (<div>
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

                {this.props.carModels.isFetching ? "Fetching car models" : (
                  <Field name="carModelsCode" label="Model Code *" component={renderSelectField}>
                    {this.props.carModels.items.map((item, i) => (
                      <MenuItem key={i} value={item.modelCode}
                                primaryText={`${item.manufacturerCode} ${item.modelCode}`}/>
                    ))}
                  </Field>
                )}

                Persisted: <Field name="mainImageContainer.imageUrl" label="Main image" component={({input, i}) => (<div>
                  {input.value ? <img src={input.value} width={100}/> : ""}
                </div>)}/>
                <br />
                New: <Field name="mainImageContainer.base64File" label="Main image" component={({input, i}) => (<div>
                  {input.value
                    ? <img src={input.value} onClick={e => this.props.onMainImageRemove(e)} width={100}/>
                    : <input type="file" onChange={e => this.props.onMainImageUpload(e)}/>}
                </div>)}/>

                <Field name="colorInside" label="Color Inside *" component={renderTextField}/>
                <Field name="colorOutside" label="Color Outside *" component={renderTextField}/>
                <FieldArray name="descriptions" label="Descriptions" component={renderDescriptions}/>
                <FieldArray name="features" label="Features" component={renderFeatures}/>
                <FieldArray name="faults" label="Faults" component={renderFaults}
                            onFaultFileAdd={this.props.onFaultFileUpload}
                            onFaultRemove={this.props.onFaultRemove}
                />
                <Field name="fuelCity" label="Fuel City" component={renderTextField}/>
                <Field name="fuelHighway" label="Fuel Highway" component={renderTextField}/>
                <Row>
                  <Col xs={12} md={6}>
                    <h4>Images</h4>
                    <Dropzone onDrop={this.props.onImageFileUpload} multiple={true}>
                      <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>

                    <FieldArray name="images" component={({fields}) => (<div>
                      {fields.map((field, index) => {
                        const componentFn = ({input}) => (<img src={input.value} width={100}
                                                               onClick={e => this.props.onImageFileRemove(e, index)}/>);
                        return (<div key={index}>
                          Persisted: <Field name={`${field}.imageContainer.imageUrl`} type="text" component={componentFn}/><br />
                          New: <Field name={`${field}.imageContainer.base64File`} type="text" component={componentFn}/>
                        </div>);
                      })}</div>)}/>

                  </Col>
                </Row>
                <br/>

                <Field name="isSold" label="Is Sold" component={renderCheckbox}/>
                <Field name="mileage" label="Mileage *" component={renderTextField} type="number"/>
                <Field name="price" label="Price *" component={renderTextField} type="number"/>
                <Field name="registrationNumber" label="Registration Number *" component={renderTextField}/>
                <Field name="safetyStars" label="Safety Stars" component={renderTextField} type="number"/>
                <Field name="vinCode" label="Vin Code *" component={renderTextField}/>
                <Field name="additionalInfo" label="Additional info" component={renderTextField}/>
              </Col>
              <Col md={6} xs={12}>
                <h4>Performance</h4>
                <Field name="performance.compressionRatio" label="Compression Ratio" component={renderTextField}/>
                <Field name="performance.compressorType" label="Compressor Type" component={renderTextField}/>
                <Field name="performance.configuration" label="Configuration" component={renderTextField}/>
                <Field name="performance.cylinders" label="Cylinders" component={renderTextField}/>
                <Field name="performance.displacement" label="Displacement" component={renderTextField}/>
                <Field name="performance.doors" label="Doors" component={renderTextField} type="number"/>
                <Field name="performance.drivenWheels" label="Driven Wheels" component={renderTextField}/>
                <Field name="performance.fuelType" label="Fuel Type" component={renderTextField}/>
                <Field name="performance.horsePower" label="Horse Power" component={renderTextField} type="number"/>
                <Field name="performance.powerTrain" label="Power Train" component={renderTextField}/>
                <Field name="performance.size" label="Size" component={renderTextField} type="number"/>
                <Field name="performance.torque" label="Torque" component={renderTextField} type="number"/>
                <Field name="performance.totalValves" label="Total Valves" component={renderTextField} type="number"/>
              </Col>
            </Row>

            {/*<Row style={{border: "1px solid #dedede", background: "#efefef"}}>*/}
              {/*<Col xs={12}>*/}
                {/*<h3>Files that are pending for upload:</h3>*/}

                {/*<h4>Main file</h4>*/}
                {/*<Row>*/}
                  {/*<Col xs={12}>*/}
                    {/*<Field name="filesToUpload.mainImageFile"*/}
                           {/*type="text"*/}
                           {/*component={({input}) => (<img src={input.value} width={100}/>)}/>*/}
                  {/*</Col>*/}
                {/*</Row>*/}

                {/*<h4>Image files</h4>*/}
                {/*<Row>*/}
                  {/*<Col xs={12}>*/}
                    {/*<FieldArray name="filesToUpload.imageFiles" component={({fields}) => (<div>*/}
                      {/*{fields.map((field, index) => {*/}
                        {/*const componentFn = ({input}) => (<img src={input.value} width={100}/>);*/}
                        {/*return <Field key={index} name={`${field}`} component={componentFn}/>;*/}
                      {/*})}</div>)}/>*/}
                  {/*</Col>*/}
                {/*</Row>*/}

                {/*/!*<h4>Faults files</h4>*!/*/}
                {/*/!*<Row>*!/*/}
                  {/*/!*<Col xs={12}>*!/*/}
                    {/*/!*<FieldArray name="filesToUpload.faultsFiles" component={({fields}) => (<div>*!/*/}
                      {/*/!*{fields.map((field, index) => {*!/*/}
                        {/*/!*const componentFn = ({input}) => (<img src={input.value} width={100}/>);*!/*/}
                        {/*/!*return <Field key={index} name={`${field}.base64File`} component={componentFn}/>;*!/*/}
                      {/*/!*})}</div>)}/>*!/*/}
                  {/*/!*</Col>*!/*/}
                {/*/!*</Row>*!/*/}

              {/*</Col>*/}
            {/*</Row>*/}

            <br />

            <button type="submit" disabled={this.props.submitting}>Submit</button>
            {/*<RaisedButton label="Submit" />*/}
          </form>

        )}
      </div>
    )
  }
}

export default Car;
