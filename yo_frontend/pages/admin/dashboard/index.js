import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import Head from "next/head";
import s from "./Dashboard.module.scss";
import SimpleLine from "./widget";
import { splineArea } from "./chartsMock";
import HomePageWidget from "../widgets/HomePageWidget";


const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Index = ({ currentUser }) => {
  const [usersData, setUsersData] = useState({ rows: [] });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users/");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
        setUsersData({ rows: data }); // Update usersData with an object containing the fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


    return (
      <>
        <Head>
          <title>Ecommerce dashboard</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

          <meta name="description" content="b2b store and module" />
          <meta name="keywords" content="yodigital" />
          <meta name="author" content="yodigital pvt. ltd." />
          <meta charSet="utf-8" />

          <meta property="og:title" content="yodigital b2b website" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://localhost:3000/" />

          <meta name="twitter:card" content="summary_large_image" />

          <meta property="fb:app_id" content="712557339116053" />

          <meta property="og:site_name" content="yodigital" />
          <meta name="twitter:site" content="@yodigital" />
        </Head>
        <div className={s.root}>
        <h1 className="page-title">
  Welcome,{" "}
  {currentUser ? currentUser.firstName || "User" : "User"}
  ! <br />
  <small>
    <small>
      Your role is{" "}
      {currentUser && currentUser.role}
    </small>
  </small>
</h1>
          <Row>
          <Col lg={3}>
            <SimpleLine
              color="#5EC992"
              title={`${usersData.rows.count}`}
              subtitle="Total Users Register"
              value={usersData.rows}
            />
          </Col>
          <Col lg={3}>
            <SimpleLine
              color="#CA4155"
              title={usersData.rows && usersData.rows.length > 0 ? usersData.rows[0].balance : "No data available"}
              subtitle="Total Dues"
             
            />
          </Col>
            <Col lg={3}>
              <SimpleLine
                color="#D19C48"
                title="58.8K"
                subtitle="Revenue Generated"
              />
            </Col>
            <Col lg={3}>
              <SimpleLine
                color="#4392D5"
                title="89.3K"
                subtitle="Revenue Generated"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={s.dashboardWidgetWrapper}>
                <h3 className={s.widgetMainTitle} style={{ paddingLeft: 25 }}>
                  Orders
                </h3>
                <ApexChart
                  className="sparkline-chart"
                  series={splineArea.spline.series}
                  options={splineArea.spline.options}
                  type={"area"}
                  height={"350px"}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={9}>
              <HomePageWidget />
            </Col>
          </Row>
        </div>
    </>
    );
  }
  
  function mapStateToProps(store) {
    return {
      currentUser: store.auth.currentUser,
      loadingInit: store.auth.loadingInit,
    };
  }
  
  export default connect(mapStateToProps)(withRouter(Index));
