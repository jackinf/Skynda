import React from "react";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../details.scss';

class Skblock extends React.Component {
  render() {
    return (<div className={`row ${s.sk_details__skblock}`}>
      <h4 className={s.blue_header}>{this.props.header}</h4>
      <div>{ this.props.children }</div>
    </div>);
  }
}

export default withStyles(s)(Skblock);
