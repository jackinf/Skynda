import React from "react";
import "./Details.checkout.component.scss";
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

class Checkout extends React.Component {

  constructor(props) {
    super(props);

    // console.info("Checkout, vehicle id", props.id);

    // TODO: Redux
    this.state = {
      tab: 1,
      id: props.id,
      openSentMsg: false,
      personDetails: {
        fullName: "",
        email: "",
        phone: "",
        comment: "",
        carPk: props.id
      }
    };
  }

  handleClose = () => {
    this.setState({openSentMsg: false});
  };

  displaySuccessPopup = async() => {
    await this.props.submitAsync(this.state.personDetails);
  };

  render() {
    const contactText = <Translate value="details.components.checkout_panel.contact_24h_txt"/>;
    const contactUsText = <Translate value="details.components.checkout_panel.contact_us_txt"/>;
    const thankYouText = "Aitäh";

    return (<div className='sk_details__checkout_container'>

      {/* TODO: Dialog not needed. Remove. */}
      <Dialog
        title={thankYouText + this.state.personDetails.fullName + "!"}
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
            {this.props.isSuccessfullySent ? (
                <Row>
                  <Col sm={12}>
                    <h3>Täname! Võtame sinuga 2 tööpäeva jooksul ühendust.</h3>
                  </Col>
                </Row>
              ) : (
            <PersonInfoTab displaySuccessPopup={this.displaySuccessPopup}
                           person={this.state.personDetails}
                           errors={this.props.errors}
            />)}
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
