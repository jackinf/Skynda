import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router"
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {TrivenLoader} from "../../../../../components/Triven";

const tableOptions = {
  handleConfirmDeleteRow: (next, dropRowKeys) => {
    dropRowKeys.forEach((id) => {this.props.deleteItem(id);});
    next();
  },
  defaultSortName: "id",
  defaultSortOrder: 'asc'
};
const selectRow = {mode: 'checkbox', clickToSelect: true};

export default class VehicleList extends React.Component {
  static propTypes = {
    getList: React.PropTypes.func.isRequired,
    deleteItem: React.PropTypes.func.isRequired,
    isFetching: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array,
    publishItem: React.PropTypes.func.isRequired,
    unpublishItem: React.PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.actionFormatter = this.actionFormatter.bind(this);
  }

  componentDidMount() {
    this.props.getList();
  }

  actionFormatter(cell, row) {
    return <span>
      <RaisedButton secondary={true} label="edit" onClick={e => browserHistory.push(`/admin/vehicle/${row.id}`)} />
      {row.vehicleStatus !== 20 ? <RaisedButton  primary={true} label="publish" onClick={e => this.props.publishItem(row.id)} /> : null}
      {row.vehicleStatus !== 10 && row.vehicleStatus !== 0 ? <RaisedButton  primary={true} label="unpublish" onClick={e => this.props.unpublishItem(row.id)} /> : null}
    </span>;
  }

  render() {
    let rows = !this.props.isFetching ? this.props.items : [];
    const loading = this.props.isFetching ? "Fetching" : "Vehicles";

    return (<span>
      {this.props.children ?  this.props.children : (<div className="container">
          <h3>{loading}</h3>
          <TrivenLoader isLoading={this.props.isFetching}>
            <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/vehicle/new`)}/>
            <BootstrapTable data={rows} options={tableOptions} selectRow={selectRow} deleteRow hover={true} search={true}>
              <TableHeaderColumn row="0" dataField="id" isKey={true} dataAlign="center" dataSort={true}>Vehicle ID</TableHeaderColumn>
              <TableHeaderColumn row="0" dataField="modelTitle" dataSort={true}>Model Name</TableHeaderColumn>
              <TableHeaderColumn row="0" dataField="vehicleStatusString" dataSort={true}>Status</TableHeaderColumn>
              <TableHeaderColumn row="0" dataFormat={this.actionFormatter} width="350px" >Actions</TableHeaderColumn>
            </BootstrapTable>
          </TrivenLoader>
      </div>)}
    </span>)
  }
}
