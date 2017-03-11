/**
 * Created by zekar on 2/24/2017.
 */

import React from "react";
import "./TrivenLoader.component.scss";

export default class TrivenLoader extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired
  };

  render() {
    const isLoading = this.props.isLoading;

    return (<div className={isLoading ? "triven-loader-wrapper": ""}>
      {isLoading ?  <div className="triven-loader"></div> : ""}
      <span className={isLoading ? "triven-loader-disabler" : ""}>
        {this.props.children}
      </span>
    </div>);
  }
}
