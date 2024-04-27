import React, { useEffect, useState } from "react";
import { Container, Row, Col, Progress, Button, Table } from "reactstrap";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import s from "./Account.module.scss";
import { useRouter } from "next/router";
import Login from "pages/login";
import { logoutUser } from "redux/actions/auth";
import axios from "axios";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { chartData, splineArea } from "../admin/dashboard/chartsMock";
import sa from "../admin/dashboard/Dashboard.module.scss";
import alertAnimation from '../../public/animation/alert.json';
import empty from '../../public/animation/empty.json';
import Lottie from 'lottie-react';
import 'bootstrap-icons/font/bootstrap-icons.css';




import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { options } from "toastr";
        

const Index = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const [sidebarToggle, setSidebarToggle] = useState(false);

  const toggleSidebar = () => {
    setSidebarToggle((prevState) => !prevState);
  };

  const [settings, setSettings] = useState([]);

  useEffect(() => {
    fetch("http://srv481744.hstgr.cloud:8080/api/service/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setSettings(data.settings); // Corrected to setSettings(data.settings)
        console.log(data.settings);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/orders/${currentUser.id}`);
      if (response.data && response.data.orders && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        console.error("Orders data not found in response:", response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error: Show error message to user or log it for debugging
    } finally {
      setLoading(false); // Set loading to false after the request completes (regardless of success or failure)
    }
  };
  

  
  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const handleSettingsClick = () => {
    router.push("/admin/users/edit");
  };

  const doLogout = async () => {
    dispatch(logoutUser());
    try {
      await router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error redirecting to home page:", error);
    }
  };

  const refreshPageTwice = () => {
    window.location.reload(); // First refresh
    setTimeout(() => {
      window.location.reload(); // Second refresh after a delay
    }, 100); // Delay in milliseconds (adjust as needed)
  };



  
  const chartData = currentUser ? [
    { x: "Current Date", y: currentUser.balance } // Assuming this is a single data point
  ] : [];

  const options = {
    chart: {
      type: "line",
      height: "200px",
      toolbar: {
        show: false // Hide the toolbar
      }
        
    },
    yaxis: {
      min: 0 
    },
    
    
  };



  const duesDate = currentUser?.duedate ? new Date(currentUser.duedate) : null;
const currentDate = new Date();
const [showPopup, setShowPopup] = useState(false); // Set initial state to false
const closePopup = () => {
  setShowPopup(false);
};



useEffect(() => {
  if (duesDate && currentDate > duesDate) {
    // Show pop-up indicating that dues date has passed
    setShowPopup(true);
  }
}, [duesDate, currentDate]); 



  return (
    <>
      <Head>

        <title>Account</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="description" content="yodigital B2B" />
        <meta name="keywords" content="ecommerce, yodigital" />
        <meta name="author" content="yodigital pvt ltd" />
        <meta charSet="utf-8" />

        <meta property="og:title" content="YoDigital B2B ecommerce portal" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://localhost:3000" />
        <meta
          property="og:image"
          content="https://localhost:3000/images/blogs/content_image_six.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="712557339116053" />

        <meta property="og:site_name" content="yodigital" />
        <meta name="twitter:site" content="@yodigital" />
      </Head>


      {currentUser ? (
        <>
        {showPopup && (
          <div className={`${s.popup}`}>
            <div className={`${s.popupcontent}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Lottie
              animationData={alertAnimation}
              style={{ height: "70px", width: "70px" }}
            />
              <h2 className={`${s.du }`  }>Dues Date Passed</h2>
              <p className={`${s.po}`}>The dues date has passed.</p>
              <button onClick={closePopup} className={`${s.bo}` } color={"primary"}>Close</button>
            </div>
          </div>
        )}
          <Col
            sm={12}
            className={`account__dashboard position-relative`}
            style={{ marginTop: 80, marginBottom: 80 }}
          >
            <Container  fluid style={{width: '80%'}}> 
              <Row>
                <div
                  className={`col-sm-12 col-lg-4 ${s.dashboard__drawer} ${
                    sidebarToggle
                      ? `${s.dashboard__drawer_active}`
                      : "d-none d-lg-block dashboard__drawer"
                  }`}
                >
                  <div
                    className={`${s.account__sidebar} account__sidebar`}
                    style={{ borderRadius: "15px" , backgroundColor: '#fff', padding: '25px'}}
                  >
                    <div
                      className={`${s.account__meta_data} account__meta_data`}
                      style={{ marginTop: 30, borderRadius: "15px", backgroundColor: '#fff', padding: '20px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                    >
                       <div className="d-flex justify-content-between mb-2">
                      <h5 className="mb-3 fw-bold" style={{border: '1px solid #fff'}}>Personal Details</h5><i className="bi bi-person-circle" style={{fontSize:'1.5rem'}}></i></div>
                      <p>{currentUser.firstName}</p>
                      <p>{currentUser.phoneNumber}</p>
                      <p>{currentUser.email}</p>
                    </div>

                    <div
                      className={`${s.account__meta_data} account__meta_data`}
                      style={{ marginTop: 30, borderRadius: "15px", backgroundColor: '#fff', padding: '20px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                    >
                      <div className="d-flex justify-content-between mb-2">
                      <h5 className="mb-3 fw-bold" style={{border: '1px solid #fff'}}>Wallet</h5><i className="bi bi-credit-card-2-back-fill" style={{fontSize:'1.5rem'}}></i></div>
                      <div className="d-flex justify-content-between mb-2">
                        {/* {currentUser.balance ? (
                          <p className={"fw-bold"}>{currentUser.balance}</p>
                        ) : (
                          <p>No Dues</p>
                        )} */}

                        {/*dues */}
                        <label>DUES:-</label>
                        {/*price */}
                        <h2 className={"fw-bold text-seconadary"}>{currentUser.balance}</h2>

                        {/* <span>Date</span> */}
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          {/*date */}
                          <label>DATE:</label>
                          {/*date */}
                          <span className={"fw-bold "}>{currentUser.duedate}</span>
                        </div>
                      
                      </div>
                    
                    </div>

                    <div
                      className={`${s.account__meta_data} account__meta_data`}
                      style={{ marginTop: 30, borderRadius: "15px", backgroundColor: '#fff', padding: '20px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                    >
                    <div className="d-flex justify-content-between mb-2">  <h5 className="mb-3 fw-bold" >Company Details</h5><i className="bi bi-building-fill-check" style={{fontSize:'1.5rem'}}></i></div>
                      <div>
                          {/*date */}
                          <label>Company : </label>
                          {/*date */}
                          <span className={"fw-bold"}> {currentUser.bname}</span>
                        </div>
                        <div>
                          {/*date */}
                          <label>Address : </label>
                          {/*date */}
                          <span className={"fw-bold"}> {currentUser.baddress}</span>
                        </div>
                                            <div>
                          {/*date */}
                          <label>CIN : </label>
                          {/*date */}
                          <span className={"fw-bold align-right"}> {currentUser.cin}</span>
                        </div>
                      
                        <div>
                          {/*date */}
                          <label>GST : </label>
                          {/*date */}
                          <span className={"fw-bold"}> {currentUser.gst}</span>
                        </div>
                    </div>

                    <div
                      className={`${s.account__meta_data} account__meta_data`}
                      style={{ marginTop: 30, borderRadius: "15px", backgroundColor: '#fff', padding: '20px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}
                    >
                      <div className="d-flex justify-content-between mb-2">  <h5 className="mb-3 fw-bold" >Manager</h5><i className="bi bi-headset" style={{fontSize:'1.5rem'}}></i></div>
                      <p>
                        Name: <span>Omkar</span>
                      </p>
                      <p>
                        Area: <span>Andheri</span>
                      </p>
                    </div>

                    <div
                      className="account__logout"
                      style={{ marginTop: 50, borderRadius: "7px" }}
                    >
                      <Button
                        style={{ width: "100%", borderRadius: "30px" }}
                        color={"primary"}
                        onClick={doLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>

                <div
                  className={`${
                    sidebarToggle ? "col-12" : "col-sm-12 col-lg-8"
                  }`}
                  style={{ borderRadius: "10px", backgroundColor: "#d5ecfa" }}
                >
                  <div className="account__details mt-5">
                    <div className="account__details_in d-flex justify-content-between align-center pb-3">
                      <h3 className={"fw-bold mb-4 mb-md-0 p-3"}>My Account</h3>
                      <button
                        className={`account__toggler_btn d-block d-lg-none ${s.account__toggler_btn}`}
                        onClick={toggleSidebar}
                      >
                        {sidebarToggle ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-list"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {loading ? (
                      <span></span>
                    ) : (
                      <section className={`${s.promo1} ${s.promoUpdated}`}>
                        {settings.map((seting) => (
                          <div
                            style={{ position: "relative", zIndex: "1" }}
                            key={seting.id}
                          >
                            <h3 className={"fw-bold mb-0"}>{seting.text}</h3>
                            <h1 className={"text-primary fw-bold mb-3"}>
                              {seting.description}
                            </h1>
                            <a
                              href="https://buy.stripe.com/test_bIY3fJ785cOc7Is288"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <p className={"fw-bold text-orange"}>Pay Now</p>
                            </a>
                          </div>
                        ))}
                      </section>
                    )}

                    {/* <Row style={{ marginTop: 30 }}>
                    <Col sm={12} md={6}>
                      <div className={`${s.account__graph} account__graph_due`}>
                        <img src="https://placehold.co/600x200.webp" width="600" height="200" className="img-fluid" />
                      </div>
                    </Col>
                    <Col sm={12} md={6} className="mt-4 mt-md-0">
                      <div className={`${s.account__graph} account__graph_orders`}>
                        <img src="https://placehold.co/600x200.webp" width="600" height="200" className="img-fluid" />
                      </div>
                    </Col>
                  </Row> */}

                    {/*APEX CHART */}

                    <div className="mt-4">
                      <Row>
                        <Col>
                          <div className={sa.dashboardWidgetWrapper}>
                            <h3
                              className={sa.widgetMainTitle}
                              style={{ paddingLeft: 25 }}
                            >
                              Dues
                            </h3>
                            <ApexChart
                              className="sparkline-chart"
                              series={[{ data: chartData }]} 
                              options={options}
                              type={"line"}
                              height={"200px"}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <Row>
  <Col sm={12} style={{ overflow: "auto", marginTop: 30 }}>
    <h3 className={"fw-bold mb-4"}>Orders</h3>

    {orders.length > 0 ? (
      <Table className={s.accountTable} borderless>
        <thead>
          <tr style={{ borderBottom: "1px solid #D9D9D9" }}>
            <th className={"bg-transparent text-dark px-0"}>
              Date
            </th>
            <th className={"bg-transparent text-dark px-0"}>
              Product
            </th>
            <th className={"bg-transparent text-dark px-0"}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.date}</td>
              <td>{order.product}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
    <div style={{ width: '100%', height: '300px', alignContent: 'center'}}><Lottie
      animationData={empty}
      style={{ height: "200px", width: "100%" }}
      
    /><p>No orders found </p></div>
    )}
  </Col>
</Row>

                  </div>
                </div>
              </Row>
            </Container>
          </Col>

          <div className="d-none">
            <Container fluid className={"mb-5"} style={{ marginTop: 32 }}>
              <Row>
                <Col xl={8} lg={8} xs={12}>
                  <h3 className={"fw-bold mb-4"}>My Account</h3>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <Row>
                      <Col xl={12} lg={12} md={12} xs={12}>
                        <section className={s.promo1}>
                          <h3 className={"text-muted fw-bold mb-0"}>
                            Pay Dues and save
                          </h3>
                          <h1 className={"text-primary fw-bold mb-3"}>30%</h1>
                          <a
                            href="https://buy.stripe.com/test_bIY3fJ785cOc7Is288"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className={"fw-bold"}>Pay Now</p>
                          </a>
                        </section>
                      </Col>
                      <Col xl={12} lg={12} xs={12} style={{ overflow: "auto" }}>
                        <h3 className={"fw-bold mb-4"}>My Orders</h3>
                        {orders.length > 0 ? (
                          <Table className={s.accountTable} borderless>
                            <thead>
                              <tr style={{ borderBottom: "1px solid #D9D9D9" }}>
                                <th className={"bg-transparent text-dark px-0"}>
                                  Date
                                </th>
                                <th className={"bg-transparent text-dark px-0"}>
                                  Product
                                </th>
                                <th className={"bg-transparent text-dark px-0"}>
                                  Status
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {orders.map((order) => (
                                <tr key={order.id}>
                                  <td>{order.date}</td>
                                  <td>{order.product}</td>
                                  <td>{order.status}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        ) : (
                          <p>No orders found.</p>
                        )}
                      </Col>
                    </Row>
                  )}
                </Col>
                <Col xl={4} lg={4} xs={12}>
                  <section className={s.profile}>
                    <img src={currentUser.avatar || avatar} alt={"avatar"} />
                    <h5 className={"text-primary fw-bold mt-4"}>
                      {currentUser.firstName || "User"}
                    </h5>
                    <p className={"text-muted"}>{currentUser.email}</p>
                    <div
                      className={"d-flex justify-content-between w-100 mt-4"}
                    >
                      <div className={"d-flex flex-column align-items-center"}>
                        <h6 className={"fw-bold text-muted text-uppercase"}>
                          Dues
                        </h6>
                        <p className={"fw-bold"}>{currentUser.balance}</p>
                      </div>
                      <div className={"d-flex flex-column align-items-center"}>
                        <h6 className={"fw-bold text-muted text-uppercase"}>
                          Order History
                        </h6>
                        <p className={"fw-bold"}>0</p>
                      </div>
                      <div className={"d-flex flex-column align-items-center"}>
                        <h6 className={"fw-bold text-muted text-uppercase"}>
                          Completed
                        </h6>
                        <p className={"fw-bold"}>0</p>
                      </div>
                    </div>
                    <hr />
                    <div className={"w-100 mt-3"}>
                      <h6 className={"fw-bold text-muted text-uppercase"}>
                        Business Address
                      </h6>
                      {currentUser.baddress ? (
                        <span>{currentUser.baddress}</span>
                      ) : (
                        <span>Address not added</span>
                      )}
                    </div>
                    <hr />
                    <div className={"w-100 mt-3"}>
                      <h6 className={"fw-bold text-muted text-uppercase"}>
                        Business Name
                      </h6>
                      {currentUser.bname ? (
                        <span>{currentUser.bname}</span>
                      ) : (
                        <span>Business Name not added</span>
                      )}
                    </div>
                    <hr />
                    <div className={"w-100 mt-3"}>
                      <h6 className={"fw-bold text-muted text-uppercase"}>
                        GST
                      </h6>
                      {currentUser.gst ? (
                        <span>{currentUser.gst}</span>
                      ) : (
                        <span>GST not added</span>
                      )}
                    </div>
                    <div className={"py-5"} style={{ borderRadius: "25px" }}>
                      <Button
                        style={{ width: "100%" }}
                        className={"fw-bold"}
                        color={"primary"}
                        onClick={doLogout}
                      >
                        Logout
                      </Button>
                    </div>
                  </section>
                </Col>
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default Index;
