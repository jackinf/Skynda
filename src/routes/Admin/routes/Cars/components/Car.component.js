/**
 * Created by jevgenir on 10/21/2016.
 */
import React from 'react';
import {Field} from 'redux-form';

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
          <div>
            <label htmlFor="model">Model</label>
            <Field name="model" component="input" type="text"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default Car;
