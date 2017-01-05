/**
 * Created by jevgenir on 11/8/2016.
 */

import React from "react";
import {Row, Col, Button} from "react-bootstrap";
import {TwitterPicker} from 'react-color';
import Select from "react-select";

/**
 * Wraps a login-register row consistently
 * @param block
 */
export const rowWrapper = (block) =>
  (<Row style={{"margin": "4px", "padding": "4px"}}>
    <Col xs={12} >{block}</Col>
  </Row>);

export const rowWrapperCentered = (block, bsWidth = 6) =>
  (<Row style={{"margin": "0 4px 4px 4px", "padding": "4px"}}>
    <Col xs={12} sm={bsWidth} smOffset={(12-bsWidth)/2}>{block}</Col>
    <Col sm={(12-bsWidth)/2}></Col>
  </Row>);


export const selectRenderer = (items, onChange, isMulti = false) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label" htmlFor={input.name}>{label}</label>
      <Select name={input.name} value={input.value} options={items} onChange={value => onChange(input.name, value)}
              multi={isMulti}
      />
    </Col>
  </Row>
);

export const buttonRenderer = (items, onChange) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
      <br />
      {items.map((item, i) => (<Button key={i}
                                       className={input.value === item.value ? "sell-your-car__button-active" : "sell-your-car__button"}
                                       onClick={e => onChange(input.name, item.value)}>
        {item.label}
      </Button>))}
    </Col>
  </Row>
);

export const circleButtonRenderer = (items, onChange) => ({input, label, meta: {touched, error}, ...custom}) => (
  <Row style={{marginBottom: "10px"}}>
    <Col sm={12}>
      <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
      <br />
      {items.map((item, i) => (<Button key={i}
                                       className={input.value === item ? "sell-your-car__circle-button-active" : "sell-your-car__circle-button"}
                                       onClick={e => onChange(input.name, item)}>
        {item}
      </Button>))}
    </Col>
  </Row>
);

export class ColorRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  onToggle = () => {
    this.setState({expanded: !this.state.expanded})
  };

  onChangeComplete = (color, event) => {
    this.onToggle({expanded: false});
    this.props.onChangeComplete(this.props.input.name, color, event);
  };

  render() {
    const {input, label} = this.props;

    return (
      <Row style={{marginBottom: "10px"}}>
        <Col sm={12}>
          <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
          <div style={{background: input.value || "black"}}
               className="sell-your-car__color-renderer-display"
               onClick={e => this.onToggle()}>&nbsp;</div>

          {this.state.expanded
            ? (<TwitterPicker onChangeComplete={this.onChangeComplete} color={input.value} triangle="hide"/>)
            : ""}
        </Col>
      </Row>
    );
  }
}
