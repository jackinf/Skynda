import React from "react";
import "./Home.scss";
import Hero from "./Hero/Home.hero";
import Search from "../../../containers/SearchContainer"
import Subscribe from "../../../containers/SubscribeContainer"

class Home extends React.Component {
  render() {
    return (
      <div>
        <Hero/>
        <br/>
        <div className='container'>
          <Search />
          <Subscribe/>
          <br/>
        </div>
      </div>
    );
  }
}

export default Home;
