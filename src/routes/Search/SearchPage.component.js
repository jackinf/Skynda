/**
 * Created by jevgenir on 11/8/2016.
 */
import React from "react";
import "../Home/components/Home.scss";
import SearchContainer from "../Home/containers/CarSearch/Home-Container.Search.Block";
import SearchResultsContainer from "../Home/containers/CarSearch/Home-Container.Search.Results";

export default class SearchPage extends React.Component {
  render() {
    return (<div>
      <div className='container'>
        <SearchContainer />
        <br/>
        <SearchResultsContainer />
      </div>
    </div>);
  }
}
