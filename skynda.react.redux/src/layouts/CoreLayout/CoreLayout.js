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
        <div style={{height: "90%"}}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
