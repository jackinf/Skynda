/**
 * Created by jevgenir on 11/27/2016.
 */

import React from "react";
import "./HowItWorks.component.scss";
import {
  HeroUnit,
  IconFeatures,
  DescriptionText,
  ThreeSteps,
  FAQ
} from "./components";
import {DISPLAY_MODE} from "./HowItWorks.constants";

export default class extends React.Component {
  constructor() {
    super();
    this.state = {displayMode: DISPLAY_MODE.WANT_TO_BUY}
  }

  setDisplayModeToWantToBuy = () => {
    this.setState({displayMode: DISPLAY_MODE.WANT_TO_BUY});
  };

  setDisplayModeToWantToSell = () => {
    this.setState({displayMode: DISPLAY_MODE.WANT_TO_SELL});
  };

  render() {
    const displayMode = this.state.displayMode;

    return (<div>
      <HeroUnit
        onWantToBuyClick={this.setDisplayModeToWantToBuy}
        onWantToSellClick={this.setDisplayModeToWantToSell}
        displayMode={displayMode}/>
      <IconFeatures displayMode={displayMode} />
      <DescriptionText displayMode={displayMode} />
      <ThreeSteps displayMode={displayMode} />
      <FAQ displayMode={displayMode} />
    </div>)
  }
}
