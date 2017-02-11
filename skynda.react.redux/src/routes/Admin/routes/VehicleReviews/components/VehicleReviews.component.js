import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import RaisedButton from "material-ui/RaisedButton";
import { browserHistory } from "react-router"

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
    const loading = this.props.data.isFetching ? "Fetching" : "Vehicles Reviews";

    return (<div className="container">
      <h3>{loading}</h3>

      <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/vehicle-reviews/new`)}/>

      <Table rowHeight={50} rowsCount={rows.length} width={1000} maxHeight={500} headerHeight={50}>
        <Column
          header={<Cell>#</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rowIndex+1}.</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>Vehicle ID</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].vehicleId}</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>ID</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].id}</Cell>)}
          width={50}
        />
        <Column
          header={<Cell>Text</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].text}</Cell>)}
          width={200}
        />
        <Column
          header={<Cell>Logo</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].logo
            ? (<a href={rows[rowIndex].logo.url} target="_blank" >{rows[rowIndex].logo.url}</a>)
            : ""}</Cell>)}
          width={200}
        />
        <Column
          header={<Cell>Video</Cell>}
          cell={({rowIndex, ...props}) => (<Cell {...props}>{rows[rowIndex].video
            ? (<a href={rows[rowIndex].video.url} target="_blank">{rows[rowIndex].video.url}</a>)
            : ""}</Cell>)}
          width={200}
        />
        <Column
          header={<Cell>Actions</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              <RaisedButton label="Show" onClick={e => browserHistory.push(`/admin/vehicle-reviews/${rows[rowIndex].id}`)}/>
              <RaisedButton secondary={true} label="Delete" onClick={e => this.props.deleteItem(rows[rowIndex].id)}/>
            </Cell>
          )}
          width={200}
        />
      </Table>

    </div>)
  }
}
