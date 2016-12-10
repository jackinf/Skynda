import React, {PropTypes} from 'react'
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import {rowWrapper} from "./helpers"
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import "./Subscribe.scss";
import {reduxForm} from "redux-form";
import {sendSubscriptionEmail} from "../actions/subscribe.redux-form.actions";

class Subscribe extends React.Component {
  onSubmit(e) {
    let promise = this.props.handleSubmit(data => sendSubscriptionEmail(data, this.props.formInfo.values.email))(e);
    promise && promise
      .then(resp =>  {
        this.props.onHandleSubmitFinished(resp);
      })
  }

  render() {
    return (
      <div className="subscribe-container">
        {this.props.isSubscribed
          ? (<Row>Aitäh, hoiame teid kursis.</Row>)
          : (<form onSubmit={this.onSubmit.bind(this)}>
            <Row>
              <Col xs={12}>
                <h3 className='primary-header-2 text-center'>
                  Soovid rohkem teada meie tegevustest? Jäta oma kontakt:
                </h3>
              </Col>
            </Row>
            {rowWrapper(<Field name="email" component={TextField} hintText="hello"/>)}
            <input className="primary-button btn btn-default" type="submit" value={"Submit"}/>
          </form>)
        }

      </div>
    );
  }
}

export default reduxForm({form: "subscribeModelForm"})(Subscribe)
