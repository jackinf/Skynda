import React from 'react';
import { Field } from 'redux-form';

class ReduxFormView extends React.Component {
  static propTypes = {
    submitMyForm: React.PropTypes.func.isRequired
  };

  onSubmit = (e, values) => {
    e.preventDefault();
    console.log(values);
    this.props.submitMyForm();
    // this.props.submitUploadForm.bind(this);
  };

  render() {
    // return <div>Redux form view</div>;
    return (
      <div>
        <h3>Redux form example</h3>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component="input" type="text"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email"/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ReduxFormView;
