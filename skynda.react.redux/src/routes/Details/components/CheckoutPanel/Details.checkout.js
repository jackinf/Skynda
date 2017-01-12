import React from "react";
import "./Details.checkout.scss";
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import {Tabs, Tab} from "material-ui/Tabs";
import {Row, Col} from "react-bootstrap";
import {orange500} from "material-ui/styles/colors";
import {Translate} from 'react-redux-i18n';

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

// TODO: to separate file
const PersonInfoTab = (props) => (<li className='tab-pane fade active in' id='htab1'>
  <Row>
    <Col md={12}>
      <Row>
        <Col md={12}>
          <TextField
            floatingLabelText={<Translate value="details.components.checkout_panel.your_name"/>}
            fullWidth
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            underlineFocusStyle={styles.underlineFocusStyle}
            onChange={e => {
              props.person.firstName = e.target.value;
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <TextField
            type='email'
            floatingLabelText={<Translate value="details.components.checkout_panel.email"/>}
            fullWidth
            errorText=""
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
    firstName: React.PropTypes.string.isRequired,
    email: React.PropTypes.string.isRequired,
    phone: React.PropTypes.string.isRequired,
    comment: React.PropTypes.string
  }),
  displaySuccessPopup: React.PropTypes.func.isRequired
};

class Checkout extends React.Component {

  constructor(props) {
    super(props);

    // TODO: Redux
    this.state = {
      tab: 1,
      openSentMsg: false,
      personDetails: {
        firstName: "",
        email: "",
        phone: ""
      }
    };
  }

  handleClose = () => {
    this.setState({openSentMsg: false});
  };

  displaySuccessPopup = async() => {
    await this.props.sendEmailAsync(this.state.personDetails);
    this.setState({openSentMsg: true});
  };

  render() {
    const contactText = <Translate value="details.components.checkout_panel.contact_24h_txt"/>;
    const contactUsText = <Translate value="details.components.checkout_panel.contact_us_txt"/>;
    const thankYouText = "Aitäh";

    return (<div className='sk_details__checkout_container'>
      <Dialog
        title={thankYouText + this.state.personDetails.firstName + "!"}
        modal={false}
        open={this.state.openSentMsg}
        onRequestClose={this.handleClose}
      >
        {contactText}
      </Dialog>

      <Tabs inkBarStyle={styles.backgroundInkBar}>
        <Tab label={contactUsText}
             className='sk_details__checkout_tab'>
          <div className='sk_details__checkout_tab_inner'>
            <PersonInfoTab displaySuccessPopup={this.displaySuccessPopup} person={this.state.personDetails}/>
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
