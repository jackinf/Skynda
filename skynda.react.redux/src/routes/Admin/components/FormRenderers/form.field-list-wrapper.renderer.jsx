/**
 * Created by jevgenir on 3/7/2017.
 */
import React from "react";
import {Row, Col} from "react-bootstrap";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

/**
 * Wrapper for rendering list of items (for redux-form fields)
 * @param fields
 * @param title
 * @param block - REACT element
 * @param isRequired - is the field required for submission?
 */
const fieldListWrapper = ({fields, title, block, isRequired = false}) => (
  <Row style={{marginBottom: "20px"}}>
    <Col sm={12}>
      <Row>
        <Col sm={12}>
          <h3>
            <FloatingActionButton mini={true} onClick={() => fields.push()}>
              <ContentAdd />
            </FloatingActionButton>&nbsp;{title} ({fields.length})
          </h3>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          {block}
        </Col>
      </Row>
    </Col>
  </Row>
);

export default fieldListWrapper;
