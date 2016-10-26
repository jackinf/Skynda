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
  renderHistoryProblems,
  renderImages
} from "./Car.component.renderers";
import MenuItem from 'material-ui/MenuItem';

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
      "vinCode": React.PropTypes.string
    })
  };

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.CAR_ID]);
    this.props.getCarModelsList();
  }

  componentWillUnmount() {
    this.props.clear();
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting");
    this.props.submitCarForm();
  };

  render() {
    return (
      <div>
        {this.props.isFetching ? "Loading..." : (
          <form onSubmit={this.onSubmit}>
            <h3>Car {this.props.formMode1}</h3>

            {this.props.formMode1 === FORM_MODE.ADDING
              ? (<a onClick={this.props.fillWithFakeData}>Fill with fake data</a>)
              : ""}

            <h4>General data</h4>

            {this.props.carModels.isFetching ? "Fetching car models" : (
              <Field name="carModelsCode" component={renderSelectField}>
                {this.props.carModels.items.map((item, i) => (
                  <MenuItem key={i} value={item.modelCode} primaryText={`${item.manufacturerCode} ${item.modelCode}`}/>
                ))}
              </Field>
            )}

            <Field name="colorInside" component={renderTextField}/>
            <Field name="colorOutside" component={renderTextField}/>

            <FieldArray name="descriptions" component={renderDescriptions}/>
            <FieldArray name="features" component={renderFeatures}/>
            <FieldArray name="faults" component={renderHistoryProblems}/>
            <Field name="fuelCity" component={renderTextField}/>
            <Field name="fuelHighway" component={renderTextField}/>

            <FieldArray name="images" component={renderImages}/>
            <Field name="isSold" component={renderCheckbox}/>
            <Field name="mileage" component={renderTextField} type="number"/>

            <h4>Performance</h4>

            <Field name="performance.compressionRatio" component={renderTextField} type="number"/>
            <Field name="performance.compressorType" component={renderTextField}/>
            <Field name="performance.configuration" component={renderTextField}/>
            <Field name="performance.cylinders" component={renderTextField}/>
            <Field name="performance.displacement" component={renderTextField}/>
            <Field name="performance.doors" component={renderTextField} type="number"/>
            <Field name="performance.drivenWheels" component={renderTextField}/>
            <Field name="performance.fuelType" component={renderTextField}/>
            <Field name="performance.horsePower" component={renderTextField} type="number"/>
            <Field name="performance.powerTrain" component={renderTextField}/>
            <Field name="performance.size" component={renderTextField} type="number"/>
            <Field name="performance.torque" component={renderTextField} type="number"/>
            <Field name="performance.totalValves" component={renderTextField} type="number"/>

            <hr/>

            <Field name="price" component={renderTextField} type="number"/>
            <Field name="registrationNumber" component={renderTextField}/>
            <Field name="safetyStars" component={renderTextField} type="number"/>
            <Field name="vinCode" component={renderTextField}/>

            <input type="submit" value="Submit"/>
            {/*<RaisedButton label="Submit" />*/}
          </form>

        )}
      </div>
    )
  }
}

export default Car;
