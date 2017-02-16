import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import _ from "underscore";
import "./Features.component.scss";

export default class FeaturesList extends React.Component {
  static propTypes = {
    getFeaturesList: React.PropTypes.func.isRequired,
    deleteFeature: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      items: React.PropTypes.array
    })
  };

  componentDidMount() {
    this.props.getFeaturesList();
  }

  deleteFeatures = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    const functionDeleteSingleFeature = this.props.deleteFeature;
    if (confirm(`Are you sure you want to delete features with ID(s) ${dropRowKeysStr}?`)) {
      // If the confirmation is true, call the function that
      _.each(dropRowKeys, function(i){
        functionDeleteSingleFeature(i);
      });
      // continues the deletion of the record.
      next();
      this.props.getFeaturesList();
    }
  };

  openFeaturePage = (e) => {
    if(e && !!e.id){
      browserHistory.push(`/admin/feature/${e.id}`);
    }
  };

  render() {
    let rows = !this.props.data.isFetching ? this.props.data.items : [];
    const loading = this.props.data.isFetching ? "Fetching data... Please wait." : "Features";
    const bootstrapTableOptionsFeatures = {
      onRowClick: this.openFeaturePage,
      handleConfirmDeleteRow: this.deleteFeatures,
      defaultSortName: "id",
      defaultSortOrder: 'asc'
    };

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    return (<span>
      {this.props.children ? this.props.children
        : (
          <div className="container features">
            <h3>{loading}</h3>

            <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/feature/new`)}/>

            <BootstrapTable ref="tableReport" data={rows}
                            options={bootstrapTableOptionsFeatures}
                            selectRow={selectRow}
                            deleteRow
                            hover={true}
                            search={true}
            >
              <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Feature ID</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort={true}>Name</TableHeaderColumn>
              <TableHeaderColumn dataField="weight" dataSort={true}>weight</TableHeaderColumn>
              <TableHeaderColumn dataField="isActive" dataSort={true}>Is Active</TableHeaderColumn>
            </BootstrapTable>

          </div>)}
    </span>)
  }

}
