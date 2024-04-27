import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import axios from 'axios';

import Head from "next/head";

import s from './Blog.module.scss';


const Index = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const maxPostsToShow = 8;
  const specificPostId = "812cf115-4d07-4b25-a561-0624e7078ea0"; 

  useEffect(() => {
    axios.get("/blogs").then((res) => {
      setBlogs([...res.data.rows]);
    }).catch(e => console.log(e));
  }, []);

  const toggleShowAllPosts = () => {
    setShowAllPosts(!showAllPosts);
  };

  return (
    <>
      <Head>
        <title>Announcement</title>
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
          <Col style={{ marginBottom: "50px" }}>
            <h1 className="text-center fw-bold">Announcement</h1>
          </Col>
        </Row>
      </Container>

      <div className="annc-section text-center">
        <Container fluid className={"mb-5"} style={{ marginTop: 32}}>
          {/* Display specific post at the top */}
          {blogs.map(post => {
            if (post.id === specificPostId) {
              return (
                <Row key={post.id}>
                  <Col sm={12} className={s.blogPost}>
                    
                      <div className={`${s.anc__col_cover} anc__col_cover`}>
                        <img src={post?.hero_image[0]?.publicUrl} className="img-fluid" style={{ objectFit: 'cover', width: '100%', height: '100%',maxHeight:'350px', borderRadius: ' 15px' }} alt="announcement-thumbnail" />
                      </div>
                      
                    
                  </Col>
                </Row>
              );
            }
            return null;
          })}
          
          {/* Render other posts */}
          <h3 className="fw-bold mb-4">Gift Distributions</h3>
          <Row>
              {blogs.slice(0, showAllPosts ? blogs.length : maxPostsToShow).map(post => (
                <Col sm={12} md={6} lg={3} style={{ marginTop: 30 }} className={s.blogPost} key={post.id}>
                  <div>
                    <div className={`${s.anc__col_inner}`}>
                      <div className={`${s.anc__col_cover} anc__col_cover`}>
                        <img src={post?.hero_image[0]?.publicUrl} className="img-fluid" style={{ objectFit: 'cover', width: '100%', height: '200px', borderRadius: ' 15px' }} alt="announcement-thumbnail" />
                      </div>
                      <div className={`${s.annc__col_info} annc__col_info`}>
                        <h5 className="fw-bold">{post?.title}</h5>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
          {!showAllPosts && blogs.length > maxPostsToShow && (
            <div className="text-center">
              <Button onClick={toggleShowAllPosts}>Show More</Button>
            </div>
          )}
        </Container>
      </div>

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
