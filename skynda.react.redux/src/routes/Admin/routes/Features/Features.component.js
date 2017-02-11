import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router"

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

  render() {
    let rows = !this.props.data.isFetching ? this.props.data.items : [];
    const loading = this.props.data.isFetching ? "Fetching data... Please wait." : "Features";

    return (<span>
      {this.props.children ? this.props.children
        : (
          <div className="container">
            <h3>{loading}</h3>

            <RaisedButton secondary={true} label="Add" onClick={e => browserHistory.push(`/admin/feature/new`)}/>

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
                  {rows[rowIndex].id}
                </Cell>)}
                width={200}
              />
              <Column
                header={<Cell>Name</Cell>}
                cell={({rowIndex, ...props}) => {
                  return (<Cell {...props}>{rows[rowIndex].name ? rows[rowIndex].name : ""}</Cell>);
                }}
                width={200}
              />
              <Column
                header={<Cell>Actions</Cell>}
                cell={({rowIndex, ...props}) => (
                  <Cell {...props}>
                    <RaisedButton label="Show"
                                  onClick={e => browserHistory.push(`/admin/feature/${rows[rowIndex].id}`)}/>
                    <RaisedButton secondary={true} label="Delete"
                                  onClick={e => this.props.deleteFeature(rows[rowIndex].id)}/>
                  </Cell>
                )}
                width={200}
              />
            </Table>
          </div>)}
    </span>)
  }
}
