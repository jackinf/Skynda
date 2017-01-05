import React from "react";
import "../../Home/components/Home.scss";
import SearchContainer from "../../../components/skynda.Search"

export default class SearchPage extends React.Component {
  render() {
    return (<div>
      <div className='container'>
        <SearchContainer />
      </div>
    </div>);
  }
}
