import React from 'react';
import CarSearch from "./../components/CarSearch";
import {Row, Col} from "react-bootstrap";

// translation
import translations from "../../../store/locales/et";


class SearchBlock extends React.Component{
  render(){
    return(<div>
    <Row>
      <Col xs={12}>
        <h2 className='primary-header-2 text-center'>{translations.routes.home_page.search}</h2>
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
