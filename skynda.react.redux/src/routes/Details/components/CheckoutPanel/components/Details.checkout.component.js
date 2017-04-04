import React from "react";
import "./Details.checkout.component.scss";
import {Tabs, Tab} from "material-ui/Tabs";
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import PersonInfoTab from "./Details.checkout.person-info-tab.component";

const styles = {
  backgroundInkBar: {
    backgroundColor: "#1E88E5"
  }
};

class Checkout extends React.Component {

  constructor(props) {
    super(props);

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
        vehiclePk: props.id
      }
    };
  }

  submitAsync = () => {
    this.props.submitAsync(this.state.personDetails);
  };

  render() {
    const contactUsText = <Translate value="details.components.checkout_panel.contact_us_txt"/>;

    return (<div className='sk_details__checkout_container'>

      <Tabs inkBarStyle={styles.backgroundInkBar}>
        <Tab label={contactUsText}
             className='sk_details__checkout_tab'>
          <div className='sk_details__checkout_tab_inner'>
            <PersonInfoTab
              submitAsync={this.submitAsync}
              isSubmitting={this.props.isSubmitting}
              person={this.state.personDetails}
              errors={this.props.errors}
            />
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
