/**
 * Created by jevgenir on 10/26/2016.
 */
import React from "react";
import {browserHistory} from "react-router"
import RaisedButton from "material-ui/RaisedButton";
import {BootstrapTable} from "react-bootstrap-table";
import {TrivenLoader} from "components/Triven";

const tableOptions = {
  onRowClick: (item) => {browserHistory.push(`/admin/vehicle-model/${item.id}`)},
  handleConfirmDeleteRow: (next, dropRowKeys) => {
    dropRowKeys.forEach((id) => {this.props.deleteItem(id);});
    next();
  },
  defaultSortName: "id",
  defaultSortOrder: 'asc'
};
const selectRow = {mode: 'checkbox', clickToSelect: true};

export default class VehicleModels extends React.Component {
  static propTypes = {
    getList: React.PropTypes.func.isRequired,
    deleteItem: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        modelCode: React.PropTypes.string,
        title: React.PropTypes.string
      }))
    })
  };

  componentDidMount() {
    this.props.getList();
  }

  render() {
    let rows = !this.props.isFetching ? this.props.items : [];
    const loading = this.props.isFetching ? "Fetching" : "Vehicle Models";

    return (<div className="container">
      {!this.props.children ?
        (<span>
        <h3>{loading}</h3>

        <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/vehicle-model/new`)}/>
          <TrivenLoader isLoading={!this.props.isFetching}>
            <BootstrapTable data={rows} options={tableOptions} selectRow={selectRow} deleteRow hover={true} search={true}>
              <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Vehicle Model ID</TableHeaderColumn>
              <TableHeaderColumn dataField="modelCode" dataSort={true}>Code</TableHeaderColumn>
              <TableHeaderColumn dataField="title" dataSort={true}>Name</TableHeaderColumn>
            </BootstrapTable>
          </TrivenLoader>
      </span>
        ): this.props.children}
    </div>)
  }
}
