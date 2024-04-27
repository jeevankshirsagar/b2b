import React from "react";
import { Container, Row, Col } from "reactstrap";
import img1 from "public/images/e-commerce/about/img1.png";
import img2 from "public/images/e-commerce/about/img2.png";

import CompanyDetails from "components/about/CompanyDetails";
import InstagramWidget from 'components/e-commerce/Instagram';
import Timeline from "components/about/Timeline";
import ImageTextComponent from "./ImageTextComponent";

import Head from "next/head";

const Index = () => {
  return (
    <>
      <Head>
        <title>About Yo! Digital</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

<meta name="description" content="yodigital B2B" />
<meta name="keywords" content="ecommerce, yodigital" />
<meta name="author" content="yodigital pvt ltd" />
<meta charSet="utf-8" />


<meta property="og:title" content="YoDigital B2B ecommerce portal"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="http://srv481744.hstgr.cloud:3000"/>
<meta property="og:image" content="https://localhost:3000.com/images/blogs/content_image_six.jpg"/>
<meta name="twitter:card" content="summary_large_image" />

<meta property="fb:app_id" content="712557339116053" />

<meta property="og:site_name" content="yodigital"/>
<meta name="twitter:site" content="@yodigital" />
      </Head>

      {/* <CompanyDetails /> */}
      < Container fluid>
      <ImageTextComponent 
        imageUrl="https://img.freepik.com/free-photo/happy-motivated-colleagues-office_114579-2790.jpg?size=626&ext=jpg&ga=GA1.1.1398682630.1709107692&semt=ais" 
        text="Welcome to Yo! Digital"
        content="At Yo! Digital, we're all about staying ahead of the curve and bringing you the latest trends in technology. Whether you're a tech-savvy enthusiast or just looking to upgrade your everyday gadgets, we've got something for everyone in our extensive collection.

        Our journey began with a simple mission: to provide our customers with access to the coolest and most innovative electronic products on the market. From smartphones to smart home devices, we handpick each item to ensure it meets our high standards of quality and performance.
        
        What makes Yo! Digital stand out is our commitment to delivering an exceptional shopping experience. Our user-friendly website makes it easy to browse and discover new gadgets, while our dedicated customer support team is always here to assist you with any questions or concerns."
      />
      </Container>
<Timeline />

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