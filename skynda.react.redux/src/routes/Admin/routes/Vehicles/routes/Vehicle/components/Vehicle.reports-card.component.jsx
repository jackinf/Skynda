import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {Modal} from "react-bootstrap";
import {TableHeaderColumn} from "react-bootstrap-table";
import "./Vehicle.component.scss";
import BootstrapTable from "./FormRenderers/Vehicle.bootstrap-table.component";
import {ROUTE_PARAMS as VEHICLE_REPORT_ROUTE_PARAMS} from "../../../../VehicleReports/constants/VehicleReport.constant";
import VehicleReport from "../../../../VehicleReports/routes/VehicleReport/containers/VehicleReport.container";
import _ from "underscore";


const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

export default class VehicleReportsCardComponent extends React.Component {
  static propTypes = {
    vehicleReports: React.PropTypes.array.isRequired,
    vehicleId: React.PropTypes.any,
    getVehicleReportsList: React.PropTypes.func.isRequired,
    deleteSingleReportItem: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVehicleReportDialogOpen: false,
      vehicleReportId: VEHICLE_REPORT_ROUTE_PARAMS.values.NEW
    };
  }


  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.open-vehicle-report-dialog.action.js
  openVehicleReportDialog = (e) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    if (e && !!e.id) {
      this.setState({vehicleReportId: e.id});
    }
    this.setState({isVehicleReportDialogOpen: true});
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.close-vehicle-report-dialog.action.js
  closeVehicleReportDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({vehicleReportId: VEHICLE_REPORT_ROUTE_PARAMS.values.NEW});
    this.setState({isVehicleReportDialogOpen: false});

    if (!isNaN(this.props.vehicleId))
      this.props.getVehicleReportsList(this.props.vehicleId);
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.delete-report-item.action.js
  deleteReportItem = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    if (confirm(`Are you sure you want to delete report with ID(s) ${dropRowKeysStr}?`)) {
      // If the confirmation is true, call the function that
      dropRowKeys.forEach((i) => {
        this.props.deleteSingleReportItem(i);
      });
      // continues the deletion of the record.
      next();
    }
  };

  render() {
    const vehicleReports = this.props.vehicleReports;

    const bootstrapTableOptionsReport = {
      onRowClick: this.openVehicleReportDialog,
      onAdd: this.openVehicleReportDialog,
      handleConfirmDeleteRow: this.deleteReportItem,
      defaultSortName: "id",
      defaultSortOrder: 'asc',
    };

    if (isNaN(this.props.vehicleId))
      return null;

    return (
      <Card>
        <CardTitle title="Vehicle reports"/>
        <CardText>
          <Modal show={this.state.isVehicleReportDialogOpen} onHide={this.closeVehicleReportDialog}>
            <Modal.Header closeButton>
              <Modal.Title>REPORT CATEGORY</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <VehicleReport
                params={{
                  [VEHICLE_REPORT_ROUTE_PARAMS.VEHICLE_REPORT_ID]: this.state.vehicleReportId,
                  [VEHICLE_REPORT_ROUTE_PARAMS.VEHICLE_ID]: this.props.vehicleId
                }}
               onSubmitCustom={this.closeVehicleReportDialog}/>
            </Modal.Body>
          </Modal>

          {vehicleReports instanceof Array
            ? (<div>
              <BootstrapTable ref="tableReport" data={vehicleReports}
                              options={bootstrapTableOptionsReport}
                              selectRow={selectRow}
                              deleteRow
                              insertRow>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Report ID</TableHeaderColumn>
                <TableHeaderColumn dataField="title" dataSort={true}>Report Title</TableHeaderColumn>
              </BootstrapTable>
            </div>)
            : ""}
        </CardText>
      </Card>
    );
  }
}
