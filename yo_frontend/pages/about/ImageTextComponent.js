import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import s from './About.module.scss';

const ImageTextComponent = ({ imageUrl, text, content }) => {
  return (
    <Container >
      <Row className="d-flex flex-column flex-md-row ">
        <Col md="6" className="order-md-2">
          <div className="image">
            <img src={imageUrl} alt="Paris" style={{ maxHeight: '350px', width: '100%' , borderRadius: '25px'}} />
          </div>
        </Col>
        <Col md="6" className="order-md-1 mt-3">
          <div className="text">
            <h2 className='fw-bold' >
            {text}</h2>
            <h6>{content}</h6>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ImageTextComponent;
