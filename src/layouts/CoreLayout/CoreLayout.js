import React from "react";
import Header from "../../components/Header/Header.container";
import Footer from "../../components/Footer";
import "./CoreLayout.scss";
import "../../styles/core.scss";

export class CoreLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
