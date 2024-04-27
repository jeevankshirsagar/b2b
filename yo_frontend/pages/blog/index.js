import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from 'axios';

import CompanyDetails from "components/about/CompanyDetails";
import InstagramWidget from 'components/e-commerce/Instagram';

import Head from "next/head";

import s from './Blog.module.scss';
import Timeline from "components/about/Timeline";

const Index = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("/blogs").then((res) => {
      setBlogs([...res.data.rows]);
    }).catch(e => console.log(e));
  }, []);

  return (
    <>
      <Head>
        <title>Blog</title>
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
        <Row>
          <Col style={{ marginTop: "80px", marginBottom: "50px" }}>
            <h1 className="text-center fw-bold">About YoDigital</h1>
          </Col>
        </Row>
      </Container>


      <div className="annc-section text-center">
        <Container className={"mb-5"} style={{ marginTop: 32}}>
          <h3 className="fw-bold mb-4">Gift Distributions</h3>
          <Row>
              {blogs.length > 0 && blogs?.map(post => {
                return (
                  <Col sm={12} md={6} lg={4} style={{ marginTop: 30 }} className={s.blogPost}>
                    <div key={post.id}>
                      <div className={`${s.anc__col_inner}`}>
                        <div className={`${s.anc__col_cover} anc__col_cover`}>
                          <img src={post?.hero_image[0]?.publicUrl} className="img-fluid" width="500" height="200" alt="announcement-thumbnail" />
                        </div>
                        <div className={`${s.annc__col_info} annc__col_info`}>
                          <h5 className="fw-bold">{post?.title}</h5>
                          <h6 className={`${s.post_epigraph}`}>{post.epigraph}{" "}</h6>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              })}
          </Row>
        </Container>
      </div>

      <CompanyDetails />

      <Timeline />


      {/* COMPANY TIMELINE HERE */}

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