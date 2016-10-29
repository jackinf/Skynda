import React from "react";
import "./Home.scss";
import Hero from "./Hero/Home.hero";
import SearchContainer from "../containers/SearchContainer"
import SearchResultsContainer from "../containers/SearchResultsContainer"

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
