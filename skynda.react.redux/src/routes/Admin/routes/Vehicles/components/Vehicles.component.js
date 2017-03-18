import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router"
import {BootstrapTable} from "react-bootstrap-table";
import {TrivenLoader} from "components/Triven";

const tableOptions = {
  // onRowClick: (item) => {browserHistory.push(`/admin/vehicle/${item.id}`)},
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
      {row.vehicleStatus !== 10 ? <RaisedButton  primary={true} label="unpublish" onClick={e => this.props.unpublishItem(row.id)} /> : null}
    </span>;
  }

  render() {
    let rows = !this.props.isFetching ? this.props.items : [];
    const loading = this.props.isFetching ? "Fetching" : "Vehicles";

    return (<span>
      {this.props.children ?  this.props.children : (<div className="container">
          <h3>{loading}</h3>

          <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/vehicle/new`)}/>
          <TrivenLoader isLoading={this.props.isFetching}>
            <BootstrapTable data={rows} options={tableOptions} selectRow={selectRow} deleteRow hover={true} search={true}>
              <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Vehicle Model ID</TableHeaderColumn>
              <TableHeaderColumn dataField="model.modelCode" dataSort={true}>Code</TableHeaderColumn>
              <TableHeaderColumn dataField="vehicleStatusString" dataSort={true}>Status</TableHeaderColumn>
              <TableHeaderColumn dataFormat={this.actionFormatter} >Actions</TableHeaderColumn>
            </BootstrapTable>
          </TrivenLoader>
      </div>)}
    </span>)
  }
}
