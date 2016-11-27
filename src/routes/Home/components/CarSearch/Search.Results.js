import React from "react";
import {Translate} from 'react-redux-i18n';
import CarPreview from "./../../../../components/CarPreview";
import {Row, Col} from "react-bootstrap";

class ResultsComponent extends React.Component {

  render() {
    return (
      <Col md={12} style={{minHeight: "400px"}}>
        {
          this.props.isSearching
            ? (
            <Row>
              <Translate value="home_page.searching"/>
            </Row>)
            : this.props.searchResults.length > 0
            ? (
            <Row>
              <Col sm={12}>
                <h2 className='primary-header-2 text-center'>
                  <Translate value="home_page.found"/>: {this.props.searchResults[0].length}
                </h2>
              </Col>
              <br />
              <Row>
                <Col md={12}>
                  <CarPreview.Grid vehicles={this.props.searchResults}/>
                </Col>
              </Row>
            </Row>)
            : ("")
        }

        <br />

        {
          /**
           * RECENTLY ADDED
           */
        }
        <Row>
            <Col sm={12}>
              <h2 className='primary-header-2 text-center'>
                <Translate value="home_page.recently_added"/>
              </h2>
            </Col>
            <br />
            <Row>
              <Col md={12}>
                {/*<CarPreview.Grid vehicles={this.props.recentlyAdded}/>*/}
              </Col>
            </Row>
          </Row>
      </Col>)
  }
}


export default ResultsComponent;
