import React from "react";
import {Dimmer, Loader, Segment} from 'semantic-ui-react';
// import 'semantic-ui-css/semantic.css'; // TODO: Do not import this because it will break all the styles.
import 'semantic-ui-css/components/loader.css';
import 'semantic-ui-css/components/dimmer.css';
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
