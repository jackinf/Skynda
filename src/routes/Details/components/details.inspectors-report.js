import React from 'react';
import {Button, Row, Col} from 'react-bootstrap';

import Skblock from './details.skblock';
import '../details.scss';

import image_ok from './../../../static/images/standard/ok.png';
import image_happy from './../../../static/images/standard/happy.png';
import image_cancel from './../../../static/images/standard/cancel.png';

const getImageByPass = (isPass) => isPass ?
  (<img src={image_ok} width="24" className="sk_details__icon_list_image"/>) :
  (<img src={image_cancel} width="24" className="sk_details__icon_list_image"/>);

class Report extends React.Component {
  render() {
    const {categories, faults} = this.props.report[0];

    return (
      <Skblock header={'Our Certified Inspector\'s Report'}>
      <div > {/*style="margin-left: 30px"*/  }
        <div className="row">
          <div className="col col-md-4"><label className="sk_details__certified_developer">Mr. Happy</label></div>
          <div className="col col-md-3"><img src={image_happy} width="130" alt="happy" /></div>
          <div className="col col-md-5">
            <Button bsStyle="primary">Have a question?</Button>
          </div>
        </div>

        {categories.map((category,i) => (
          <div className="row" key={i}>
            <h4>{category.title}</h4>

            <div className="row">
              {category.points.map((point, i) => (
                <div key={i}>
                  <div className="col col-md-6"> {/*style="padding: 5px 0;"*/}
                    {getImageByPass(point.pass)}
                    {point.text}
                  </div>
              </div>))}
            </div>

            <div className="row">
              <div className="col col-md-11">
                <Button bsStyle="primary">Show all</Button>
              </div>
            </div>

          </div>
        ))}

      </div>
    </Skblock>);
  }
}

Report.propTypes = {
  report: React.PropTypes.arrayOf(React.PropTypes.shape({
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      points: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        pass: React.PropTypes.bool
      }))
    })),
    faults: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      img:  React.PropTypes.string.isRequired
    }))
  }))
};

export default Report;
