import React from 'react';
import Slider from "rc-slider";
import {Row, Col} from 'react-bootstrap';
import reactMixin from 'react-mixin';

// mixins
import settimeoutMixin from '../../mixins/settimeout';

class SliderWrapper extends React.Component {

  onSliderChange = (value, name) => {

    // settimeout mixin. Optimization, which reduces number on render calls.
    this.clearTimeouts();
    this.setTimeout(() => {
      this.props.onSliderChange(value, name);
    }, 100);
  };

  render() {
    const { title, propertyName, min, max, units } = this.props;

    return (<div className='range-slider-wrapper'>
      <label>{title}</label>

      <Row className="range-slider-wrapper__labels">
        <Col md={6}>
          {min} {units}
        </Col>
        <Col md={6}>
          <span className="pull-right">
            {max} {units}
          </span>
        </Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Slider range allowCross={false} defaultValue={[0, 500000]} min={0} max={500000} step={100}
                  onChange={e => this.onSliderChange(e, propertyName)} />
        </Col>
      </Row>
    </div>);
  }
}

reactMixin(SliderWrapper.prototype, settimeoutMixin);

export default SliderWrapper;
