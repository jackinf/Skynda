/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field, FieldArray} from 'redux-form';

const renderFile = props => (
  <div>
    <label>{props.placeholder}</label>
    <div>
      <input type="file" name={props.name}/>
      {props.touched && props.error && <span>{props.error}</span>}
    </div>
  </div>
)



const renderDescriptions = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Description</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.title`} type="text" component="input" placeholder={`Description #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="textarea" placeholder={`Description #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

const renderFeatures = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Features</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={name} type="text" component="textarea" placeholder={`Feature #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

const renderHistoryProblems = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Problems</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={name} type="text" component="textarea" placeholder={`Problem #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

const renderImages = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Image</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={name} type="file" component={renderFile} placeholder={`Image #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);


const renderOverviews = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Overview</button>
    </li>
    {fields.map((description, index) =>
      <li key={index}>
        <Field name={`${description}.iconUrl`} type="text" component="input" placeholder={`Icon URL #${index + 1}`}/>
        <Field name={`${description}.label`} type="text" component="input" placeholder={`label #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

const renderReportCategories = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Report Category</button>
    </li>
    {fields.map((categoriesName, index) =>
      <li key={index}>
        <Field name={`${categoriesName}.title`} type="text" component="input" placeholder={`Title #${index + 1}`}/>

        <FieldArray name={`${categoriesName}.points`} component={({ fields }) => (
          <ul>
            <li>
              <button type="button" onClick={() => fields.push()}>Add Points</button>
            </li>
            {fields.map((pointsName, index) =>
              <li key={index}>
                <Field name={`${pointsName}.pass`} type="checkbox" component="checkbox" />
                <Field name={`${pointsName}.text`} type="text" component="input" placeholder={`text #${index + 1}`}/>
                <button type="button" onClick={() => fields.remove(index)}>X</button>
              </li>
            )}
            {fields.error && <li className="error">{fields.error}</li>}
          </ul>
        )}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);


const renderReportFaults = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Fault</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.img`} type="text" component="input" placeholder={`Image URL #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="input" placeholder={`Text #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);


const renderReviews = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Review</button>
    </li>
    {fields.map((name, index) =>
      <li key={index}>
        <Field name={`${name}.logoUrl`} type="text" component="input" placeholder={`Logo URL #${index + 1}`}/>
        <Field name={`${name}.rating`} type="text" component="number" placeholder={`Rating #${index + 1}`}/>
        <Field name={`${name}.text`} type="text" component="input" placeholder={`Text #${index + 1}`}/>
        <Field name={`${name}.videoUrl`} type="text" component="input" placeholder={`Video URL #${index + 1}`}/>
        <button type="button" onClick={() => fields.remove(index)}>X</button>
      </li>
    )}
    {fields.error && <li className="error">{fields.error}</li>}
  </ul>
);

class Car extends React.Component {
  static propTypes = {
    submitCarForm: React.PropTypes.func.isRequired
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.submitCarForm();
  };

  render() {
    return (
      <div>
        <h3>Car</h3>
        <form onSubmit={this.onSubmit}>

          <h4>General data</h4>
          <div>
            <label htmlFor="carGeneralDto.colorInside">Color inside</label>
            <Field name="carGeneralDto.colorInside" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.colorOutside">Color outside</label>
            <Field name="carGeneralDto.colorOutside" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.doors">Doors</label>
            <Field name="carGeneralDto.doors" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.drive">Drive</label>
            <Field name="carGeneralDto.drive" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.engine">Engine</label>
            <Field name="carGeneralDto.engine" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.horsePower">Horse power</label>
            <Field name="carGeneralDto.horsePower" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.manufacturer">Manufacturer</label>
            <Field name="carGeneralDto.manufacturer" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.mileage">Mileage</label>
            <Field name="carGeneralDto.mileage" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.model">Model</label>
            <Field name="carGeneralDto.model" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.seats">Seats</label>
            <Field name="carGeneralDto.seats" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.src">Source</label>
            <Field name="carGeneralDto.src" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.transmission">Transmission</label>
            <Field name="carGeneralDto.transmission" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="carGeneralDto.year">Year</label>
            <Field name="carGeneralDto.year" component="input" type="text"/>
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
            <FieldArray name="features" component={renderHistoryProblems}/>
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
