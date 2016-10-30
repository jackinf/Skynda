/**
 * Created by zekar on 10/30/2016.
 */
import React from "react";
import {toastr} from "react-redux-toastr";

class ToastrExample extends React.Component {
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
    </div>)
  }
}

export default ToastrExample;
