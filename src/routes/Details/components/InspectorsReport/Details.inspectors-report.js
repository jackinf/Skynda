import React from "react";

import Skblock from "../BlockContainer";
import "../Details.scss";  // todo: remove?
import "./Details.inspectors-report.scss";

// 3rd party
import {Dialog, TextField} from "material-ui";
import {Button, Row, Col} from "react-bootstrap";

// Images
import imageOk from "./../../../../static/images/standard/ok.png";
import imageCancel from "./../../../../static/images/standard/cancel.png";
import imageCarInspector from "./assets/carinspector.png";
import imagesClose from "./assets/cancel@2x.png";

import translations from "../../../../store/locales/et";

/**
 * Draws a single icon (tick if pass or cross if not pass) and a description.
 */
const pointBlockFn = (point, i) => (
  <Col className='sk_details__report__category-col' key={i} md={6}>
    {(point.pass)
      ? (<img src={imageOk} width='24' className='sk_details__icon_list_image'/>)
      : (<img src={imageCancel} width='24' className='sk_details__icon_list_image'/>)}
    {point.text}
  </Col>);

const pointBlockXsFn = (point, i) => (<div key={i}>
    <Col className='sk_details__report__category-col' xs={1} xsOffset={1} >
      {(point.pass)
        ? (<img src={imageOk} width='24' className='sk_details__icon_list_image'/>)
        : (<img src={imageCancel} width='24' className='sk_details__icon_list_image'/>)}
    </Col>
    <Col xs={10}>
      {point.text}
    </Col>
  </div>
);

/**
 * Inspector's report
 */
class Report extends React.Component {
  constructor() {
    super();
    this.state = {open: false, question: {howCanWeHelp: "", name: "", email: ""}};
  }

  openQuestionModal = () => {
    this.setState({open: true, question: {howCanWeHelp: "", name: "", email: ""}});
  };
  closeQuestionModal = () => (this.setState({open: false}));
  submitQuestion = async() => {
    await this.props.sendQuestionByEmailAsync(this.state.question);
    this.closeQuestionModal();
  };

  render() {
    const {categories} = this.props.report;

    return (
      <Skblock header={translations.routes.details.components.inspector_report.header}>
        <Row>
          <Col md={3}><label className='sk_details__certified_developer'>Artur P.</label></Col>
          <Col md={4}><img src={imageCarInspector} width='130' alt='happy'/></Col>
          <Col md={5} className='sk_details__certified_developer'>
            <Button className='sk_details__report__button-have-questions' onClick={this.openQuestionModal}>
              {translations.routes.details.components.inspector_report.question}
            </Button>
          </Col>
        </Row>

        {categories.map((category, i) => (
          <Row key={i} className='sk_details__report__category-block'>
            <Col md={12}>
              <h4 className='sk_details__report__category-title'>{category.title}</h4>

              <Row className='hidden-xs sk_details__report__category-row'>
                {category.points.map((point, i) => i % 2 === 0
                  ? (<div key={i}>{pointBlockFn(point, i)}</div>)
                  : (<Row key={i}>{pointBlockFn(point, i)}</Row>))}
              </Row>

              <Row className='visible-xs sk_details__report__category-row'>
                <Col xs={12}>
                  {category.points.map((point, i) => (<Row key={i}>{pointBlockXsFn(point, i)}</Row>))}
                </Col>
              </Row>

              <Row>
                <Col md={11}>
                  <Button className='pull-right sk_details__report__button-show-all'>
                    {translations.routes.details.components.inspector_report.show_all}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}

        <Dialog
          title={(<div><h4 className='sk_details__report__question-title'>Kas teil on küsimusi?</h4>
            <img className='sk_details__report__question-close-button' onClick={this.closeQuestionModal}
                 src={imagesClose}/></div>)}
          actions={[(<Button className='sk_details__report__button-send-question' onClick={this.submitQuestion}>
            {translations.routes.details.components.inspector_report.send_question}
          </Button>)]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeQuestionModal}
        >
          <Row>
            <Col md={12}>
              <TextField hintText='Kuidas me saame aidata?*' fullWidth multiLine rows={2}
                         onChange={e => {
                           this.state.question.howCanWeHelp = e.target.value;
                         }}/>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextField hintText='Teie Nimi*' fullWidth
                         onChange={e => {
                           this.state.question.name = e.target.value;
                         }}/>
            </Col>
            <Col md={6}>
              <TextField hintText='Teie E-mail*' fullWidth
                         onChange={e => {
                           this.state.question.email = e.target.value;
                         }}/>
            </Col>
          </Row>
        </Dialog>

      </Skblock>);
  }
}

Report.propTypes = {
  report: React.PropTypes.shape({
    categories: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      points: React.PropTypes.arrayOf(React.PropTypes.shape({
        text: React.PropTypes.string.isRequired,
        pass: React.PropTypes.bool
      }))
    })),
    faults: React.PropTypes.arrayOf(React.PropTypes.shape({
      text: React.PropTypes.string.isRequired,
      img: React.PropTypes.string.isRequired
    }))
  }),
  sendQuestionByEmailAsync: React.PropTypes.func.isRequired
};

export default Report;
