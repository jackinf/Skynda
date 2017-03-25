import React, {PropTypes} from 'react'
import {Row, Col} from "react-bootstrap";
import {Translate, I18n } from 'react-redux-i18n';
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import Dialog from 'material-ui/Dialog'
import {reduxForm} from "redux-form";
import "./Subscribe.scss";
import {rowWrapper} from "./helpers"
import LaddaButton, { S, SLIDE_UP } from 'react-ladda';
import {FORM_NAME__SUBSCRIBE} from "../constants/Subscribe.constants";

const buttonSaveText = I18n.t("buttontexts.save");
const responseText = <Translate value="components.subscribe.thank_you"/>;
const mainText = <Translate value="components.subscribe.main_txt"/>;
const hintText = <Translate value="components.subscribe.hint_txt"/>;

class SubscribeComponent extends React.Component {
  static propTypes = {
    errors: React.PropTypes.object,
    isFetching: React.PropTypes.bool,
    isSubscribed: React.PropTypes.bool
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.submitForm();
  }

  render() {
    const {isSubscribed, onHandleDialogClose, errors, isFetching} = this.props;

    return (
      <div className="subscribe-container">

        <Dialog modal={false} open={isSubscribed} onRequestClose={onHandleDialogClose}>
          {responseText}
        </Dialog>

        {!isSubscribed && (
          <form onSubmit={this.onSubmit.bind(this)}>
            <Row>
              <Col xs={12}>
                <h3 className='primary-header-2 text-center'>
                  {mainText}:
                </h3>
              </Col>
            </Row>
            {rowWrapper(<Field name="email" component={TextField} hintText={hintText} errorText={errors && errors["email"]} />)}

            {rowWrapper(<LaddaButton
              loading={isFetching}
              className={"primary-button btn btn-default"}
              data-color="#eee"
              data-size={S}
              data-style={SLIDE_UP}
              data-spinner-size={30}
              data-spinner-color="#ddd"
              data-spinner-lines={12}
            >
              {buttonSaveText}
            </LaddaButton>)}
          </form>)
        }
      </div>
    );
  }
}

export default reduxForm({form: FORM_NAME__SUBSCRIBE})(SubscribeComponent)
