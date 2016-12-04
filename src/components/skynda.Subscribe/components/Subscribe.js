import React, {PropTypes} from 'react'
import {Row, Col} from "react-bootstrap";
import {Translate} from 'react-redux-i18n';
import {rowWrapper} from "./helpers"
import {Field} from "redux-form";
import {TextField} from "redux-form-material-ui";
import {Button} from "react-bootstrap";
import "./Subscribe.scss";

export default class Subscribe extends React.Component {
  render() {
    return (
      <div className="subscribe-container">
        {this.props.isSubscribed
          ? (<Row>Aitäh, hoiame teid kursis.</Row>)
          : (<form>
            <Row>
              <Col xs={12}>
                <h3 className='primary-header-2 text-center'>
                  Soovid rohkem teada meie tegevustest? Jäta oma kontakt:
                </h3>
              </Col>
            </Row>
            {rowWrapper(<Field name="emailfield" component={TextField} hintText="hello"/>)}
            {rowWrapper(<Button onClick={e => this.props.subscribe(e)}>Submit</Button>)}
          </form>)
        }

      </div>
    );
  }
}


