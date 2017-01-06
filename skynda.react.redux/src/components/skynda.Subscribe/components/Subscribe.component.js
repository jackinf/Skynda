import React, {PropTypes} from 'react'
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import Dialog from 'material-ui/Dialog'
import {reduxForm} from "redux-form";
import "./Subscribe.scss";
import {sendSubscriptionEmail} from "./subscribe.redux-form.actions";
import {rowWrapper} from "./helpers"

class SubscribeComponent extends React.Component {
  onSubmit(e) {
    let promise = this.props.handleSubmit(data => sendSubscriptionEmail(data, this.props.formInfo.values.email))(e);
    promise && promise.then(resp => {
      this.props.onHandleSubmitFinished(resp);
    });
  }

  render() {
    const {isSubscribed, onHandleDialogClose} = this.props;
    const buttonSaveText = <Translate value="components.subscribe.hint_txt" />;
    const responseText = <Translate value="components.subscribe.thank_you"/>;
    const mainText = <Translate value="components.subscribe.main_txt"/>;
    const hintText = <Translate value="components.subscribe.hint_txt"/>;
    return (
      <div className="subscribe-container">

        <Dialog modal={false} open={isSubscribed} onRequestClose={onHandleDialogClose}>
          {responseText}
        </Dialog>

        {!isSubscribed && (<form onSubmit={this.onSubmit.bind(this)}>
          <Row>
            <Col xs={12}>
              <h3 className='primary-header-2 text-center'>
                {mainText}:
              </h3>
            </Col>
          </Row>
          {rowWrapper(<Field name="email" component={TextField}
                             hintText={hintText}/>)}
                             <button>{buttonSaveText}</button>
          <input className="primary-button btn btn-default"
                 type="submit" value={buttonSaveText} />
        </form>)
        }
      </div>
    );
  }
}

export default reduxForm({form: "subscribeModelForm"})(SubscribeComponent)
