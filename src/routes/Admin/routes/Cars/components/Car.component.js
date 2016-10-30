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
  renderFaults,
  renderImages
} from "./Car.component.renderers";
import {submitCarForm} from "../actions/Car";
import MenuItem from 'material-ui/MenuItem';
import {Row, Col} from "react-bootstrap";
import {browserHistory} from "react-router";
import Dropzone from "react-dropzone";
import _ from "underscore";

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
      imageFiles: [],
      faultsFiles: []
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.CAR_ID]);
    this.props.getCarModelsList();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  onFileImageAdd = (acceptedFiles, rejectedFiles) => {
    console.log('Accepted files: ', acceptedFiles);
    console.log('Rejected files: ', rejectedFiles);
    this.setState({imageFiles: this.state.imageFiles.concat(acceptedFiles)});
  };

  onFileImageRemove = (removedIndex) => {
    let spliced = this.state.imageFiles.filter((file, i) => i !== removedIndex);
    console.log(spliced);
    this.setState({imageFiles: spliced});
  };

  onFaultImageAdd = (e, id) => {
    let files = this.state.faultsFiles.filter((item, i) => i !== id);
    files.push(e.target.files[0]);  // File input can accept multiple files. To avoid this, we take the first only.
    console.log(files);
    this.setState({faultsFiles: files});
  };

  onFaultRemove = (e, id) => {
    let files = this.state.faultsFiles.filter((item, i) => i !== id);
    console.log(files);
    this.setState({faultsFiles: files});
  };

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
        {this.props.isFetching ? "Loading..." : (
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

                <Field name="colorInside" label="Color Inside *" component={renderTextField}/>
                <Field name="colorOutside" label="Color Outside *" component={renderTextField}/>
                <FieldArray name="descriptions" label="Descriptions" component={renderDescriptions}/>
                <FieldArray name="features" label="Features" component={renderFeatures}/>
                <FieldArray name="faults" label="Faults" component={renderFaults}
                            onFaultImageAdd={this.onFaultImageAdd} onFaultRemove={this.onFaultRemove}
                />
                <Field name="fuelCity" label="Fuel City" component={renderTextField}/>
                <Field name="fuelHighway" label="Fuel Highway" component={renderTextField}/>

                {/*<FieldArray name="images" label="Images" component={renderImages}/>*/}
                <Row>
                  <Col xs={12} md={6}>
                    <h4>Images</h4>
                    <Dropzone onDrop={this.onFileImageAdd} multiple={true}>
                      <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>

                    <h4>Uploading {this.state.imageFiles.length} files</h4>
                    <div>
                      {this.state.imageFiles.map((file, i) =>
                        <img width={100} key={i} src={file.preview} onClick={e => this.onFileImageRemove(i)} />)}
                    </div>
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

            <button type="submit" disabled={this.props.submitting}>Submit</button>
            {/*<RaisedButton label="Submit" />*/}
          </form>

        )}
      </div>
    )
  }
}

export default Car;
