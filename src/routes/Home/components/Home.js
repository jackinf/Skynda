import React from "react";
import "./Home.scss";
import Hero from "./Hero/Home.hero";
import SearchContainer from "../containers/CarSearch/Home-Container.Search.Block"
import SearchResultsContainer from "../containers/CarSearch/Home-Container.Search.Results"

class Home extends React.Component {
  render() {
    return (
      <div>
        <Hero/>
        <br/>
        <div className='container'>

          {/*Search block*/}
          <SearchContainer />
          <br/>
          {/*Search results block*/}
          <SearchResultsContainer />

        </div>
      </div>
    );
  }
}

export default Home;
