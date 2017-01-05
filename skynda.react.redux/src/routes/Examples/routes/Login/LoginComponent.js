/**
 * Created by zekar on 10/30/2016.
 */
import React from "react";
import {toastr} from "react-redux-toastr";
var NotificationSystem = require('react-notification-system');

class ToastrExample extends React.Component {
  render() {
    return (<div>
      <button
        onClick={() => toastr.success('Title', 'Message'/*, toastrOptions*/)}
        type="button">Toastr Success</button>
      <NotificationSystem ref="notificationSystem" />

      <button onClick={this._addNotification}>Add notification</button>
    </div>)
  }
}

export default ToastrExample;
