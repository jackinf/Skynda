import React from 'react';
import {Field, change} from 'redux-form';
import {Row, Col, Button} from "react-bootstrap";
import {TextField} from 'redux-form-material-ui'
import {ROUTE_PARAMS, FORMS} from "../../../constants/VehicleReview.constant";
import {VehiclesSelectField} from "./FormRenderers";
import {ErrorBlockRenderer} from "../../../../../components/FormRenderers";


class VehicleReview extends React.Component {
  static propTypes = {
    isFetching: React.PropTypes.bool.isRequired,
    onHandleSubmit: React.PropTypes.func.isRequired,
    load: React.PropTypes.func.isRequired,
    getVehiclesList: React.PropTypes.func.isRequired,

    onSubmitCustom: React.PropTypes.func,

    // vehicle review data
    initialValues: React.PropTypes.shape({
      // TODO
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params[ROUTE_PARAMS.VEHICLE_REVIEW_ID]
    };
  }

  componentDidMount() {
    this.props.load(this.props.params[ROUTE_PARAMS.VEHICLE_REVIEW_ID], () => {
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REVIEW, "vehicleId", this.props.params[ROUTE_PARAMS.VEHICLE_ID]));
      this.props.dispatch(change(FORMS.VEHICLE_FORM_REVIEW, "isModal", true));
    });

    if(isNaN(this.props.params[ROUTE_PARAMS.VEHICLE_ID])){
      this.props.getVehiclesList();
    }
  }

  render() {
    const vehicleId = this.props.params[ROUTE_PARAMS.VEHICLE_ID];
    const errors = this.props.errors;

    return (<div>
        {this.props.isFetching || this.props.submitting ? "Loading..." : (
          <form>
            <ErrorBlockRenderer errors={errors}/>

            {
              vehicleId?
                <div>VehicleId: {vehicleId}</div>
                : <VehiclesSelectField name="vehicleId" label="Vehicle *" vehicles={this.props.vehicles} />
            }

            <Row>
              <Col sm={12}>
                <Field name="text" component={TextField} hintText="Text" style={{width: '100%'}} />
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Field name="rating" component={TextField} hintText="Rating" type="number" max="5" min="0"/>
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Field name="logoUrl" component={TextField} hintText="Logo URL" style={{width: '100%'}} />
              </Col>
            </Row>

            <Row>
              <Col sm={12}>
                <Field name="videoUrl" component={TextField} hintText="Video URL" style={{width: '100%'}} />
              </Col>
            </Row>

            <Button onClick={e => this.props.onHandleSubmit(this.props.onSubmitCustom)}>Submit</Button>
          </form>

        )}
      </div>
    )
  }
}

export default VehicleReview;
