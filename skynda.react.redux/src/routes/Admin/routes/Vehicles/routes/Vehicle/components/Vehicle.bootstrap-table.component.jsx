import React from "react";
import ReactDOM from 'react-dom';
import {BootstrapTable as bt} from 'react-bootstrap-table';

export default class BootstrapTable extends bt {
  componentDidMount() {
    super.componentDidMount();
    const { onAdd } = this.props.options || {};
    const dom = ReactDOM.findDOMNode(this);
    const addButton = dom.getElementsByClassName('react-bs-table-add-btn')[0];
    if (addButton) {
      addButton.onclick = function onclick(event) {
        event.stopPropagation();
        onAdd();
      };
    }
  }

  render() {
    return super.render({ ...this.props });
  }
}
