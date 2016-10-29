import React from "react";
import "../Details.scss";

class BlockContainer extends React.Component {
  render() {
    return (<div className='row sk_details__skblock'>
      <h4 className='blue_header'>{this.props.header}</h4>
      <div>{ this.props.children }</div>
    </div>);
  }
}

BlockContainer.propTypes = {
  header: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object]).isRequired,
  children: React.PropTypes.node
};

export default BlockContainer;
