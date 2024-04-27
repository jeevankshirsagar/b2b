import React from 'react'
import { Container, Row, Col } from 'reactstrap'

export default function GiftDistributions() {

    const colStyle = {
        "padding": "15px",
        "box-shadow": "rgba(0, 0, 0, 0.1) 0px 1px 2px 1px"
    }
    const cardTitle = {
        "margin": "12px 0 0 0"
    }

  return (
    <>
        <div className="annc-section text-center">
            <Container style={{ marginTop: 80, marginBottom: 80 }}>
                <h3 className={"text-center fw-bold mb-4"}>Gift Distributions</h3>
                <Row style={{ justifyContent: 'center' }}>
                    <Col sm={12} md={6} lg={4} style={{ marginTop: 30 }}>
                        <div className="anc-col-inner" style={colStyle}>
                            <div className="anc-col-cover">
                            <img className="img-fluid" src="https://placehold.co/500x400.webp" width="500" height="200" alt="thumb-img" />
                            </div>
                            <div className="annc-col-info">
                                <h5 className="fw-bold" style={cardTitle}>Lorem Ipsum</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} style={{ marginTop: 30 }}>
                        <div className="anc-col-inner" style={colStyle}>
                            <div className="anc-col-cover">
                            <img className="img-fluid" src="https://placehold.co/500x400.webp" width="500" height="200" alt="thumb-img" />
                            </div>
                            <div className="annc-col-info">
                                <h5 className="fw-bold" style={cardTitle}>Lorem Ipsum</h5>
                            </div>
                        </div>
                    </Col>
                    <Col sm={12} md={6} lg={4} style={{ marginTop: 30 }}>
                        <div className="anc-col-inner" style={colStyle}>
                            <div className="anc-col-cover">
                            <img className="img-fluid" src="https://placehold.co/500x400.webp" width="500" height="200" alt="thumb-img" />
                            </div>
                            <div className="annc-col-info">
                                <h5 className="fw-bold" style={cardTitle}>Lorem Ipsum</h5>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  )
}