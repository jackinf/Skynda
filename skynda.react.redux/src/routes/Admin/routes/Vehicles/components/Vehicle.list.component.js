/**
 * Created by jevgenir on 10/21/2016.
 */
import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory, Link} from "react-router"

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

          <Table rowHeight={50} rowsCount={rows.length} width={1000} maxHeight={500} headerHeight={50}>
            <Column
              header={<Cell>#</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {rowIndex + 1}.
                </Cell>
              )}
              width={50}
            />
            <Column
              header={<Cell>Id</Cell>}
              cell={({rowIndex, ...props}) => (<Cell {...props}>
                <a href={`/details/${rows[rowIndex].id}`} target="_blank">{rows[rowIndex].id}</a>
              </Cell>)}
              width={200}
            />
            <Column
              header={<Cell>Name</Cell>}
              cell={({rowIndex, ...props}) => {
                return (<Cell {...props}>{rows[rowIndex].model ? rows[rowIndex].model.modelCode : ""}</Cell>);
              }}
              width={200}
            />
            <Column
              header={<Cell>Actions</Cell>}
              cell={({rowIndex, ...props}) => (
                <Cell {...props}>
                  {/*<Link to={`/admin/car/${rows[rowIndex].id}`}>Show</Link>*/}
                  <RaisedButton label="Show" onClick={e => browserHistory.push(`/admin/vehicle/${rows[rowIndex].id}`)}/>
                  <RaisedButton secondary={true} label="Delete" onClick={e => this.props.deleteItem(rows[rowIndex].id)}/>
                </Cell>
              )}
              width={200}
            />
          </Table>
      </div>)}
    </span>)
  }
}
