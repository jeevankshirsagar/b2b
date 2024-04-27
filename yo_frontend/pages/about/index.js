import React from "react";
import { Container, Row, Col } from "reactstrap";
import img1 from "public/images/e-commerce/about/img1.png";
import img2 from "public/images/e-commerce/about/img2.png";

import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>About YoDigital</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

<meta name="description" content="yodigital B2B" />
<meta name="keywords" content="ecommerce, yodigital" />
<meta name="author" content="yodigital pvt ltd" />
<meta charSet="utf-8" />


<meta property="og:title" content="YoDigital B2B ecommerce portal"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://localhost:3000"/>
<meta property="og:image" content="https://localhost:3000.com/images/blogs/content_image_six.jpg"/>
<meta name="twitter:card" content="summary_large_image" />

<meta property="fb:app_id" content="712557339116053" />

<meta property="og:site_name" content="yodigital"/>
<meta name="twitter:site" content="@yodigital" />
      </Head>

      {/* <Container className={"mb-5"} style={{ marginTop: 32 }}>
        <Row>
          <Col lg={7} md={7} xs={12}>
            <h3 className="fw-bold mb-5">About Us</h3>
            
            <h6> About of B2B website</h6>
          </Col>
        </Row>
      </Container> */}

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