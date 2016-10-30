/**
 * Created by zekar on 10/30/2016.
 */
import React from "react";
import {toastr} from "react-redux-toastr";
var NotificationSystem = require('react-notification-system');

class ToastrExample extends React.Component {
  _addNotification = (event) => {
    event.preventDefault();
    this.refs.notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  };

  render() {
    const toastrOptions = {
      timeOut: 3000, // by setting to 0 it will prevent the auto close
      icon: 'my-icon-name',
      onShowComplete: () => console.log('SHOW: animation is done'),
      onHideComplete: () => console.log('HIDE: animation is done'),
      showCloseButton: false, // true by default
      component: React.component
    };



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
