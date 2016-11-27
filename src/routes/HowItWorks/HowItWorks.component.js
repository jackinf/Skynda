/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import "./HowItWorks.component.scss";
import HowItWorks from "./components";

export default class extends React.Component {
  render() {
    return (<div>
      <HowItWorks.HeroUnit />
      <HowItWorks.IconFeatures />
      <HowItWorks.DescriptionText />
      <HowItWorks.ThreeSteps />
      <HowItWorks.FAQ />
    </div>)
  }
}
