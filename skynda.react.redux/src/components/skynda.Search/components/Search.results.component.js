import React from "react";
import {Translate} from 'react-redux-i18n';
import CarPreview from "./../../ItemPreview";
import {Row, Col} from "react-bootstrap";
import _ from "underscore";
import RefreshIndicator from 'material-ui/RefreshIndicator';

class ResultsComponent extends React.Component {
  render() {
    const searchingTxt = <Translate value="home_page.searching"/>;
    const chooseFavTxt = <Translate value="home_page.choose_your_favorite"/>;
    const recentlyAddedTxt = <Translate value="home_page.recently_added"/>;

    return (
      <Col md={12}>
        {
          this.props.isSearching
            ? (
            <Row>
              {searchingTxt}
              <div><RefreshIndicator size={100} left={0} top={50} status="loading"/></div>
            </Row>)
            : _.isArray(this.props.searchResults) && this.props.searchResults.length > 0
            ? (
            <Row>
              <Row>
                <Col md={12}>
                  <CarPreview.Grid vehicles={this.props.searchResults}/>
                </Col>
              </Row>
            </Row>)
            : null
        }

        <br />

        {
          /**
           * RECENTLY ADDED
           */
        }

        {this.props.recentlyAdded && _.isArray(this.props.recentlyAdded) && this.props.recentlyAdded.length > 0
          ? (<Row>
              <Col sm={12}>
                <h2 className='primary-header-2 text-center'>
                  {recentlyAddedTxt}
                </h2>
              </Col>
              <br />
              <Row>
                <Col md={12}>
                  {/*<CarPreview.Grid vehicles={this.props.recentlyAdded}/>*/}
                </Col>
              </Row>
            </Row>) : null}

      </Col>)
  }
}


export default ResultsComponent;
