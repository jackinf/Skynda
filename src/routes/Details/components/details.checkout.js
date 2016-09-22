/**
 * Created by zekar on 9/15/2016.
 */

import React from 'react';
import '../details.scss';

// Material-UI
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import RaisedButton from 'material-ui/RaisedButton';
// import {List, ListItem} from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
// import Checkbox from 'material-ui/Checkbox';
// import TextField from 'material-ui/TextField';
// import {Tabs, Tab} from 'material-ui/Tabs';
import {Tabs, Tab, ListGroup, ListGroupItem, Modal, Button, FormControl } from 'react-bootstrap';

function TextField({id, ...props}) {
  return (<FormControl
    id="formControlsText"
    type="text"
    label={props.floatingLabelText}
  />);
}

class ListItemText extends React.Component {
  render() {
    return (<div>{this.props.text} <p className="sk_details__checkout_price">{this.props.price}</p></div>);
  }
}

const tab1 = (<li className="tab-pane fade active in" id="htab1">
  <div className="row">
    <div className="col-md-12">
      <ListGroup>
        <ListGroupItem header="Car price" bsStyle="info">5600 €</ListGroupItem>
        <ListGroupItem header="Insurance by Salva">20 €</ListGroupItem>
        <ListGroupItem header="Kasko by Salva">40 €</ListGroupItem>
        <ListGroupItem header="Full Tank on Delivery">70 €</ListGroupItem>
        <ListGroupItem header="Other">18 €</ListGroupItem>
        <ListGroupItem header="Service">109 €</ListGroupItem>
      </ListGroup>
    </div>
  </div>
</li>);
const tab2 = (<li className="tab-pane fade active in" id="htab2">
  <div className="row">
    <div className="col-md-12">
      <ListGroup>
        <ListGroupItem header="Car price">5600 €</ListGroupItem>
        <ListGroupItem header="Insurance by Salva">0 €</ListGroupItem>
        <ListGroupItem header="Kasko by Salva">0 €</ListGroupItem>
        <ListGroupItem header="Full Tank on Delivery">0 €</ListGroupItem>
        <ListGroupItem header="Other">0 €</ListGroupItem>
        <ListGroupItem header="Service">0 €</ListGroupItem>
      </ListGroup>
    </div>

    <div className="col-md-12">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere hic qui non placeat ad explicabo
        dignissimos amet iusto veniam!</p>
      <p>Quo expedita tempore modi minima at adipisci saepe excepturi alias consequuntur sunt asperiores enim ut
        assumenda hic vitae, odio deleniti illo, veniam quas!</p>
    </div>
  </div>
</li>);


class CheckoutDialogContent extends React.Component {
  render() {
    return (<div>
      <div className="row">
        <div className="col col-md-6">
          <TextField floatingLabelText="First name" fullWidth={true}/>
        </div>
        <div className="col col-md-6">
          <TextField floatingLabelText="Last name" fullWidth={true}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <TextField floatingLabelText="E-mail" fullWidth={true}/>
        </div>
        <div className="col col-md-6">
          <TextField floatingLabelText="Phone Number" fullWidth={true}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12">
          <TextField floatingLabelText="ID Number" fullWidth={true}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12">
          <TextField floatingLabelText="Billing Address" fullWidth={true}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-12">
          <TextField floatingLabelText="Shipping Address" fullWidth={true}/>
        </div>
      </div>
      <div className="row">
        <div className="col col-md-6">
          <TextField floatingLabelText="Delivery Date" fullWidth={true}/>
        </div>
        <div className="col col-md-6">
          <TextField floatingLabelText="Delivery Time" fullWidth={true}/>
        </div>
      </div>
    </div>);
  }
}

class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tab: 1, open: false};
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (<div className="sk_details__checkout_container">

      <Modal show={this.state.open} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>One More Step</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CheckoutDialogContent />*
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Buy</Button>
          <Button onClick={this.handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>


      <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
        <Tab eventKey={1} title={`Buying car`}>
          <div className="sk_details__checkout_tab_inner">
            {tab1}
            <Button className="sk_details__checkout_tab_action_button" onClick={this.handleOpen}>Checkout</Button>
          </div>
        </Tab>

        <Tab eventKey={2} title="Leasing car">
          <div className="sk_details__checkout_tab_inner">
            {tab2}
            <Button className="sk_details__checkout_tab_action_button" onClick={this.handleOpen}>Lease</Button>
          </div>
        </Tab>
      </Tabs>

    </div>);
  }
}

export default Checkout;
