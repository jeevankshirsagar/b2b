import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import Link from 'next/link';
import img from "public/images/e-commerce/404/404.png";
import s from "./Error.module.scss";

import InstagramWidget from 'components/e-commerce/Instagram';
import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>404</title>
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
      <Container>
        <Row className={"mb-5"} style={{ marginTop: 32 }}>
          <section className={s.error}>
            <Container className={"h-100"}>
              {/* <Row className={"h-100"}>
                <Col sm={6}></Col>
                <Col
                  sm={6}
                  className={
                    "d-flex flex-column justify-content-center align-items-start"
                  }
                >
                  <h3 className={"fw-bold text-primary mb-3"}>OOPS!</h3>
                  <h2 className={"fw-bold mb-4"}>Something’s Missing</h2>
                  <p style={{ width: 300 }} className={"mb-5"}>
                  Unfortunately, we cannot find the page you are looking for. Thought, we tried...
                  </p>
                  <Link href="/">
                      <Button outline color={"primary"} className={"fw-bold"}>
                          TAKE ME AWAY
                      </Button>
                  </Link>
                </Col>
              </Row> */}
            </Container>
          </section>
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
