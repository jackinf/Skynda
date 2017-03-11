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
    return (<div className={this.props.isLoading ? "triven-loader-wrapper": ""}>
      {this.props.isLoading ?  <div className="triven-loader"></div> : ""}
      {this.props.children}
    </div>);
  }
}
