import React from "react";
import '../details.scss';

class Skblock extends React.Component {
  render() {
    return (<div className="row sk_details__skblock">
      <h4 className="blue_header">{this.props.header}</h4>
      <div>{ this.props.children }</div>
    </div>);
  }
}

export default Skblock;
