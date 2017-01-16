import React from "react";

import Skblock from "../BlockContainer";
import "../Details.scss";
import "./Details.inspectors-report.scss";
import SimpleCarousel from "../../../../components/SlickCarousel";
import {Button, Row, Col, Carousel, Thumbnail} from "react-bootstrap";
import imageOk from "./../../../../static/images/standard/ok.png";
import imageCancel from "./../../../../static/images/standard/cancel.png";
import imagesClose from "./assets/cancel@2x.png";
import {Dialog, TextField} from "material-ui";
import imageCarInspector from "./assets/carinspector.png";
import {Translate} from 'react-redux-i18n';
// import NukaCarousel from 'nuka-carousel';

/**
 * Draws a single icon (tick if pass or cross if not pass) and a description.
 */
// const pointBlockFn = (point, i) => (
//   <Col className='sk_details__report__category-col' key={i} md={6}>
//     {(point.pass)
//       ? (<img src={imageOk} width='24' className='sk_details__icon_list_image'/>)
//       : (<img src={imageCancel} width='24' className='sk_details__icon_list_image'/>)}
//     {point.text}
//   </Col>);
//
// const pointBlockXsFn = (point, i) => (<div key={i}>
//     <Col className='sk_details__report__category-col' xs={1} xsOffset={1}>
//       {(point.pass)
//         ? (<img src={imageOk} width='24' className='sk_details__icon_list_image'/>)
//         : (<img src={imageCancel} width='24' className='sk_details__icon_list_image'/>)}
//     </Col>
//     <Col xs={10}>
//       {point.text}
//     </Col>
//   </div>
// );

/**
 * Inspector's report
 */
class InspectorsReport extends React.Component {
  // constructor(props) {
  //   super();
  //   let categories = props.report.categories.map((category, index) => ({index, category, limit: 6}));
  //   this.state = {
  //     categories,
  //     open: false,
  //     question: {howCanWeHelp: "", name: "", email: ""}
  //   };
  // }

  // openQuestionModal = () => {
  //   this.setState({open: true, question: {howCanWeHelp: "", name: "", email: ""}});
  // };
  // closeQuestionModal = () => (this.setState({open: false}));
  // submitQuestion = async() => {
  //   await this.props.sendQuestionByEmailAsync(this.state.question);
  //   this.closeQuestionModal();
  // };
  // showAll = (e, index) => {
  //   let categories = this.state.categories;
  //   for (let i = 0; i < categories.length; i++) {
  //     if (categories[i].index === index) {
  //       categories[i].limit = 999;
  //       break;
  //     }
  //   }
  //   this.setState({categories});
  // };

  render() {
    const {reportCategories, faults, inspector} = this.props.report;

    console.log("report base", this.props.report);

    return (
      <Skblock header={<Translate value="details.components.inspector_report.header"/>}>
        <div className="inspectors-report">
          <Row className="inspector-block">
            <Col md={3}><img src={imageCarInspector} width='130' alt='happy'/></Col>
            <Col md={9} className='sk_details__certified_developer'>
              {inspector}
            </Col>
          </Row>

          <Col sm={12}>
            {reportCategories.map((category, i) =>  (
              <Row key={i} className="line-item">
              <h3>{category.title}</h3>
                {category.items.map((item, i ) => (
                  <Row key={i}>
                    <div>{item.title}</div>
                    <p>
                      {item.text}
                    </p>
                  </Row>
                ))}
            </Row>))}
          </Col>

          <Row>
            <Col xs={12}>
              <Translate value="details.components.inspector_report.pic_dents_txt"/>
              <SimpleCarousel images={faults} />
            </Col>
          </Row>
        </div>


        {/*<Col sm={12}>*/}
          {/*{categories.map((categoryWrapper, i) => {*/}
            {/*if (!categoryWrapper.category.points) {*/}
              {/*return <div></div>*/}
            {/*}*/}

            {/*let points = [];*/}
            {/*let showButton = categoryWrapper.category.points.length > categoryWrapper.limit;*/}
            {/*for (let j = 0; j < categoryWrapper.category.points.length && j < categoryWrapper.limit; j++) {*/}
              {/*points.push({...categoryWrapper.category.points[j]});*/}
            {/*}*/}

            {/*return (<Row key={i} className='sk_details__report__category-block'>*/}
              {/*<Col md={12}>*/}
                {/*<h4 className='sk_details__report__category-title'>{categoryWrapper.category.title}</h4>*/}

                {/*<Row className='hidden-xs sk_details__report__category-row'>*/}
                  {/*{points.map((point, i) => i % 2 === 0*/}
                    {/*? (<div key={i}>{pointBlockFn(point, i)}</div>)*/}
                    {/*: (<Row key={i}>{pointBlockFn(point, i)}</Row>))}*/}
                {/*</Row>*/}

                {/*<Row className='visible-xs sk_details__report__category-row'>*/}
                  {/*<Col xs={12}>*/}
                    {/*{points.map((point, i) => (<Row key={i}>{pointBlockXsFn(point, i)}</Row>))}*/}
                  {/*</Col>*/}
                {/*</Row>*/}

                {/*{showButton ? (<Row>*/}
                  {/*<Col md={11}>*/}
                    {/*<Button className='pull-right sk_details__report__button-show-all'*/}
                            {/*onClick={e => this.showAll(e, categoryWrapper.index)}>*/}
                      {/*<Translate value="details.components.inspector_report.show_all"/>*/}
                    {/*</Button>*/}
                  {/*</Col>*/}
                {/*</Row>) : ""}*/}

              {/*</Col>*/}
            {/*</Row>);*/}
          {/*})}*/}
        {/*</Col>*/}

        {/*<Button className='sk_details__report__button-have-questions' onClick={this.openQuestionModal}>*/}
        {/*<Translate value="details.components.inspector_report.question"/>*/}
        {/*</Button>*/}
        {/*<Dialog*/}
          {/*title={(<div><h4 className='sk_details__report__question-title'>Kas teil on küsimusi?</h4>*/}
            {/*<img className='sk_details__report__question-close-button' onClick={this.closeQuestionModal}*/}
                 {/*src={imagesClose}/></div>)}*/}
          {/*actions={[(<Button className='sk_details__report__button-send-question' onClick={this.submitQuestion}>*/}
            {/*<Translate value="details.components.inspector_report.send_question"/>*/}
          {/*</Button>)]}*/}
          {/*modal={false}*/}
          {/*open={this.state.open}*/}
          {/*onRequestClose={this.closeQuestionModal}*/}
        {/*>*/}
          {/*<Row>*/}
            {/*<Col md={12}>*/}
              {/*<TextField hintText='Kuidas me saame aidata?*' fullWidth multiLine rows={2}*/}
                         {/*onChange={e => {*/}
                           {/*this.state.question.howCanWeHelp = e.target.value;*/}
                         {/*}}/>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          {/*<Row>*/}
            {/*<Col md={6}>*/}
              {/*<TextField hintText='Teie Nimi*' fullWidth*/}
                         {/*onChange={e => {*/}
                           {/*this.state.question.name = e.target.value;*/}
                         {/*}}/>*/}
            {/*</Col>*/}
            {/*<Col md={6}>*/}
              {/*<TextField hintText='Teie E-mail*' fullWidth*/}
                         {/*onChange={e => {*/}
                           {/*this.state.question.email = e.target.value;*/}
                         {/*}}/>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</Dialog>*/}

      </Skblock>);
  }
}

InspectorsReport.propTypes = {
  report: React.PropTypes.shape({
    reportCategories: React.PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      description: React.PropTypes.string,
      items: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        text: React.PropTypes.string,
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

export default InspectorsReport;
