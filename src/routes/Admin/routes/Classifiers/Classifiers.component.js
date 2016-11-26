/**
 * Created by jevgenir on 11/13/2016.
 */

import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';

export default class ClassifiersComponent extends React.Component {
  static propTypes = {
    getColors: React.PropTypes.func.isRequired,
    data: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      items: React.PropTypes.array
    })
  };

  componentDidMount() {
    this.props.getColors();
  }

  render() {
    let rows = !this.props.data.isFetching ? this.props.data.items : [];
    const loading = this.props.data.isFetching ? "Fetching" : "Classifiers";

    return (<div className="container">
      <h3>{loading}</h3>

      <Table rowHeight={50} rowsCount={rows.length} width={1000} maxHeight={500} headerHeight={50}>
        <Column
          header={<Cell>#</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rowIndex+1}.</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>Id</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].name}</Cell>)}
          width={200}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].value}</Cell>)}
          width={200}
        />
      </Table>

    </div>)
  }
}
