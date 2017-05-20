import React from "react";
import Header from "../../components/Header/Header.container";
import Footer from "../../components/Footer";
import "./CoreLayout.scss";
import "../../styles/core.scss";

export class CoreLayout extends React.Component {
  render() {
    return (
      <div>
        {this.props.children.props
          && this.props.children.props.route
          && this.props.children.props.route.path && this.props.children.props.route.path === "howitworks"
          ? <div>
              {this.props.children}
            </div>
          : <div>
              <Header />
              <div style={{height: "90%"}}>
                {this.props.children}
              </div>
              <Footer />
            </div>
        }

      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default CoreLayout;
