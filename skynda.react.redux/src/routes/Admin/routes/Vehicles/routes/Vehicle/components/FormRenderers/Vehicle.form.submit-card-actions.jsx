import React from "react";
import {CardActions} from 'material-ui/Card';

export default class SubmitCardActionsComponent extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool
  };

  render() {
    return (
      <CardActions>
        <hr/>
        <button className="btn btn-success vehicle-component--button-success"
                type="submit"
                disabled={this.props.disabled}>Save</button>
      </CardActions>
    )
  }
}
