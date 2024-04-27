import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import s from './Faq.module.scss'
import Head from "next/head";

const Index = () => {

  const handleScroll = (elementId) => {
    const element = document.querySelector(`#${elementId}`);
    element.scrollIntoView({behavior: 'smooth'});
    
  }

  return (
    <>
      <Head>
        <title>FAQ</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

<meta name="description" content="yodigital B2B" />
<meta name="keywords" content="ecommerce, yodigital" />
<meta name="author" content="yodigital pvt ltd" />
<meta charSet="utf-8" />


<meta property="og:title" content="YoDigital B2B ecommerce portal"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://localhost:3000"/>
<meta property="og:image" content="https://localhost:3000/images/blogs/content_image_six.jpg"/>
<meta name="twitter:card" content="summary_large_image" />

<meta property="fb:app_id" content="712557339116053" />

<meta property="og:site_name" content="yodigital"/>
<meta name="twitter:site" content="@yodigital" />
      </Head>
      <Container className={"mb-5"} style={{ paddingTop: 32 }}>
        <Row className="d-flex justify-content-between">
          <Col sm={3} style={{position: 'sticky', top: 100, height: '100%'}}>
            <h1 className="fw-bold text-uppercase mb-4">faq</h1>
            {/* <p className={`${s.pageSubtitle} mb-5`}>
              Successful brands get into the mind slowly. A blurb in a magazine.
              A mention in a newspaper. A comment from a friend. A display in a
              retail
            </p> */}
            {/* <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`} onClick={() => handleScroll("company")}>Company Policies</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`} onClick={() => handleScroll("payment")}>Payment Options</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`} onClick={() => handleScroll("terms")}>Terms & Conditions</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`}>Positioning</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`}>Efficient</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`}>Conditions</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`}>Mind Procedure</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`} onClick={() => handleScroll("delivery")}>Delivery Job</Button>
            <Button className={`fw-bold mb-4 bg-transparent border-0 p-0 ${s.btn} d-block`}>Marketplace</Button> */}
          </Col>
          {/* <Col sm={8}>
            <div id={"company"}>
              <h6 className={`${s.categoryTitle} text-primary text-uppercase mb-3 fw-bold`}>
                company Policies
              </h6>
              <h4 className={`${s.faqTitle} fw-bold mb-4`}>
              You Can Learn About Company Policies Gide, Some Rules, and Useful Info
              </h4>
              <p className="text-muted">
              Company policies guide is useful information for clients. You can learn about company rules regarding payment methods, shipping, support, etc. If you have questions you can always study this guide to find necessary answers for you, or use a contact form.{" "}
              </p>
            </div>
            <hr className="mb-5" />
            <div id={"payment"}>
              <h6 className={`${s.categoryTitle} text-primary text-uppercase mb-3 fw-bold`}>
                payment options
              </h6>
              <h4 className={`${s.faqTitle} fw-bold mb-4`}>
              Do You Want To Know More About Payment Options? Here Is All You Need to Know
              </h4>
              <p className="text-muted">
              Here is some useful information about payment options. You can use your PayPal account to make a purchase. You need to know the email address to make a payment. You can also use your credit card to make a purchase. You can make a payment anywhere you want.{" "}
              </p>
            </div>
            <hr className="mb-5" />
            <div id={"terms"}>
              <h6 className={`${s.categoryTitle} text-primary text-uppercase mb-3 fw-bold`}>
                terms & conditions
              </h6>
              <h4 className={`${s.faqTitle} fw-bold mb-4`}>
              The Terms of this Agreement Concerns Everyone Who Has Access to the Website
              </h4>
              <p className="text-muted">
              Everyone who has access to the website need to be aware of these terms. You need to maintain your rights and obligations. Some guidelines facilitate the use of this wonderful website. Learning these guidelines can have some benefits.{" "}
              </p>
            </div>
            <hr className="mb-5" />
            <div id={"delivery"}>
              <h6 className={`${s.categoryTitle} text-primary text-uppercase mb-3 fw-bold`}>
                delivery job
              </h6>
              <h4 className={`${s.faqTitle} fw-bold mb-4`}>
              Learn More About the Delivery Job We Provide. This Can Be Useful Information
              </h4>
              <p className="text-muted">
              Delivery is an important part of our daily routine. The key to success is the right timing. We pay attention to the speed, but what is most important, we care about the quality of our job. We can assure you that your order will be delivered in time.{" "}
              </p>
            </div>
            <hr />
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default Index;
