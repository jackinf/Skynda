import React from "react";
import {Field, FieldArray} from 'redux-form';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import "./Vehicle.component.scss";

import {
  descriptionRenderer,
  selectFeaturesRenderer,
  SubmitCardActionsComponent as SubmitCardActions
} from "./FormRenderers";
import {renderTextField} from "../../../../../components/FormRenderers";

export default class VehicleReportsCardComponent extends React.Component {
  static propTypes = {
    featuresList: React.PropTypes.array.isRequired
  };

  render() {
    const featuresList = this.props.featuresList;

    return (
      <Card>
        <CardTitle title={<h3>Vehicle Features</h3>}/>
        <CardText>
          {featuresList && featuresList != null
            ?
            (
              <Field name="featuresAdminSelect"
                     label="Features select"
                     component={selectFeaturesRenderer(featuresList, this.props.setField, true)}
              />
            )
            : "Fetching..."}
        </CardText>

        <CardTitle title={<h3>Descriptions & addition info</h3>}/>
        <CardText>
          <FieldArray name="descriptions" label="Descriptions" component={descriptionRenderer}
          />
          <Field name="additional" label="Additional info" component={renderTextField}/>
        </CardText>
        {this.props.children}
      </Card>
    );
  }
}
