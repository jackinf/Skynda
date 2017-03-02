import React from 'react';
import {Field, change} from 'redux-form';
import {ROUTE_PARAMS, FORMS} from "../Feature.constant";
import {onFormSubmitSuccess, formSubmit} from "../actions";
import {TextFieldForFeature, TextAreaForFeature, CheckboxForFeature} from "./Feature.renderers";

class Feature extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    formSubmit: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    clear: React.PropTypes.func.isRequired,
    onSubmitCustom: React.PropTypes.func,
    formModeFeature: React.PropTypes.string.isRequired,
    getFeatures: React.PropTypes.func.isRequired

  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.FEATURE_ID]
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.FEATURE_ID]);
    this.props.dispatch(change(FORMS.FEATURE_FORM, "isImported", false));
    // if(this.props.params[ROUTE_PARAMS.VEHICLE_ID]){
    //   this.props.dispatch(change(FORMS.FEATURE_FORM, "vehicleId", this.props.params[ROUTE_PARAMS.VEHICLE_ID]));
    //   this.props.dispatch(change(FORMS.FEATURE_FORM, "isModal", true));
    // }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  /*
   *  Form submit logic. Saves or updates
   */
  onSubmit(e) {
    let promise = this.props.handleSubmit(data => formSubmit(data, this.props.formModeFeature))(e);
    promise && promise.then(response => {
      console.log("handleSubmit", response);
      if(response.modelState){
        this.props.errors = response.modelState;
      }else{
        onFormSubmitSuccess(response, this.props.getFeatures, this.props.onSubmitCustom);
      }

    }).catch(err => console.log("hamde", err));
  };

  render() {

    const errors = this.props.errors;
    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
            <form onSubmit={this.onSubmit.bind(this)}>
              {errors != null && errors ?
              errors : "no error"}
              <h3>{this.props.formModeFeature}</h3>

              <div>Feature ID: {this.props.params[ROUTE_PARAMS.FEATURE_ID]}</div>

              <TextFieldForFeature name="name" label="Feature Name *"/>
              <TextFieldForFeature name="value" label="Value *"/>
              <TextAreaForFeature name="description" label="Description"/>
              <TextFieldForFeature name="weight" label="Order weight"/>
              <CheckboxForFeature name="isActive" label="Is Active?"/>

              <button type="submit" disabled={this.props.submitting}>Submit</button>
            </form>

          )}
      </div>
    )
  }
}

export default Feature;
