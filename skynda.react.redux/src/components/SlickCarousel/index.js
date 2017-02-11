import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss"
import "slick-carousel/slick/slick-theme.scss"
import "slick-carousel/slick/slick.min.js"
import "./simplecarousel.scss"

export class SimpleCarousel extends React.Component{
  static propTypes = {
    title: React.PropTypes.any.isRequired
  };

  render() {
    function NextButton({ onClick }) {
      return <button onClick={onClick} className="slick-arrow slick-custom glyphicon glyphicon-chevron-right"/>;
    }
    function PrevButton({ onClick }) {
      return <button onClick={onClick} className="slick-arrow slick-custom glyphicon glyphicon-chevron-left"/>;
    }

    const initialSlide = this.props.images.length > 0 ?
      this.props.images.length > 1 ? 1 : 0 : 0;
    let settings = {
      dots: true,
      centerMode: true,
      centerPadding: "0px",
      adaptiveHeight: false,
      infinite: false,
      cssEase: "ease-out",
      variableWidth: true,
      nextArrow: <NextButton/>,
      prevArrow: <PrevButton/>,
      initialSlide:initialSlide,
      focusOnSelect: true,
      draggable: true
    };
    let content = [];
    if(this.props.images.length > 0 ){
      content  = this.props.images.map(function(row, i) {
        return (
          <div key={i}>
            <img width={250} alt='300xpic' src={row.img} className="skynda-slick-container-image"/>
          </div>
        );
      });
    }else {
      // for (let i = 0; i < 5; i++) {
      //   content.push(<div key={i}><img width={250}  src='http://placekitten.com/g/400/200' className="skynda-slick-container-image"/></div>);
      // }
    }

    return (<span>
      {content && content.length > 0 ? (<div className="slickContainer">
          {this.props.title}
          <Slider {...settings} >
            {content || <div></div>}
          </Slider>
        </div>) : ""}
    </span>

    );
  }

}

export default SimpleCarousel
