/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {ROUTE_PARAMS, FORM_MODE} from "./../constants/Car.constant";
import {
  renderDescriptions,
  renderFeatures,
  renderHistoryProblems,
  renderImages
} from "./Car.component.renderers";

class Car extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    submitCarForm: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    fillWithFakeData: React.PropTypes.func.isRequired,

    // car data
    initialValues: React.PropTypes.shape({
      "carManufacturerCode": React.PropTypes.string,
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
        {
          "id": React.PropTypes.number,
          "text": React.PropTypes.string
        }
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
      "isSold": true,
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
      "vinCode": React.PropTypes.string
    })
  };

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.CAR_ID]);
  }

  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submitCarForm();
  };

  render() {
    const isFetching = this.props.isFetching;

    return (
      <div>
        {isFetching ? "Loading..." : (
          <form onSubmit={this.onSubmit}>
            <h3>Car {this.props.formMode1}</h3>

            {this.props.formMode1 === FORM_MODE.ADDING
              ? (<a onClick={this.props.fillWithFakeData}>Fill with fake data</a>)
              : ""}

            <h4>General data</h4>
            <div>
              <label htmlFor="carManufacturerCode">Car Manufacturer Code (TODO: SelectBox)</label>
              <Field name="carManufacturerCode" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="carModelsCode">Car Models Code (TODO: SelectBox)</label>
              <Field name="carModelsCode" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="colorInside">Colors Inside</label>
              <Field name="colorInside" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="colorOutside">Colors Outside</label>
              <Field name="colorOutside" component="input" type="text"/>
            </div>

            <hr/>

            <h4>Descriptions</h4>

            <div>
              <FieldArray name="descriptions" component={renderDescriptions}/>
            </div>

            <hr/>

            <h4>Features</h4>

            <div>
              <FieldArray name="features" component={renderFeatures}/>
            </div>

            <hr/>

            <h4>Faults (TODO: history problems?)</h4>

            <div>
              <FieldArray name="faults" component={renderHistoryProblems}/>
            </div>

            <hr/>

            <div>
              <label htmlFor="fuelCity">Fuel City</label>
              <Field name="fuelCity" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="fuelHighway">Fuel Highway</label>
              <Field name="fuelHighway" component="input" type="text"/>
            </div>

            <hr/>

            <h4>Images</h4>

            <div>
              <FieldArray name="images" component={renderImages}/>
            </div>

            <hr/>

            <div>
              <label htmlFor="isSold">Is sold</label>
              <Field name="isSold" component="input" type="checkbox"/>
            </div>

            <div>
              <label htmlFor="mileage">Mileage</label>
              <Field name="mileage" component="input" type="number"/>
            </div>

            <h4>Performance</h4>

            <div>
              <label htmlFor="performance.compressionRatio">compressionRatio</label>
              <Field name="performance.compressionRatio" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="performance.compressionType">compressorType</label>
              <Field name="performance.compressorType" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.configuration">configuration</label>
              <Field name="performance.configuration" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.cylinders">cylinders</label>
              <Field name="performance.cylinders" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.displacement">displacement</label>
              <Field name="performance.displacement" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.doors">doors</label>
              <Field name="performance.doors" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="performance.drivenWheels">drivenWheels</label>
              <Field name="performance.drivenWheels" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.fuelType">fuelType</label>
              <Field name="performance.fuelType" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.horsePower">horsePower</label>
              <Field name="performance.horsePower" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="performance.powerTrain">powerTrain</label>
              <Field name="performance.powerTrain" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="performance.size">size</label>
              <Field name="performance.size" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="performance.torque">torque</label>
              <Field name="performance.torque" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="performance.totalValves">totalValves</label>
              <Field name="performance.totalValves" component="input" type="number"/>
            </div>

            <hr/>

            <div>
              <label htmlFor="price">Price</label>
              <Field name="price" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="registrationNumber">Registration Number</label>
              <Field name="registrationNumber" component="input" type="text"/>
            </div>
            <div>
              <label htmlFor="safetyStars">Safety Stars</label>
              <Field name="safetyStars" component="input" type="number"/>
            </div>
            <div>
              <label htmlFor="vinCode">Vin Code</label>
              <Field name="vinCode" component="input" type="text"/>
            </div>

            <button type="submit">Submit</button>
          </form>

        )}
      </div>
    )
  }
}

export default Car;
