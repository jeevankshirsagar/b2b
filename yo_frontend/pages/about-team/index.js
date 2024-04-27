import React from "react";
import { Container, Row, Col } from "reactstrap";
import person1 from "public/images/e-commerce/team/person1.jpg";
import person2 from "public/images/e-commerce/team/person2.jpg";
import person3 from "public/images/e-commerce/team/person3.jpg";
import person4 from "public/images/e-commerce/team/person4.jpg";
import person5 from "public/images/e-commerce/team/person5.jpg";
import person6 from "public/images/e-commerce/team/person6.jpg";
import person7 from "public/images/e-commerce/team/person7.jpg";
import person8 from "public/images/e-commerce/team/person8.jpg";
import googleImg from "public/images/e-commerce/team/google.svg";
import facebookImg from "public/images/e-commerce/team/facebook.svg";
import behanceImg from "public/images/e-commerce/team/behance.svg";
import InstagramWidget from 'components/e-commerce/Instagram';
import s from './Team.module.scss';

import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>Terms</title>
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
      <Container className={"mb-5"} style={{ marginTop: 32 }}>
        <Row>
          <Col xs={12}>
            <h3 className={"fw-bold"}>
              Meet the team who dares to create differently.
            </h3>
          </Col>
        </Row>
        
      </Container>
      <InstagramWidget />
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
