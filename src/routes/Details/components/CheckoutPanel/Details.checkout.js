/**
 * Created by zekar on 9/15/2016.
 */

import React from "react";
import "./Details.checkout.scss";

// Material-UI
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Tabs, Tab } from "material-ui/Tabs";
import { Row, Col } from "react-bootstrap";
import { orange500 } from "material-ui/styles/colors";
import translations from "../../../../store/locales/et";

const styles = {
  backgroundDefault:"#019bff",
  errorStyle: {
    color: orange500
  },
  underlineFocusStyle: {
    borderColor: "#019bff"
  },
  floatingLabelFocusStyle: {
    color: "#019bff"
  },
  backgroundInkBar:{
    backgroundColor: "#1E88E5"
  }
};

const tempTab = (props) => (<li className='tab-pane fade active in' id='htab1'>
  <Row>
    <Col md={12}>
      <Row>
        <Col md={6}>
          <TextField
            floatingLabelText={translations.routes.details.components.checkout_panel.first_name}
            fullWidth
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => props.person.firstName = e.target.value}
          />
        </Col>
        <Col md={6}>
          <TextField
            floatingLabelText={translations.routes.details.components.checkout_panel.last_name}
            fullWidth
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => props.person.lastName = e.target.value}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <TextField
            type='email'
            floatingLabelText={translations.routes.details.components.checkout_panel.email}
            fullWidth
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => props.person.email = e.target.value}
          />
        </Col>
        <Col md={6}>
          <TextField
            floatingLabelText={translations.routes.details.components.checkout_panel.phone}
            fullWidth
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => props.person.phone = e.target.value}
          />
        </Col>
      </Row>
      <Row className='dialog-btn-footer'>
        <Col md={12}>
          <RaisedButton
            label={translations.routes.details.components.checkout_panel.btn_send}
            className='sk_details__checkout_tab_action_button pull-right'
            backgroundColor={styles.backgroundDefault}
            labelStyle={{ color:"white", weight: 600 }}
            onTouchTap={props.displaySuccessPopup}
          />
        </Col>

      </Row>
    </Col>
  </Row>
</li>);

class Checkout extends React.Component {

  constructor (props) {
    super(props);
    this.state = { tab: 1, openSentMsg: false,
      personDetails: {
        firstName: "",
        lastName: "",
        email: "",
        mobilePhone: ""
      }
    };
  }

  handleClose = () => {
    this.setState({ openSentMsg: false });
  };

  displaySuccessPopup = async () => {
    await this.props.sendEmailAsync(this.state.personDetails);
    this.setState({ openSentMsg: true });
  };

  render () {
    return (<div className='sk_details__checkout_container'>

      <Dialog
        title={"Aitäh " + this.state.personDetails.firstName + "!"}
        modal={false}
        open={this.state.openSentMsg}
        onRequestClose={this.handleClose}
      >
        {translations.routes.details.components.checkout_panel.contact_24h_txt}
      </Dialog>

      <Tabs inkBarStyle={styles.backgroundInkBar}>
        <Tab label={translations.routes.details.components.checkout_panel.contact_us_txt} className='sk_details__checkout_tab'>
           <div className='sk_details__checkout_tab_inner'>
            {tempTab({
              displaySuccessPopup: this.displaySuccessPopup,
              person: this.state.personDetails
            })}
          </div>
        </Tab>
      </Tabs>

    </div>);
  }
}

Checkout.propTypes = {
  sendEmailAsync: React.PropTypes.func.isRequired
};

export default Checkout;
