/**
 * Created by jevgenir on 11/13/2016.
 */

import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';

const CONTAINER_NAME = "skynda";

export default class ImageListComponent extends React.Component {
  static propTypes = {
    getImages: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      items: React.PropTypes.array
    })
  };

  componentDidMount() {
    this.props.getImages(CONTAINER_NAME);
    this.props.getBlobImages(CONTAINER_NAME);
  }

  render() {
    let rows = !this.props.data.isFetching && this.props.data.items ? this.props.data.items : [];
    let rows1 = !this.props.data.isFetching && this.props.data.items ? this.props.data.items : [];
    const loading = this.props.data.isFetching ? "Fetching" : "Images";

    // Todo; unite rows

    return (<div className="container">
      <h3>{loading}</h3>

      <h3>Actively used images in container <label className="label label-success">{CONTAINER_NAME}</label></h3>

      <Table rowHeight={50} rowsCount={rows.length} width={1000} maxHeight={500} headerHeight={50}>
        <Column
          header={<Cell>#</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rowIndex+1}.</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>Url</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].url}</Cell>)}
          width={500}
        />
        <Column
          header={<Cell>BlobName</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].blobName}</Cell>)}
          width={500}
        />
      </Table>

      <h3>All blob images in container <label className="label label-success">{CONTAINER_NAME}</label></h3>

      <Table rowHeight={50} rowsCount={rows1.length} width={1000} maxHeight={500} headerHeight={50}>
        <Column
          header={<Cell>#</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rowIndex+1}.</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>Url</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows1[rowIndex].url}</Cell>)}
          width={500}
        />
      </Table>

    </div>)
  }
}
