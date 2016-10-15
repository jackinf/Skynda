/**
 * Created by jevgenir on 24/09/2016.
 */

import React from "react";
import "./CarSearchButtonGroup.scss";
import {Button, Col} from "react-bootstrap";

// TODO: fix icon import
// import a from 'react-icons/md/done.js';
let IconBase = require("react-icon-base");
class MdDone extends React.Component {
  render() {
    return (
      <IconBase viewBox='0 0 40 40' {...this.props}>
        <g>
          <path d='m15 27l17.7-17.7 2.3 2.3-20 20-9.3-9.3 2.3-2.3z'/>
        </g>
      </IconBase>
    );
  }
}

class ButtonGroup extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggle(option) {
    option.toggled = !option.toggled;
    if (option.id === -1) {
      this.toggleAll(option.toggled);
    } else {
      var all = this.props.options.find((item) => item.id === -1);
      if (all) {
        all.toggled = false;
      }
    }

    this.forceUpdate();
  };

  toggleAll(value) {
    for (var i = 0; i < this.props.options.length; i++) {
      var option = this.props.options[i];
      option.toggled = value;
    }
  }

  render() {
    var mdCol = this.props.md ? this.props.md : 2;
    var smCol = this.props.sm ? this.props.sm : 4;
    var xsCol = this.props.xs ? this.props.xs : 4;

    return (<div className='list-inline'>
      {this.props.options.map((option, key) => {
        const style = option.style ? option.style : this.props.shape === "circle" ? {} : {width: "100%"};

        let classNameShape = (this.props.shape === "circle" ? "btn-group__circle" : "btn-group__element-button");
        let classNameToggle = (option.toggled ? "btn-group__element-button-toggled" : "");

        return (<Col md={mdCol} sm={smCol} xs={xsCol} key={key} className='btn-group__element'>
          <Button
            style={style}
            className={`btn-group__element-button ${classNameToggle} ${classNameShape}`}
            bsStyle={(!option.toggled ? "default" : "primary")}
            onClick={e => this.toggle(option)}>
            {option.hideName ? <MdDone /> : option.name}
          </Button>
        </Col>);
      })}
    </div>);
  }
}

ButtonGroup.propTypes = {
  md: React.PropTypes.number,
  sm: React.PropTypes.number,
  xs: React.PropTypes.number,
  shape: React.PropTypes.string,
  options: React.PropTypes.arrayOf(React.PropTypes.shape({
    toggled: React.PropTypes.bool,
    hideName: React.PropTypes.bool,
    name: React.PropTypes.name
  }))
};

export default ButtonGroup;
