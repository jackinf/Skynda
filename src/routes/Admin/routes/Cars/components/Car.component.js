/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {
  renderDescriptions,
  renderFeatures,
  renderHistoryProblems,
  renderImages,
  renderOverviews,
  renderReportCategories,
  renderReportFaults,
  renderReviews
} from "./Car.component.renderers";
import {ROUTE_PATH_PARAM_NAME} from "./../constants/Car.constant";
import {FORM_MODE} from "../constants/Car.constant";

class Car extends React.Component {
  static propTypes = {
    submitCarForm: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired
  };

  componentWillMount() {
    const id = parseInt(this.props.params[ROUTE_PATH_PARAM_NAME]);
    if (!isNaN(id)) {
      this.props.load(id);
    } else {
      this.props.setFormMode(FORM_MODE.ADDING);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submitCarForm();
  };

  render() {
    return (
      <div>
        <h3>Car {this.props.formMode}</h3>
        <form onSubmit={this.onSubmit}>

          <h4>General data</h4>
          <div>
            <label htmlFor="general.colorInside">Color inside</label>
            <Field name="general.colorInside" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.colorOutside">Color outside</label>
            <Field name="general.colorOutside" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.doors">Doors</label>
            <Field name="general.doors" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.drive">Drive</label>
            <Field name="general.drive" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.engine">Engine</label>
            <Field name="general.engine" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.horsePower">Horse power</label>
            <Field name="general.horsePower" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.manufacturer">Manufacturer</label>
            <Field name="general.manufacturer" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.mileage">Mileage</label>
            <Field name="general.mileage" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.model">Model</label>
            <Field name="general.model" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.seats">Seats</label>
            <Field name="general.seats" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.src">Source</label>
            <Field name="general.src" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.transmission">Transmission</label>
            <Field name="general.transmission" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="general.year">Year</label>
            <Field name="general.year" component="input" type="text"/>
          </div>

          <h4>Descriptions</h4>

          <div>
            <FieldArray name="descriptions" component={renderDescriptions}/>
          </div>

          <h4>Features</h4>

          <div>
            <FieldArray name="features" component={renderFeatures}/>
          </div>

          <h4>History</h4>

          <div>
            <label htmlFor="history.vinCode">Year</label>
            <Field name="history.vinCode" component="input" type="text"/>
          </div>

          <div>
            <FieldArray name="history.problems" component={renderHistoryProblems}/>
          </div>

          <h4>Images</h4>

          <div>
            <FieldArray name="images" component={renderImages}/>
          </div>

          <h4>Overview</h4>

          <div>
            <FieldArray name="overview" component={renderOverviews}/>
          </div>

          <h4>Performance</h4>

          <div>
            <label htmlFor="performance.compressionRatio">compressionRatio</label>
            <Field name="performance.compressionRatio" component="input" type="number"/>
          </div>
          <div>
            <label htmlFor="performance.compressorType">compressorType</label>
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

          <h4>Petrol consumption</h4>

          <div>
            <label htmlFor="petrolConsumption.average">average</label>
            <Field name="petrolConsumption.average" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="petrolConsumption.city">city</label>
            <Field name="petrolConsumption.city" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="petrolConsumption.highWay">highWay</label>
            <Field name="petrolConsumption.highWay" component="input" type="text"/>
          </div>

          <h4>Report</h4>

          <div>
            <label htmlFor="features">Report categories</label>
            <FieldArray name="report.categories" component={renderReportCategories}/>
            <label htmlFor="features">Report faults</label>
            <FieldArray name="report.faults" component={renderReportFaults}/>
          </div>

          <h4>Reviews</h4>

          <div>
            <FieldArray name="reviews" component={renderReviews}/>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Car;
