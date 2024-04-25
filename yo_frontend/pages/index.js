import React, { useState, useReducer, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import s from "pages/index.module.scss";
import Link from "next/link";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Head from "next/head";

import arrowRight from "public/images/e-commerce/home/arrow-right.svg";

import InfoBlock from "components/e-commerce/InfoBlock";
import InstagramWidget from "components/e-commerce/Instagram";
import article1 from "public/images/e-commerce/home/article1.jpg";
import article2 from "public/images/e-commerce/home/article2.jpg";
import article3 from "public/images/e-commerce/home/article3.jpg";

import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import Countdown from "./home/Countdown";
import rating from "../public/images/e-commerce/details/stars.svg";
import productsListActions from "../redux/actions/products/productsListActions";

import { Loader } from "components/admin/Loader/Loader";



const Index = ({ products: serverSideProducts }) => {
  const [isB2BModalOpen, setB2BModalOpen] = useState(false);
  const [isIndividualModalOpen, setIndividualModalOpen] = useState(false);
  const [isCorporateModalOpen, setCorporateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    whatsapp: "",
    email: "",
    bname: "",
    bgst: "",
    address: "",
  });

  const [disableWhatsApp, setDisableWhatsApp] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/feedback/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          checkboxValue: checkboxValue,
        }),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        toast.success("Form submitted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error submitting form:", errorData);
        toast.error("Error submitting form");
      }

      if (formData.contact === formData.whatsapp) {
        setDisableWhatsApp(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error("Error submitting form");
    }
    setB2BModalOpen(false);
  };


  function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + '...';
  }


  const [quantity, setQuantity] = useState(1);
  const dispatchStore = useDispatch();

  const openReducer = (state, action) => {
    // Reducer logic...
  };

  const [secs, setSecs] = useState(23);
  const [products, setProducts] = useState(serverSideProducts);

  const [openState, dispatch] = useReducer(openReducer, {
    open0: false,
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    open6: false,
    open7: false,
    open8: false,
  });
  const currentUser = useSelector((store) => store.auth.currentUser);

  const addToCart = (id, quantity = 1) => {
    // addToCart logic...
  };

  const addToWishlist = (id) => {
    // addToWishlist logic...

  };

  const secsInterval = () => {
    let secsInt = setInterval(() => {
      if (secs === 0) {
        clearInterval(secsInt);
      }
      setSecs((prev) => --prev);
    }, 1000);
  };

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      // Show loader after a delay of 3 seconds
      console.log("Showing loader...");
      // Assuming you have a state variable to control the loader
      // Example: setLoader(true);
    }, 3000);

    return () => {
      clearTimeout(loaderTimeout); // Clear the timeout when component unmounts
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  useEffect(() => {
    secsInterval();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
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
      <ToastContainer />

      <Container style={{ marginTop: 80, marginBottom: 80 }}>
        {/* <div className={'scroller'}>
      <marquee behavior="scroll" direction="left" style={{ marginTop: 20}}>
  Become a Distributor at YoDigital and get daily exciting offers with upto minimum 31% off on selected products.
</marquee>

</div> */}
        {/* <h3 className={"text-center fw-bold mb-4"}>Explore As</h3> */}
        <Row>
          <Col xs={6} md={3}>
            <Link href={"/account"}>
              <a>
                <section className={`${s.top_first} img-fluid`}>
                  <h4 className={"text-center fw-bold "}>Retailer Shop</h4>
                  <h6>Login with provided user id and password</h6>
                </section>
              </a>
            </Link>
          </Col>

          <Col xs={6} md={3}>
            <Button
              onClick={() => setB2BModalOpen(true)}
              className={`${s.top_second} img-fluid`}
            >
              <section>
                <h4 className={"fw-bold"}>B2B</h4>
                <h6>Submit your Product purchase Enquiry</h6>
              </section>
            </Button>
          </Col>

          <Modal isOpen={isB2BModalOpen} toggle={() => setB2BModalOpen(false)}>
            <ModalHeader toggle={() => setB2BModalOpen(false)}>
              <h2 className={"fw-bold"}> B2B Form</h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="name" className="col-sm-6">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="col-sm-6" // Adjust the size of the input field
                  />
                </FormGroup>

                <FormGroup>
                  <div>
                    <div className="d-flex flex-row gap-5">
                      <div className="text-center">
                        <Label for="password">Contact</Label>
                      </div>
                      <div>
                        <span className="text-center align-baseline">
                          <input
                            type="checkbox"
                            className="text-center ml-3 align-baseline"
                            onChange={() => setDisableWhatsApp(!disableWhatsApp)}
                          />
                          <span> Don't have a Different Number</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <Input
                        type="text"
                        id="contact"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: e.target.value,
                            whatsapp: disableWhatsApp ? e.target.value : formData.whatsapp,
                          })
                        }
                      />
                    </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="password" className="col-sm-6">Whatsapp</Label>
                  <Input
                    type="text"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    disabled={disableWhatsApp}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Business Name</Label>
                  <Input
                    type="text"
                    id="bname"
                    value={formData.bname}
                    onChange={(e) =>
                      setFormData({ ...formData, bname: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Business GST</Label>
                  <Input
                    type="text"
                    id="bgst"
                    value={formData.bgst}
                    onChange={(e) =>
                      setFormData({ ...formData, bgst: e.target.value })
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="password">Business Address</Label>
                  <Input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </FormGroup>
                <button className={"btn btn-primary"}>
                  <Link href={"/shop"} color="primary">
                    Submit
                  </Link>
                </button>
              </form>
            </ModalBody>

          </Modal>

          <Col xs={6} md={3}>
            <Button
              onClick={() => setIndividualModalOpen(true)}
              className={`${s.top_third} img-fluid`}
            >
              <section>
                <h4 className={"fw-bold"}>Individual</h4>
                <h6>Shop more and get possible Discount</h6>
              </section>
            </Button>
          </Col>
          <Modal
            isOpen={isIndividualModalOpen}
            toggle={() => setIndividualModalOpen(false)}
          >
            <ModalHeader toggle={() => setIndividualModalOpen(false)}>
              <h2 className={"fw-bold"}> Individual Form</h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <div>
                    <div className="d-flex flex-row gap-5">
                      <div className="text-center">
                        <Label for="password">Contact</Label>
                      </div>
                      <div>
                        <span className="text-center align-baseline">
                          <input
                            type="checkbox"
                            className="text-center ml-3 align-baseline"
                            onChange={() =>
                              setDisableWhatsApp(!disableWhatsApp)
                            }
                          />
                          <span> Don't have a Different Number</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <Input
                        type="text"
                        id="contact"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: e.target.value,
                            whatsapp: disableWhatsApp
                              ? e.target.value
                              : formData.whatsapp,
                          })
                        }
                      />
                    </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="password">whatsapp</Label>
                  <Input
                    type="text"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    disabled={disableWhatsApp}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormGroup>

                <button className={"btn btn-primary"}>
                  <Link href={"/shop"} color="primary">
                    Submit
                  </Link>
                </button>
              </form>
            </ModalBody>
          </Modal>

          <Col xs={6} md={3}>
            <Button
              onClick={() => setCorporateModalOpen(true)}
              className={`${s.top_forth} img-fluid`}
            >
              <section>
                <h4 className={"fw-bold text-center"}>Corporate</h4>
                <h6>Buy Gift With Discount</h6>
              </section>
            </Button>
          </Col>

          <Modal
            isOpen={isCorporateModalOpen}
            toggle={() => setCorporateModalOpen(false)}
          >
            <ModalHeader toggle={() => setCorporateModalOpen(false)}>
              <h2 className={"fw-bold"}> Corporate Form</h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </FormGroup>
                <FormGroup>
                  <div>
                    <div className="d-flex flex-row gap-5">
                      <div className="text-center">
                        <Label for="password">Contact</Label>
                      </div>
                      <div>
                        <span className="text-center align-baseline">
                          <input
                            type="checkbox"
                            className="text-center ml-3 align-baseline"
                            onChange={() =>
                              setDisableWhatsApp(!disableWhatsApp)
                            }
                          />
                          <span> Don't have a Different Number</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <Input
                        type="text"
                        id="contact"
                        value={formData.contact}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: e.target.value,
                            whatsapp: disableWhatsApp
                              ? e.target.value
                              : formData.whatsapp,
                          })
                        }
                      />
                    </div>
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="password">whatsapp</Label>
                  <Input
                    type="text"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) =>
                      setFormData({ ...formData, whatsapp: e.target.value })
                    }
                    disabled={disableWhatsApp}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </FormGroup>


                <button className={"btn btn-primary"}>
                  <Link href={"/shop"} color="primary">
                    Submit
                  </Link>
                </button>
              </form>
            </ModalBody>
          </Modal>
        </Row>
      </Container>

      <Container style={{ marginTop: 80, marginBottom: 80 }}>
        <h3 className={`text-center fw-bold mb-4`}>New Arrivals</h3>
        <Row className={"justify-content-center mb-2"}>
          <Col sm={8}>
            <p className={"text-center fw-bold text-muted mb-4"}>
              Introducing our latest tech essentials lineup! Immerse yourself in
              the ultimate mobile experience with our state-of-the-art Smart
              Device.
            </p>
          </Col>
        </Row>
        <Row>
  {products.map((item, index) => (
    <Col
    sm={6}
    md={3}
    xs={12}
    className={`mb-4 ${s.product}`}
    key={index}
    // style={{ backgroundColor: 'gray' }}
  >
      <Modal
        isOpen={openState[`open${index}`]}
        toggle={() => dispatch({ type: `open${index}` })}
      >
        <div className={s.modalWidndow}>
          <div className={s.image}>
            <img
              src={item.image[0]?.publicUrl}
              width={"100%"}
              height={"100%"}
              alt="img"
            />
          </div>
          <div className={`${s.content} p-4 d-flex flex-column justify-content-between`}>
            <Link href={`/products/${item.id}`}>
              <a className={"fw-semi-bold"}>
                More about product
                <img
                  src={arrowRight}
                  alt={"arrow"}
                  className={"ml-2"}
                />
              </a>
            </Link>
            {item.categories[0]?.title && (
              <h6 className={"text-muted"}>
                {item.categories[0].title[0].toUpperCase() + item.categories[0].title.slice(1)}
              </h6>
            )}

            <h4 className={"fw-bold"}>{item.title}</h4>
            <p>{item.description}</p>
            <div className={"d-flex"}>
              <div className={"d-flex flex-column mr-5 justify-content-between"}>
                <h6 className={"fw-bold text-muted text-uppercase"}>Quantity</h6>
                <div className={"d-flex align-items-center"}>
                  <Button
                    className={`bg-transparent border-0 p-1 fw-bold mr-3 ${s.quantityBtn}`}
                    onClick={() => {
                      if (quantity === 1) return;
                      setQuantity((prevState) => prevState - 1);
                    }}
                  >
                    -
                  </Button>
                  <p className={"fw-bold mb-0"}>{quantity}</p>
                  <Button
                    className={`bg-transparent border-0 p-1 fw-bold ml-3 ${s.quantityBtn}`}
                    onClick={() => {
                      if (quantity < 1) return;
                      setQuantity((prevState) => prevState + 1);
                    }}
                  >
                    +
                  </Button>
                </div>
              </div>
              {/* <div
                className={"d-flex flex-column justify-content-between"}
              >
                <h6 className={"fw-bold text-muted text-uppercase"}>
                  Price
                </h6>
                <h6 className={"fw-bold"}>{item.price}$</h6>
              </div> */}
            </div>
            <div className={"d-flex mt-5"}>
              <Button
                outline
                color={"primary"}
                className={"flex-fill mr-4 text-uppercase fw-bold"}
                style={{ width: "50%" }}
                onClick={() => {
                  toast.info(
                    "products successfully added to your cart"
                  );
                  addToCart();
                }}
              >
                Add to Cart
              </Button>
              <Link
                href={"/billing"}
                className={"d-inline-block flex-fill"}
              >
                <Button
                  color={"primary"}
                  className={"text-uppercase fw-bold"}
                  style={{ width: "50%" }}
                >
                  Buy now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Modal>
      <div style={{ position: "relative" }}>
        <Link href={`/products/${item.id}`}>
          <a>
            <div
              style={{
                background: `url("${item.image[0]?.publicUrl}") no-repeat center`,
                backgroundSize: "contain",
                transition: "all .65s ease",
              }}
              className={s.productImage}
            />
          </a>
        </Link>
        <div
          className={`d-flex flex-column justify-content-center ${s.product__actions}`}
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
            right: 15,
          }}
        >
          <Button
            className={"p-0 bg-transparent border-0"}
            onClick={() => {
              addToWishlist(item.id);
              toast.info("products successfully added to your wishlist");
            }}
          >
            <div className={`${s.product__actions__heart} mb-4`} />
          </Button>
          {/* <Button
            className={"p-0 bg-transparent border-0"}
            onClick={() => {
              dispatch({ type: `open${index}` });
            }}
          >
            <div className={`${s.product__actions__max} mb-4`} />
          </Button> */}
          <Button
            className={"p-0 bg-transparent border-0"}
            onClick={() => {
              addToCart(item.id);
              toast.info("products successfully added to your cart");
            }}
          >
            <div className={`${s.product__actions__cart} mb-4`} />
          </Button>
        </div>
      </div>
      <div className={s.productInfo}>
        <div>
          {/* <Link href={`/category/${item.categories[0].id}`}> */}

          {item.categories && item.categories.length > 0 && (
            <Link href={`/category/${item.categories[0].id}`}>
              <a className={"mt-3 text-muted mb-0 d-inline-block"}>
                {item.categories[0].title[0].toUpperCase() + item.categories[0].title.slice(1)}
              </a>
            </Link>
          )}

          <Link href={`/products/${item.id}`}>
            <a title={item.title}>
              {/* Set the full title as the title attribute */}
              <h6 className={"fw-bold font-size-base mt-1"} style={{ fontSize: 16 }}>
                {truncateString(item.title, 20)} {/* Limiting to 20 characters */}
              </h6>
            </a>
          </Link>

          {item.status && (
            <h6 className={"text-muted"}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </h6>
          )}
        </div>
      </div>
    </Col>
  ))}
</Row>

        {/* <Row className={"d-flex justify-content-center"}>
          <Link href={"/shop"}>
            <Button
              outline
              color="primary"
              className={"text-uppercase mx-auto mt-5 fw-bold"}
            >
              view more
            </Button>
          </Link>
        </Row> */}
      </Container>
      {/* <section className={s.promo}>
        <Container className={"h-100"}>
          <Row className={"h-100"}>
            
            <Col
              md={6}
              xs={12}
              className={
                "h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start .d-none .d-sm-block"
              }
            >
              
              <div className="d-flex .d-none .d-sm-block">
                

                <section className={${s.top_ele} img-fluid}>
                  <div style={{
                    width: '530px',
                    height: '330px',
                    border: '1px solid black',
                    marginRight: '20px',
                    borderRadius: '10px',
                    background: 'radial-gradient(circle, rgba(226,128,57,1) 0%, rgba(125,63,231,1) 100%)'
                  }}>
                    <h1>80% off on Headphones</h1>
                    <h5>Order min 50 Headphones form selected Brands and avail offer</h5>
                    
                  </div>
                </section>



                
                <section className={${s.top_seccard} img-fluid}>
                <div style={{
                  width: '530px',
                  height: '330px',
                  border: '1px solid black',
                  marginLeft: '10px',
                  borderRadius: '10px',
                  background: 'radial-gradient(circle, rgba(226,128,57,1) 0%, rgba(231,63,63,1) 100%)'
                }}>
                  <div className="kk">
                    <h1>COMBO offer</h1>
                    <h5>Get Tab,Phones,Speaker and Soundbar With Free Delivery</h5>
                  </div>
                  
                </div>
                </section>
              </div>
              


            </Col>

            
            <Col
              md={6}
              xs={12}
              className={
                "h-100 d-flex flex-column justify-content-center align-items-center align-items-md-start"
              }
              style={{ marginTop: "-205px", marginLeft: "-570px" }}
            >
              <section className={${s.top_ten} img-fluid}>
                <h5 className={"text-uppercase fw-bold mb-3"}>offer of the day</h5>
              </section>
              <section className={${s.top_tenn} img-fluid}>
                <h5 className={"text-left fw-bold mb-4"} style={{ color: '#FF4500', fontSize: '14px' }}>Grab offer of the Day within 24H</h5>
              </section>
            </Col>

          </Row>
        </Container>
      </section> */}




      <InfoBlock />
      <InstagramWidget />


      <div>
        <Row className={"justify-content-between"} style={{ background: "radial-gradient(circle, rgba(226,128,57,1) 0%, rgba(231,63,63,1) 100%)" }}>

        <section className={`${s.top_daily} img-fluid`}>
  <div style={{ display: 'inline-block' }}>
    <h5 className={`${s.text_white} fw-bold`} style={{ display: 'inline-block', marginLeft: '30px', marginTop: '5px' }}>Daily Offer on Your Device</h5>
    <br></br>
    <p className={`${s.text_white} fw-bold`} style={{ display: 'inline-block', fontSize: "0.9rem", marginLeft: '31px' }}>
      Do you want to receive exclusive email offers?
    </p>
  </div>
</section>




          <section className={`${s.top_sub} img-fluid`}>
            <Col xl={5} md={7} className={`d-flex align-items-center ${s.custom_col}`}>
              <Input
                type={"email"}
                placeholder={"Enter your email"}
                className={`mr-3 border-0 ${s.custom_input}`}
                style={{
                  width: 222,
                  height: 51,
                  borderRadius: 40,
                  marginRight: 10,
                  marginTop: 9,
                  '::placeholder': { color: 'black' }
                }}
              />

              <Button
                style={{
                  backgroundColor: '#262626',
                  borderRadius: '40px',
                  marginTop: '11px', // Add margin-top here
                  marginLeft: '11px'
                }}
                color={"primary"}
                className={`fw-bold ${s.custom_button}`}
              >
                Subscribe
              </Button>

            </Col>
          </section>

        </Row>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await axios.get("/products");
  const products = res.data.rows;

  return {
    props: { products }, // will be passed to the page component as props
  };
}

export default Index;