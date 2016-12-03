import React from "react";
import "../../Home/components/Home.scss";
import SearchContainer from "../../../containers/SearchContainer"

export default class SearchPage extends React.Component {
  render() {
    return (<div>
      <div className='container'>
        <SearchContainer />
      </div>
    </div>);
  }
}
