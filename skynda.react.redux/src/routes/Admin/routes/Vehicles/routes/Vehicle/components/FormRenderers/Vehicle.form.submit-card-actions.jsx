import React from "react";
import {CardActions} from 'material-ui/Card';

export default class SubmitCardActionsComponent extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <CardActions>
        <hr/>
        <button className="btn btn-success vehicle-component--button-success"
                onClick={this.props.onSubmit}
                disabled={this.props.disabled}>Save</button>
      </CardActions>
    )
  }
}
