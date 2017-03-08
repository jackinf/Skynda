import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router"
import {BootstrapTable} from "react-bootstrap-table";

const tableOptions = {
  onRowClick: (item) => {browserHistory.push(`/admin/vehicle/${item.id}`)},
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
    data: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      items: React.PropTypes.array
    })
  };

  componentDidMount() {
    this.props.getList();
  }

  render() {
    let rows = !this.props.data.isFetching ? this.props.data.items : [];
    const loading = this.props.data.isFetching ? "Fetching" : "Vehicles";

    return (<span>
      {this.props.children ?  this.props.children : (<div className="container">
          <h3>{loading}</h3>

          <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/vehicle/new`)}/>
          <BootstrapTable data={rows} options={tableOptions} selectRow={selectRow} deleteRow hover={true} search={true}>
            <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Vehicle Model ID</TableHeaderColumn>
            <TableHeaderColumn dataField="model.modelCode" dataSort={true}>Code</TableHeaderColumn>
          </BootstrapTable>
      </div>)}
    </span>)
  }
}
