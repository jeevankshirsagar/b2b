import React from "react";
import s from "./Footer.module.scss";
import { Container, Row, Col, Input, Button } from "reactstrap";
import Link from 'next/link'

import logo from "public/images/e-commerce/logo-white.svg";
import Google from "public/images/e-commerce/Google";
import Twitter from "public/images/e-commerce/Twitter";
import Linkedin from "public/images/e-commerce/Linkedin";
import Facebook from "public/images/e-commerce/Facebook";

const Footer = () => {

  return (
    <footer className={s.footer}>
      <Container>
        {/* <Row className={"justify-content-between"}>
          <Col xl={5} md={5}>
            <h5 className={"text-white fw-bold"}>Many desktop publishing</h5>
            <p className={"text-muted mt-3"}>
            Do you want to receive exclusive email offers? Subscribe to our newsletter! You will receive a unique promo code which gives you a 20% discount on all our products in 10 minutes.
            </p>
          </Col>
          <Col xl={5} md={7} className={"d-flex align-items-center"}>
            <Input
              type={"email"}
              placeholder={"Enter your email"}
              className={"mr-3 border-0"}
              style={{ height: 51 }}
            />
            <Button color={"primary"} className={"fw-bold"}>
              Subscribe
            </Button>
          </Col>
        </Row> */}
        <>
          <hr className={s.footer__hr} />
          <Row className={"my-5 justify-content-between"}>
            <Col
              xl={5}
              md={3}
              className={"d-flex flex-column justify-content-between"}
            >

              <div style={{ marginLeft: '270px' }}>
                <Col md={4} sm={6} xs={12}>
                  <section className={`${s.top_ele} img-fluid`} style={{ marginLeft: '-280px' }}>
                    <h5 className={"text-white fw-bold text-uppercase mb-4"}>
                      Social Media
                    </h5>
                  </section>


                </Col>
              </div>



              <div className={`${s.socialLinks}`} style={{ marginLeft: '6px', paddingBottom: '60px' }}>
                <Link href="/">
                  <a className={s.socialLink} target="_blank" rel="noopener noreferrer">
                    <Google />
                  </a>
                </Link>
                <Link href="/">
                  <a className={s.socialLink} target="_blank" rel="noopener noreferrer">
                    <Twitter />
                  </a>
                </Link>
               
                <Link href="/">
                  <a className={s.socialLink} target="_blank" rel="noopener noreferrer">
                    <Facebook />
                  </a>
                </Link>
              </div>
            </Col>
            <Col md={9} xl={7} sm={12}>
              <Row className={s.linksRow}>

                <section className={`${s.top_com} img-fluid`}>
                  <Col md={4} sm={6} xs={12}>
                    <h5 className={"text-white fw-bold text-uppercase mb-4"}>
                      company
                    </h5>
                    {/* <Link href="/about"><h6 className={`mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>What We Do</h6>
</Link> */}
                    <Link href="/shop"><h6 className={`mb-3 ${s.navigationLink}`}>shop</h6></Link>
                    <Link href="/faq"><h6 className={`mb-3 ${s.navigationLink}`}>FAQs</h6></Link>
                  </Col>
                </section>
                <section className={`${s.top_my} img-fluid`}>
                  <Col md={4} sm={6} xs={12}>
                    <h5 className={"text-white fw-bold text-uppercase mb-4"} style={{ whiteSpace: 'nowrap' }}>
                      my account
                    </h5>

                    <Link href="/login"><h6 className={`mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Sign In</h6>
</Link>
                    <Link href="/cart"><h6 className={`mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>View Cart</h6>
</Link>
                    <Link href="account/"><h6 className={`mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Order Tracking</h6>
</Link>
                    <Link href="/faq"><h6 className={`mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Help & Support</h6>
</Link>
                  </Col>
                </section>



                <section className={`${s.top_cust} img-fluid`}>
                  <Col md={4} sm={6} xs={12}>
                    <h5 className={"text-white fw-bold text-uppercase text-nowrap mb-4"}>
                      customer service
                    </h5>
                    <Link href="/contact">
                    <h6 className={`text-white  ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Help & Contact Us</h6>

                    </Link>
                    <Link href="/account">
                    <h6 className={` text-white  mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Returns & Refunds</h6>

                    </Link>
                    <Link href="/shop">
                    <h6 className={` text-white mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Online Stores</h6>

                    </Link>
                    {/* <Link href="/about-team">
                    <h6 className={`mb-3 ${s.navigationLink}`} style={{ whiteSpace: 'nowrap' }}>Terms & Conditions</h6>

                    </Link> */}
                  </Col>
                </section>



              </Row>
            </Col>
          </Row>
        </>
        <hr className={`${s.footer__hr} mb-0`} />
        {/* <Row style={{ padding: "30px 0" }}>
          <Col sm={12}>
            <p className={"text-muted mb-0"}>© 2023-{new Date().getFullYear()} powered by <Link href="https://yodigital.com"><span className={s.navigationLink}>YoDigital</span></Link></p>
          </Col>
        </Row> */}
      </Container>
    </footer>
  );
};

export default Footer;