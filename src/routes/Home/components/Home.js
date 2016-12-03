import React from "react";
import "./Home.scss";
import Hero from "./Hero/Home.hero";
import SearchContainer from "../../../containers/SearchContainer"


class Home extends React.Component {
  render() {
    return (
      <div>
        <Hero/>
        <br/>
        <div className='container'>
          <SearchContainer />
        </div>
      </div>
    );
  }
}

export default Home;
