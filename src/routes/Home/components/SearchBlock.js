import React from 'react';
import CarSearch from "./../components/CarSearch";
import {Row, Col} from "react-bootstrap";
import { Translate } from 'react-redux-i18n';


class SearchBlock extends React.Component{
  render(){
    return(<div>
    <Row>
      <Col xs={12}>
        <h2 className='primary-header-2 text-center'><Translate value="home_page.search"/></h2>
      </Col>
    </Row>
    <Row>
      <Col md={12}>
        <CarSearch />
      </Col>
    </Row>

    </div>)
  }
}

export default SearchBlock
