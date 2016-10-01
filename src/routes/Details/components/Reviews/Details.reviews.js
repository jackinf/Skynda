import React from 'react';

import Skblock from '../Details.skblock';
import '../Details.scss';
import './Details.reviews.scss';
import {Row, Col, Button} from 'react-bootstrap';
import translations from '../../../../store/locales/en';
import image_star from './../../../../static/images/standard/star@2x.png';
import image_unstar from './../../../../static/images/standard/star-1@2x.png';

const max_stars = 5;
const Star = (props) => (<img className="sk_safety__details__star pull-right"
                              width="24" src={props.src}/>);

class Reviews extends React.Component {
  render() {
    const reviews = this.props.reviews;

    return (<Skblock header={translations.routes.details.components.reviews.header}>
      {reviews.map((review, i) => (<div key={i} className="panel panel-default">
          <div className="panel-body">
            <Row className="sk_details__reviews__header">
              <Col md={6}>
                <img src={review.logoUrl} alt="LOGO"/>
              </Col>
              <Col md={6}>
                {Array.from({ length: max_stars - review.rating})
                  .map((_, idx) => <div key={idx}><Star src={image_unstar} /></div>)}

                {Array.from({ length: review.rating})
                  .map((_, idx) => <div key={idx}><Star src={image_star} /></div>)}
              </Col>
            </Row>
            <Row className="sk_details__reviews__body">
              <Col md={12}>
                {review.text}
              </Col>
            </Row>
            {review.videoUrl ? (<Row className="sk_details__reviews__body">
              <Col md={12}>
                {/* Youtube video? Yes. */}
              </Col>
            </Row>) : ""}
            <Row className="sk_details__reviews__footer">
              <Col md={12}>
                <Button className="pull-right sk_details__reviews__button-read-more">{translations.routes.details.components.reviews.btn_read_more}</Button>
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
    text: React.PropTypes.string.isRequired,
    videoUrl: React.PropTypes.string
  })).isRequired
};

export default Reviews;
