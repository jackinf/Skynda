/**
 * Created by jevgenir on 10/21/2016.
 */
import React from "react";
import {Table, Column, Cell} from 'fixed-data-table';
import 'fixed-data-table/dist/fixed-data-table.css';
import {Link} from "react-router";

export default class CarList extends React.Component {
  static propTypes = {
    carsData: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      cars: React.PropTypes.array
    })
  };

  componentDidMount() {
    this.props.getList();
  }

  render() {
    let rows = !this.props.carsData.isFetching ? this.props.carsData.cars : [{name: "Is loading..."}];
    const loading = this.props.carsData.isFetching ? "Fetching" : "Cars";

    return (<div className="container">
      <h3>{loading}</h3>

      <Table rowHeight={50} rowsCount={rows.length} width={1000} maxHeight={500} headerHeight={50}>
        <Column
          header={<Cell>#</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              {rowIndex+1}.
            </Cell>
          )}
          width={50}
        />
        <Column
          header={<Cell>Id</Cell>}
          cell={({rowIndex, ...props}) => {
            var car = rows[rowIndex];
            return (
              <Cell {...props}>
                {car.id}
              </Cell>
            );
          }}
          width={200}
        />
        <Column
          header={<Cell>Name</Cell>}
          cell={({rowIndex, ...props}) => {
            var car = rows[rowIndex];
            var model = car.carGeneralDto ? car.carGeneralDto.model : "";
            return (
              <Cell {...props}>
                {model}
              </Cell>
            );
          }}
          width={200}
        />
        <Column
          header={<Cell>Actions</Cell>}
          cell={({rowIndex, ...props}) => (
            <Cell {...props}>
              <Link to={`/admin/car/${rows[rowIndex].id}`}>Show</Link>
            </Cell>
          )}
          width={200}
        />
      </Table>

    </div>)
  }
}
