import React from "react";

import Skblock from "../BlockContainer";
import "../Details.scss";
import "./Details.reviews.scss";
import {Row, Col, Button} from "react-bootstrap";
import imageStar from "./../../../../static/images/standard/star@2x.png";
import imageUnstar from "./../../../../static/images/standard/star-1@2x.png";
import {Translate} from 'react-redux-i18n';
import {Dialog} from "material-ui";

const maxStars = 5;
const Star = (props) => (<img className='sk_safety__details__star pull-right' width='24' src={props.src}/>);
import imagesClose from "./assets/cancel@2x.png";

Star.propTypes = {
  src: React.PropTypes.string
};

class Reviews extends React.Component {
  constructor() {
    super();
    this.state = {open: false, selectedReview: null};
  }

  closeModal = () => (this.setState({open: false, selectedReview: null}));
  openModal = (selectedReview) => (this.setState({open: true, selectedReview}));

  render() {
    const reviews = this.props.reviews;
    const selectedReview = this.state.selectedReview;

    return (<Skblock header={<Translate value="details.components.reviews.header"/>}>
      <div className="reviews">

      </div>
      {reviews.map((review, i) => {
        if (!review.text) {
          return <div></div>
        }

        const truncatedTextMaxLength = 100;
        const dots = review.text.length > truncatedTextMaxLength ? "..." : "";
        let trumcatedText = review.text.substring(0, Math.min(truncatedTextMaxLength, review.text.length)) + dots;
        return ((<div key={i} className='panel panel-default'>
            <div className='panel-body'>
              <Row className='sk_details__reviews__header'>
                <Col md={6}>
                  <img width={100} src={review.logoUrl} alt='LOGO'/>
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
                  {trumcatedText}
                </Col>
              </Row>
              {review.videoUrl ? (<Row className='sk_details__reviews__body'>
                <Col md={12}>
                  <iframe width="520" height="315" src={review.videoUrl} frameBorder="0" allowFullScreen></iframe>
                </Col>
              </Row>) : ""}
              <Row className='sk_details__reviews__footer'>
                <Col md={12}>
                  <a className='pull-right'
                          onClick={e => this.openModal(review)}>
                    <Translate value="details.components.reviews.btn_read_more"/>
                  </a>
                </Col>
              </Row>
            </div>
          </div>
        ));
      })}

      <Dialog
        title={(<div>
          <h4 className='sk_details__report__question-title'>Review</h4>
          <img className='sk_details__report__question-close-button' onClick={this.closeModal} src={imagesClose}/>
        </div>)}
        actions={[]}
        modal={false}
        open={this.state.open}
        onRequestClose={this.closeModal}
      >
        <Row>
          <Col sm={12}>
            {selectedReview ? (<div>
              {selectedReview.text}
            </div>) : ""}
          </Col>
        </Row>
      </Dialog>
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
