import React from "react";
import "./Home.scss";
import Hero from "./Hero/Home.hero";
import SearchContainer from "../../../containers/SearchContainer"
import SubscribeContainer from "../../../containers/SubscribeContainer"

class Home extends React.Component {
  render() {
    return (
      <div>
        <Hero/>
        <br/>
        <div className='container'>
          <SubscribeContainer/>
          <br/>
          <SearchContainer />
        </div>
      </div>
    );
  }
}

export default Home;
