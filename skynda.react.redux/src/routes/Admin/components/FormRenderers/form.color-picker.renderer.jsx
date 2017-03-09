import React from "react";
import {Row, Col} from "react-bootstrap";
import "react-image-crop/dist/ReactCrop.css";
import {CirclePicker} from 'react-color';
import {colorHashes} from "../../../../utils/constants";

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
    this.props.onChangeComplete(this.props.input.name, color.hex, event);
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
            ? (<CirclePicker colors={colorHashes}
                             onChangeComplete={this.onChangeComplete}
                             color={input.value}
                             triangle="hide"/>)
            : ""}
        </Col>
      </Row>
    );
  }
}

export default ColorRenderer;
