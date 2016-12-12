/**
 * Created by jevgenir on 12/11/2016.
 */

import React from "react";
import {Row, Col} from "react-bootstrap";
import RaisedButton from "material-ui/RaisedButton";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function priceFormatter(cell, row){
  return '<i class="glyphicon glyphicon-eur"></i> ' + cell;
}

export default class extends React.Component {
  render() {
    return (<div>

      <h3>Stages</h3>

      <Row>
        <Col sm={12}>
          <RaisedButton label={"Get all stages"} onClick={e => this.props.getAllStages()} />

          {/*{JSON.stringify(this.props.stages)}*/}

          <BootstrapTable data={this.props.stages} striped={true} hover={true}>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Stage ID</TableHeaderColumn>
            <TableHeaderColumn dataField="name" dataSort={true}>Stage Name</TableHeaderColumn>
          </BootstrapTable>
        </Col>
      </Row>

      <hr/>

      <h3>Deals</h3>

      <Row>
        <Col sm={12}>
          <RaisedButton label={"Get all deals"} onClick={e => this.props.getAllDeals()} />

          {/*{JSON.stringify(this.props.deals)}*/}

          <BootstrapTable data={this.props.deals} striped={true} hover={true}>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Deal ID</TableHeaderColumn>
            <TableHeaderColumn dataField="title" dataSort={true}>Deal Name</TableHeaderColumn>
            <TableHeaderColumn dataField="person_name" dataSort={true}>Owner Name</TableHeaderColumn>
            <TableHeaderColumn dataField="value" dataFormat={priceFormatter}>Price</TableHeaderColumn>
          </BootstrapTable>
        </Col>
      </Row>

    </div>);
  }
}
