import React from 'react';
import { Row, Col } from "reactstrap";

import s from "./Instagram.module.scss";
import insta1 from "public/images/e-commerce/home/insta1.png";
import insta2 from "public/images/e-commerce/home/insta2.png";
import insta3 from "public/images/e-commerce/home/insta3.png";
import insta4 from "public/images/e-commerce/home/insta4.png";
import insta5 from "public/images/e-commerce/home/insta5.png";
import insta6 from "public/images/e-commerce/home/insta6.png";

const InstagramWidget = () => (
    <section style={{ marginTop: 0, marginBottom: 80, marginLeft: 105, marginRight: 90 }}>


        <section className={`${s.top_heading} img-fluid`}>
            <h3 className={"text-left fw-bold mb-4"}>Top Brands</h3>
            {/* Additional content can go here */}
        </section>

        <section className={`${s.top_headingb} img-fluid`}>
        <h5 className={"text-left fw-bold mb-4"} style={{ color: '#FF4500', marginTop: '-15px', fontSize: '14px' }}>Our Demanding Brands</h5>
        </section>


        <Row className={"no-gutters"}>

            <section className={`${s.top_ele} img-fluid`} style={{ textAlign: 'center' }}>
                <Col md={2} sm={4} xs={6} style={{ maxWidth: '110.666667%' }}>
                    <div>
                        <img src={insta1} style={{ height: '130px', maxWidth: '100%', borderRadius: '50%', borderColor: '#FF4500', borderWidth: '4px', borderStyle: 'solid' }} alt="Instagram" />
                        <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Apple</p>
                    </div>
                </Col>
            </section>


            <section className={`${s.top_sam} img-fluid`} style={{ textAlign: 'center' }}>
                <Col md={2} sm={4} xs={6} style={{ maxWidth: '110.666667%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={insta2} style={{ height: '130px', maxWidth: '100%', borderRadius: '50%', borderColor: '#FF4500', borderWidth: '4px', borderStyle: 'solid' }} />            <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Samsung</p>
                    </div>
                </Col>
            </section>

            <section className={`${s.top_sony} img-fluid`} style={{ textAlign: 'center' }}>
                <Col md={2} sm={4} xs={6} style={{ maxWidth: '110.666667%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={insta3} style={{ height: '130px', maxWidth: '100%', borderRadius: '50%', borderColor: '#FF4500', borderWidth: '4px', borderStyle: 'solid' }} />            <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Sony</p>
                    </div>
                </Col>
            </section>

            <section className={`${s.top_pana} img-fluid`} style={{ textAlign: 'center' }}>
                <Col md={2} sm={4} xs={6} style={{ maxWidth: '110.666667%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={insta4} style={{ height: '130px', maxWidth: '110%', borderRadius: '50%', borderColor: '#FF4500', borderWidth: '4px', borderStyle: 'solid' }} />            <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Panasonic</p>
                    </div>
                </Col>
            </section>

            <section className={`${s.top_phil} img-fluid`} style={{ textAlign: 'center' }}>
                <Col md={2} sm={4} xs={6} style={{ maxWidth: '110.666667%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={insta5} style={{ height: '130px', maxWidth: '110%', borderRadius: '50%', borderColor: '#FF4500', borderWidth: '4px', borderStyle: 'solid' }} />            <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Philips</p>
                    </div>
                </Col>
            </section>

            <section className={`${s.top_boat} img-fluid`} style={{ textAlign: 'center' }}>
                <Col md={2} sm={4} xs={6} style={{ maxWidth: '110.666667%' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img src={insta6} style={{ height: '130px', maxWidth: '100%', borderRadius: '50%', borderColor: '#FF4500', borderWidth: '4px', borderStyle: 'solid' }} />            <p style={{ fontWeight: 'bold', marginTop: '8px' }}>Boat</p>
                    </div>
                </Col>
            </section>

        </Row>

    </section>
);

export default InstagramWidget;