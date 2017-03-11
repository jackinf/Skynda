import React from "react";
import {Row, Col} from "react-bootstrap";
import "react-image-crop/dist/ReactCrop.css";
import {CirclePicker} from 'react-color';
import {colorHashes} from "../../../../utils/constants";
import {OverlayTrigger, Popover} from "react-bootstrap";

export class ColorRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
  }

  onChangeComplete = (color, event) => {
    this.props.onChangeComplete(this.props.input.name, color.hex, event);
  };

  render() {
    const {input, label} = this.props;

    const popoverBottom = (
      <Popover id="popover-positioned-bottom">
        <CirclePicker colors={colorHashes} onChangeComplete={this.onChangeComplete} color={input.value} triangle="hide"/>
      </Popover>);

    return (
      <Row style={{marginBottom: "10px"}}>
        <Col sm={12}>
          <label className="sell-your-car__label"  htmlFor={input.name}>{label}</label>
          <OverlayTrigger trigger="click" placement="bottom" overlay={popoverBottom} rootClose>
            <div style={{background: input.value || "black"}}
                 className="sell-your-car__color-renderer-display">&nbsp;</div>
          </OverlayTrigger>
        </Col>
      </Row>
    );
  }
}

export default ColorRenderer;
