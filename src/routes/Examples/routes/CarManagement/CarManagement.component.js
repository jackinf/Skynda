import React from 'react';
import {Field} from 'redux-form';

class ReduxFormView extends React.Component {
  static propTypes = {
    submitUploadForm: React.PropTypes.func.isRequired
  };

  onSubmit = (e, values) => {
    e.preventDefault();
    console.log(values);
    this.props.submitUploadForm();
  };

  render() {
    return (
      <div>
        <h3>Car management example</h3>
        <form onSubmit={this.onSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default ReduxFormView;
