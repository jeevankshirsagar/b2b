import React, { Component } from "react";
import CategoriesListTable from "./CategoriesListTable";
import Head from 'next/head';

class Index extends Component {
  render() {
    return (
      <div>
        <Head>
          <title>Categories List</title>
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
        <CategoriesListTable/>
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default Index;
