/**
 * Created by jevgenir on 2/4/2017.
 */

import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import {orange500} from "material-ui/styles/colors";

const styles = {
  backgroundDefault: "#019bff",
  errorStyle: {
    color: orange500
  },
  underlineFocusStyle: {
    borderColor: "#019bff"
  },
  floatingLabelFocusStyle: {
    color: "#019bff"
  },
  backgroundInkBar: {
    backgroundColor: "#1E88E5"
  }
};

const PersonInfoTab = (props) => (<li className='tab-pane fade active in' id='htab1'>
  <Row>
    <Col md={12}>
      <Row>
        <Col md={12}>
          <TextField
            floatingLabelText={<Translate value="details.components.checkout_panel.your_name"/>}
            fullWidth
            errorText={props.errors ? props.errors["fullName"] : ""}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => {props.person.fullName = e.target.value;}}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TextField
            type='email'
            floatingLabelText={<Translate value="details.components.checkout_panel.email"/>}
            fullWidth
            errorText={props.errors ? props.errors["email"] : ""}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => {
              props.person.email = e.target.value;
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TextField
            floatingLabelText={<Translate value="details.components.checkout_panel.phone"/>}
            fullWidth
            errorText={props.errors ? props.errors["phone"] : ""}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => {
              props.person.phone = e.target.value;
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TextField
            multiLine={true}
            rows={2}
            floatingLabelText={<Translate value="details.components.checkout_panel.add_comment"/>}
            fullWidth
            errorText={props.errors ? props.errors["comment"] : ""}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => {
              props.person.comment = e.target.value;
            }}
          />
        </Col>
      </Row>
      <Row className='dialog-btn-footer'>
        <Col md={12}>
          <RaisedButton
            label={<Translate value="details.components.checkout_panel.btn_send"/>}
            className='tab_action_button pull-right'
            backgroundColor={styles.backgroundDefault}
            labelStyle={{color: "white", weight: 600}}
            onTouchTap={props.displaySuccessPopup}
          />
        </Col>
      </Row>
    </Col>
  </Row>
</li>);

PersonInfoTab.propTypes = {
  person: React.PropTypes.shape({
    fullName: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    comment: React.PropTypes.string
  }),
  displaySuccessPopup: React.PropTypes.func.isRequired
};

export default PersonInfoTab;
