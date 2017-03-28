import React from "react";
import {Dimmer, Loader, Segment} from 'semantic-ui-react';
// import '../../../node_modules/semantic-ui-css/semantic.css';
import "./TrivenLoader.component.scss";

export default class TrivenLoader extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired
  };

  render() {
    const isLoading = this.props.isLoading;

    return (
      <div className="triven-loader-semantic">
        <Segment >
          <Dimmer active={isLoading}>
            <Loader size="massive"/>
          </Dimmer>
          {this.props.children}
        </Segment>
      </div>
    );
  }
}
