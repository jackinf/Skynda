import React from "react";

import Skblock from "../BlockContainer";
import "../Details.scss";
import "./Details.reviews.scss";
import {Row, Col, Button} from "react-bootstrap";
import imageStar from "./../../../../static/images/standard/star@2x.png";
import imageUnstar from "./../../../../static/images/standard/star-1@2x.png";
import { Translate } from 'react-redux-i18n';

const maxStars = 5;
const Star = (props) => (<img className='sk_safety__details__star pull-right' width='24' src={props.src}/>);

Star.propTypes = {
  src: React.PropTypes.string
};

class Reviews extends React.Component {
  render() {
    const reviews = this.props.reviews;

    return (<Skblock header={<Translate value="details.components.reviews.header"/>}>
      {reviews.map((review, i) => (<div key={i} className='panel panel-default'>
          <div className='panel-body'>
            <Row className='sk_details__reviews__header'>
              <Col md={6}>
                <img src={review.logoUrl} alt='LOGO'/>
              </Col>
              <Col md={6}>
                {Array.from({length: maxStars - review.rating})
                  .map((_, idx) => <div key={idx}><Star src={imageUnstar}/></div>)}

                {Array.from({length: review.rating})
                  .map((_, idx) => <div key={idx}><Star src={imageStar}/></div>)}
              </Col>
            </Row>
            <Row className='sk_details__reviews__body'>
              <Col md={12}>
                {review.text}
              </Col>
            </Row>
            {review.videoUrl ? (<Row className='sk_details__reviews__body'>
              <Col md={12}>
                {/* Youtube video? Yes. */}
              </Col>
            </Row>) : ""}
            <Row className='sk_details__reviews__footer'>
              <Col md={12}>
                <Button
                  className='pull-right sk_details__reviews__button-read-more'>
                  <Translate value="details.components.reviews.btn_read_more"/>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </Skblock>);
  }
}

Reviews.propTypes = {
  reviews: React.PropTypes.arrayOf(React.PropTypes.shape({
    logoUrl: React.PropTypes.string,
    rating: React.PropTypes.number.isRequired,
    text: React.PropTypes.string, // isRequired
    videoUrl: React.PropTypes.string
  })).isRequired
};

export default Reviews;
