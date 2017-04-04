import React from "react";
import {CardActions} from 'material-ui/Card';
import LaddaButton, { S, SLIDE_UP } from 'react-ladda';
import "./Vehicle.form.submit-card-actions.scss";

export default class SubmitCardActionsComponent extends React.Component {
  static propTypes = {
    disabled: React.PropTypes.bool,
    onSubmit: React.PropTypes.func.isRequired
  };

  render() {
    return (
      <CardActions>
        <hr/>
        <LaddaButton
          loading={this.props.disabled}
          onClick={e => {
            e.preventDefault();
            this.props.onSubmit();
          }}
          className={"btn save-vehicle__button-submit"}
          style={{backgroundColor: "#5cb85c !important"}}
          data-color="#eee"
          data-size={S}
          data-style={SLIDE_UP}
          data-spinner-size={30}
          data-spinner-color="#ddd"
          data-spinner-lines={12}
        >
          Save
        </LaddaButton>
        {/*<button className="btn btn-success vehicle-component--button-success"*/}
                {/*onClick={e => {*/}
                  {/*e.preventDefault();*/}
                  {/*this.props.onSubmit();*/}
                {/*}}*/}
                {/*disabled={this.props.disabled}>Save</button>*/}
      </CardActions>
    )
  }
}
