import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./CoreLayout.scss";
import "../../styles/core.scss";

export const CoreLayout = ({children}) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
};

export default CoreLayout;
