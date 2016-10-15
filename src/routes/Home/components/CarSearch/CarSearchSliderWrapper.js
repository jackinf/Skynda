import React from "react";
import Slider from "rc-slider";
import {Row, Col} from "react-bootstrap";
import reactMixin from "react-mixin";

// mixins
import settimeoutMixin from "../../../../mixins/settimeout";

class SliderWrapper extends React.Component {

  title = "";
  step = null;
  minValue = null;
  maxValue = null;

  constructor(props) {
    super(props);

    this.title = props.title;
    this.step = props.step;
    this.minValue = props.min;
    this.maxValue = props.max;
  }

  onSliderChange = (value) => {
    // settimeout mixin. Optimization, which reduces number on render calls.
    this.clearTimeouts();
    this.setTimeout(() => {
      this.props.onSliderChange(value);
    }, 100);
  };

  render() {
    const {min, max, units} = this.props;

    return (<div className='range-slider-wrapper'>
      <label>{this.title}</label>

      <Row className='range-slider-wrapper__labels'>
        <Col md={6}>
          {min} {units}
        </Col>
        <Col md={6}>
          <span className='pull-right'>
            {max} {units}
          </span>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Slider range
            allowCross={false}
            defaultValue={[this.minValue, this.maxValue]}
            min={this.minValue}
            max={this.maxValue}
            step={this.step}
            onChange={this.onSliderChange} />
        </Col>
      </Row>
    </div>);
  }
}

SliderWrapper.propTypes = {
  title: React.PropTypes.string.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  units: React.PropTypes.string,
  onSliderChange: React.PropTypes.func.isRequired,
  step: React.PropTypes.number.isRequired
};

reactMixin(SliderWrapper.prototype, settimeoutMixin);

export default SliderWrapper;
