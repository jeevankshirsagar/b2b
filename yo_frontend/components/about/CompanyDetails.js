import React from 'react'

import { Container, Row, Col } from 'reactstrap'

import styles from '../../pages/blog/Blog.module.scss';

export default function CompanyDetails() {
    
  return (
    <>
        <div className="about_company-details">
            <Container style={{ marginTop: 80, marginBottom: 80 }}>
                <h3 className={"text-center fw-bold mb-4"}>Company Details of Yodigital</h3>
                <div className="about_connect text-center" style={{ marginTop: 50 }}>
                    <Row style={{ justifyContent: 'center' }}>
                        <Col sm={12} md={6} lg={4}>
                            <div style={{ height: '100%' }}>
                                <div className={`${styles.about_item} about_item`} style={{ marginBottom: 30 }}>
                                    <i className="las la-map-marker-alt"></i>
                                    <div style={{ marginBottom: 12 }}></div>
                                    <p>
                                        802/2, Azad Nagar Sirhind Road,
                                        <br />
                                        Patiala-PB, Patiala, Haryana,
                                        <br />
                                        134109, India.
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <div className={`${styles.about_item} about_item`} style={{ marginBottom: 30 }}>
                                <i className="lar la-envelope"></i>
                                <div style={{ marginBottom: 12 }}></div>
                                <p>
                                    <a href="mailto:example@gmail.com">
                                        Example@gmail.com
                                    </a>
                                </p>
                                <p>
                                    <a href="mailto:loremipsum@gmail.com">
                                        Loremipsum@gmail.com
                                    </a>
                                </p>
                            </div>
                        </Col>
                        <Col sm={12} md={6} lg={4}>
                            <div className={`${styles.about_item}`} style={{ marginBottom: 30 }}>
                                <i className="las la-phone"></i>
                                <div style={{ marginBottom: 12 }}></div>
                                <p>
                                    <a href="tel:+911234567890">
                                        +91 123 456 7890
                                    </a>
                                </p>
                                <p>
                                    <a href="tel:+910987654321">
                                        +91 987 654 3210
                                    </a>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    </>
  )
}