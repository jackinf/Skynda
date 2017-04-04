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
    this.state = {displayMode: DISPLAY_MODE.WANT_TO_BUY};
    this.setQueryString = this.setQueryString.bind(this);
  }

  componentWillMount() {
    if (this.props.location && this.props.location.query && this.props.location.query["mode"] === "sell") {
      this.setState({displayMode: DISPLAY_MODE.WANT_TO_SELL});
    }
  }

  setDisplayModeToWantToBuy = () => {
    this.setState({displayMode: DISPLAY_MODE.WANT_TO_BUY});
    this.setQueryString("buy");

  };

  setDisplayModeToWantToSell = () => {
    this.setState({displayMode: DISPLAY_MODE.WANT_TO_SELL});
    this.setQueryString("sell");
  };

  setQueryString(mode) {
    if (history.pushState) {
      const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?mode=' + mode;
      window.history.pushState({path:newurl},'',newurl);
      ga('send', 'event', 'HowItWorks', 'mode', mode);
    }
  }

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
