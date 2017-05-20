/**
 * Created by ardi-pc on 2017-05-20.
 */
import React from "react";
import howItWorksImg from "./assets/howitworks.jpg";
import {Image} from "react-bootstrap";

const Styles = {
  container: {
    background: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

class HowItWorks extends React.Component{
  constructor(props){
    super(props);
    this.state = { height: window.innerHeight}
  }

  updateDimensions = () => {
    this.setState({height: window.innerHeight});
  };

  // resize = () => this.forceUpdate();

  componentDidMount(){
    this.updateDimensions();
  }

  componentWillMount(){
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render(){

    return(

    <section>
      <div style={Styles.container} >
        <Image alt={"How it works"}  src={howItWorksImg} />
      </div>
    </section>


    );
  }
}

export default HowItWorks;
