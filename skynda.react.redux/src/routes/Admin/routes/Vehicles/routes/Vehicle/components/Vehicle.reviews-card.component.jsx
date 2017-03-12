import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {Modal} from "react-bootstrap";
import {TableHeaderColumn} from "react-bootstrap-table";
import "./Vehicle.component.scss";
import BootstrapTable from "./FormRenderers/Vehicle.bootstrap-table.component";
import {ROUTE_PARAMS as VEHICLE_REVIEW_ROUTE_PARAMS} from "../../../../VehicleReviews/constants/VehicleReview.constant";
import _ from "underscore";
import VehicleReview from "../../../../VehicleReviews/routes/VehicleReview/containers/VehicleReview.container";

const selectRow = {
  mode: 'checkbox',
  clickToSelect: true
};

export default class VehicleReviewsCardComponent extends React.Component {
  static propTypes = {
    vehicleReviews: React.PropTypes.array.isRequired,
    vehicleId: React.PropTypes.any,
    getVehicleReviewsList: React.PropTypes.func.isRequired,
    deleteSingleReview: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isVehicleReviewDialogOpen: false,
      vehicleReviewId: VEHICLE_REVIEW_ROUTE_PARAMS.values.NEW
    };
  }

  refreshList = () => {
    if (!isNaN(this.props.vehicleId)) {
      this.props.getVehicleReviewsList(this.props.vehicleId);
    }
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.open-vehicle-review-dialog.action.js
  openVehicleReviewDialog = (e) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    if (e && !!e.id) {
      this.setState({vehicleReviewId: e.id});
    }
    this.setState({isVehicleReviewDialogOpen: true});
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.close-vehicle-review-dialog.action.js
  closeVehicleReviewDialog = (e, value) => {
    if (e && e.hasOwnProperty("preventDefault") && _.isFunction(e.preventDefault))
      e.preventDefault(); // stop event propagation to avoid form submission.
    this.setState({vehicleReviewId: VEHICLE_REVIEW_ROUTE_PARAMS.values.NEW});
    this.setState({isVehicleReviewDialogOpen: false});

    this.refreshList();
  };

  // TODO: eraldi failisse - VehicleSublistActions/Vehicle.delete-review-item.action.js
  deleteReviewItem = (next, dropRowKeys) => {
    const dropRowKeysStr = dropRowKeys.join(',');
    if (confirm(`Are you sure you want to delete report with ID(s) ${dropRowKeysStr}?`)) {
      dropRowKeys.forEach((i) => {
        this.props.deleteSingleReview(i);
      });
      next(); // continues the deletion of the record.
      this.refreshList();
    }
  };

  render() {
    const vehicleReviews = this.props.vehicleReviews;

    const bootstrapTableOptionsReview = {
      onRowClick: this.openVehicleReviewDialog,
      onAdd: this.openVehicleReviewDialog,
      handleConfirmDeleteRow: this.deleteReviewItem,
      defaultSortName: "id",
      defaultSortOrder: 'asc',
    };

    if (isNaN(this.props.vehicleId))
      return null;

    return (
      <Card>
        <CardTitle title="Vehicle reviews"/>
        <CardText>
          <Modal show={this.state.isVehicleReviewDialogOpen} onHide={this.closeVehicleReviewDialog}>
            <Modal.Header closeButton>
              <Modal.Title>REVIEW ITEM</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <VehicleReview
                params={{
                  [VEHICLE_REVIEW_ROUTE_PARAMS.VEHICLE_REVIEW_ID]: this.state.vehicleReviewId,
                  [VEHICLE_REVIEW_ROUTE_PARAMS.VEHICLE_ID]: this.props.vehicleId
                }}
                 onSubmitCustom={this.closeVehicleReviewDialog}/>
            </Modal.Body>
          </Modal>

          {vehicleReviews instanceof Array
            ? (<div>
              <BootstrapTable ref="tableReview" data={vehicleReviews}
                              options={bootstrapTableOptionsReview}
                              selectRow={selectRow}
                              deleteRow
                              insertRow>
                <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>
                  Review ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="text" dataSort={true}>Review Text</TableHeaderColumn>
              </BootstrapTable>
            </div>)
            : ""}

        </CardText>
      </Card>
    );
  }
}
