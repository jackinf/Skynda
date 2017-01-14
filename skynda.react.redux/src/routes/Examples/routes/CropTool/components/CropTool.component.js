/**
 * Created by jevgenir on 1/14/2017.
 */
import React from "react";
import {Field} from "redux-form";
import ReduxFormCropTool from "../../../../../components/ReduxForm/CropTool";
import "./CropTool.component.scss";
import {Row, Col} from "react-bootstrap";
import {reduxForm} from "redux-form";

const reduxFormName = "cropToolForm";
class CropToolComponent extends React.Component {
  onSubmit = (e, values) => {
    e.preventDefault();
    console.log(values);
    this.props.cropImageAsync();
  };

  render() {
    const errors = [];

    return (
      <div>
        <h3>Redux form example</h3>
        <form onSubmit={this.onSubmit}>
          <Row className="spacefix">
            <Col xs={12}>
              <ReduxFormCropTool
                name="image"
                reduxFormName={reduxFormName}
                title="Image"
                errors={errors}
              />
            </Col>
          </Row>
          <button className="btn btn-success spacefix" type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

// Decorate the form component
const FormCropToolComponent = reduxForm({
  form: reduxFormName // a unique name for this form
})(CropToolComponent);
export default FormCropToolComponent;
