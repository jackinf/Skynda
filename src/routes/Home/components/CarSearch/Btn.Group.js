/**
 * Created by jevgenir on 24/09/2016.
 */

import React from "react";
import "./Btn.Group.scss";
import {Button, Col} from "react-bootstrap";

import MdDone from 'react-icons/lib/md/done';

class ButtonGroup extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  updateButtonGroupValues = (option) =>{
    this.props.onToggle({
      type: this.props.type,
      value: option.id,
      isToggled: option.toggled
    });
  };

  toggle(option) {
    option.toggled = !option.toggled;
    if (option.id === -1) {
      this.toggleAll(option.toggled);
    } else {
      var all = this.props.options.find((item) => item.id === -1);
      if (all) {
        all.toggled = false;
      }

      this.updateButtonGroupValues(option);
    }

    this.forceUpdate();
  };

  toggleAll(value) {
    for (var i = 0; i < this.props.options.length; i++) {
      var option = this.props.options[i];
      option.toggled = value;
      this.updateButtonGroupValues(option);
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

        return (<Col md={mdCol} sm={smCol} xs={xsCol} key={key} className='btn-group'>
          <Button
            style={style}
            className={`btn-group__element-button ${classNameToggle} ${classNameShape}`}
            bsStyle={(!option.toggled ? "default" : "primary")}
            onClick={e => this.toggle(option)}>
            {option.hideName && option.toggled
              ? <MdDone style={ option.name === "white"
                ? {color: "black"}
                : {}} />
              : option.hideName ? "" : option.name}
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
  })).isRequired,
  type: React.PropTypes.string.isRequired
};

export default ButtonGroup;
