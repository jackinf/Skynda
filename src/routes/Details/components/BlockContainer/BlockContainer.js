import React from "react";
import "../Details.scss";
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';

const propTypes = {
  header: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object]).isRequired,
  children: React.PropTypes.node
};

class BlockContainerCard extends React.Component {
  static propTypes = propTypes;

  render() {
    return (<Card className='row sk_details__skblock'>
      <CardTitle title={this.props.header} className='blue_header'/>
      <CardText>{this.props.children}</CardText>
      <CardActions>
        {this.props.actions}
      </CardActions>
    </Card>);
  }
}

class BlockContainer extends React.Component {
  static propTypes = propTypes;

  render() {
    return (<div className='row sk_details__skblock'>
      <h4 className='blue_header'>{this.props.header}</h4>
      <div>{ this.props.children }</div>
    </div>);
  }
}

export default BlockContainer;
