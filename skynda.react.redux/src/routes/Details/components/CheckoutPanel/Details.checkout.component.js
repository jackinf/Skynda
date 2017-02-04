import React from "react";
import "./Details.checkout.component.scss";
import Dialog from "material-ui/Dialog";
import {Tabs, Tab} from "material-ui/Tabs";
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import PersonInfoTab from "./Details.checkout.PersonInfoTab.component";

const styles = {
  backgroundInkBar: {
    backgroundColor: "#1E88E5"
  }
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
    const contactUsText = <Translate value="details.components.checkout_panel.contact_us_txt"/>;

    return (<div className='sk_details__checkout_container'>

      <Tabs inkBarStyle={styles.backgroundInkBar}>
        <Tab label={contactUsText}
             className='sk_details__checkout_tab'>
          <div className='sk_details__checkout_tab_inner'>
            {this.props.isSuccessfullySent ? (
                <Row>
                  <Col sm={12}>
                    <h5>Täname! Võtame sinuga 2 tööpäeva jooksul ühendust.</h5>
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
