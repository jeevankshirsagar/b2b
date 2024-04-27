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

import Loader from "components/admin/Loader/Loader";
import b2bformm from "../All_Images/form.png"
// mobile input
// import PhoneInput from 'react-native-international-phone-number';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { TextArea } from "react-mde";



const Index = ({ products: serverSideProducts }) => {
  const [isB2BModalOpen, setB2BModalOpen] = useState(false);
  const [isIndividualModalOpen, setIndividualModalOpen] = useState(false);
  const [isCorporateModalOpen, setCorporateModalOpen] = useState(false);

  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);


  const handleCheckboxClick = () => {
    setShowWhatsAppInput(!showWhatsAppInput); // Toggle the visibility of WhatsApp input field
  };


  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    whatsapp: "",
    email: "",
    bname: "",
    bgst: "",
    address: "",
    message: "",
  });

  const [disableWhatsApp, setDisableWhatsApp] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://srv481744.hstgr.cloud:8080/api/feedback/add", {
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
    if (currentUser) {
      axios.post(`/orders/`, {
        data: {
          amount: quantity,
          order_date: new Date(),
          product: id,
          status: "ordered",
          user: currentUser.id,
        },
      });
      return;
    }
    const localProducts =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("products"))) ||
      [];
    localProducts.push({
      amount: quantity,
      order_date: new Date(),
      product: id,
      status: "ordered",
    });
    typeof window !== "undefined" &&
      localStorage.setItem("products", JSON.stringify(localProducts));
    dispatchStore(productsListActions.doAdd(localProducts))
  };

  const addToWishlist = (id) => {
    if (currentUser) {
      axios.put(`/users/${currentUser.id}`, {
        id: currentUser.id,
        data: {
          ...currentUser,
          wishlist: [id],
        },
      });
    }
    const localWishlist =
      (typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("wishlist"))) ||
      [];
    localWishlist.push({ amount: 1, product: id });
    typeof window !== "undefined" &&
      localStorage.setItem("wishlist", JSON.stringify(localWishlist));
  };

  const secsInterval = () => {
    let secsInt = setInterval(() => {
      if (secs === 0) {
        clearInterval(secsInt);
      }
      setSecs((prev) => --prev);
    }, 1000);
  };


  // whtasapp enable
  const handleContactChange = (value) => {
    const limitedValue = value.slice(0, 10); // Limit input to 10 digits
    setFormData({
      ...formData,
      contact: limitedValue,
      whatsapp: disableWhatsApp ? limitedValue : formData.whatsapp,
    });
  };

  // const [showLoader, setShowLoader] = useState(true);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowLoader(false); // Hide the loader after 3 seconds
  //   }, 3000);

  //   return () => clearTimeout(timer); // Clear the timer on component unmount
  // }, []);

  const [showLoader, setShowLoader] = useState(true);
  const [value, setValue] = useState()
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); // Hide the loader after 5 seconds (5000 milliseconds)
  
    return () => clearTimeout(timer); // Cleanup function to clear the timer when the component unmounts
  }, []);

  
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

      {showLoader ? (
        <div className="custom-loader">
      <Loader />
      </div> // Display your custom loader if showLoader is true
    ) : (
<Container fluid style={{ 
    marginTop: 80, 
    marginBottom: 80, 
    
    height: '300px' // Adjust the height here
  }}>

  <Row style={{marginTop: '100px'}}>
  {/* <div lg={3} sm={12}>
    <h3> Explore as</h3>
    </div> */}
    {/* <div lg={9} sm={12}> */}
    <Col xs={6} md={3}>
      <Link href={"/login"}>
        <a>
          <section className={`${s.top_first} img-fluid`}>
            <h3 className={"text-center fw-bold "}>Retailer</h3>
            <h5 className={"text-center "}>Login with provided Credentials</h5>
          </section>
        </a>
      </Link>
    </Col>

    <Col xs={6} md={3}>
      <Button onClick={() => setB2BModalOpen(true)} className={`${s.top_second} img-fluid`}>
        <section>
          <h3 className={"text-center fw-bold"}>B2B</h3>
          <h5 className={"text-center"}>Submit your Product Enquiry</h5>
        </section>
      </Button>
    </Col>

    <Modal isOpen={isB2BModalOpen} toggle={() => setB2BModalOpen(false)} style={{marginTop: '10px'}}>
      <ModalHeader  className='border-0' toggle={() => setB2BModalOpen(false)}>
        <img 
          src={b2bformm} 
          alt="offer image" 
          style={{
            width: '103%', 
            height: 'auto',
            marginTop: '0px',
            fontSize: '14px',
            display: 'fill',
            textAlign: 'center',
            fontWeight: 'bold',
            marginLeft: '0px'
          }} 
        />
        {/* <h3 className={"fw-bold"}>B2B Form</h3> */}
      </ModalHeader>
      <ModalBody className="form-container" scrollable>
        <form onSubmit={handleFormSubmit} className="row">
         
          <div className="col-md-6">
            <FormGroup>
              <Label for="name" className="fw-bold">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Type your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </FormGroup>
            {/* <FormGroup>
              <div className="d-flex flex-row gap-5">
                <div className="text-center">
                  <Label for="contact">Mobile Number</Label>
                </div>
              </div>
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
            </FormGroup> */}






            <FormGroup>
              <div className="d-flex flex-row gap-5 ">
                <div className="text-center fw-bold">
                  <Label className="text-center fw-bold" for="contact">Mobile Number</Label>
                </div>
                <div className="ml-3"> <FormGroup check>
   <Input
    type="checkbox"
    id="whatsappCheckbox"
    onClick={handleCheckboxClick}
    
  />
  <small for="whatsappCheckbox" className="text-muted font-small ml-1" check>
    Click if different number on WhatsApp?
  </small>
</FormGroup></div>
              </div>


  

              <div className="d-inline-flex" style={{
    fontFamily: 'inherit',
    boxShadow: 'none',
    transition: 'border-color ease-in-out 0.15s, background-color ease-in-out 0.15s',
    padding: '14px 89px',
    height: '40px',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    backgroundClip: 'initial',
    display: 'flex',
    justifyContent: 'flex-start', // Align contents to the right
  }}>
    <PhoneInput
        
        placeholder="Enter phone number"
        value={formData.contact}
        onChange={(value) => {
            setFormData({
                ...formData,
                contact: value,
                whatsapp: disableWhatsApp ? value : formData.whatsapp,
            });
        }}
        country="IN"
        countryCallingCode="+91" 
        maxLength={15} 
        
    />
</div>




{showWhatsAppInput && (
  <FormGroup>
    <Label for="whatsapp" className="fw-bold">WhatsApp Number</Label>
    <Input
      type="text"
      id="whatsapp"
      value={formData.whatsapp}
      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
    />
  </FormGroup>
)}

<FormGroup className="mt-3">
<Label for="password" className="fw-bold">Email</Label>
              <Input
                type="text"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </FormGroup>


            </FormGroup>
           
            
          </div>
          <div className="col-md-6">
            
            <FormGroup>
              <Label for="bname" className="fw-bold">Business Name</Label>
              <Input
                type="text"
                id="bname"
                value={formData.bname}
                onChange={(e) => setFormData({ ...formData, bname: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="bgst" className="fw-bold">GSTIN</Label>
              <Input
                type="text"
                id="bgst"
                value={formData.bgst}
                onChange={(e) => setFormData({ ...formData, bgst: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address" className="fw-bold">Business Address</Label>
              <Input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </FormGroup>
            
          </div>
          <div className="d-flex flex-column col-md-12">
    <FormGroup>
        <Label className="fw-bold">Message</Label>
        <textarea className="form-control" style={{
            fontFamily: 'inherit',
            boxShadow: 'none',
            transition: 'border-color ease-in-out 0.15s, background-color ease-in-out 0.15s',
            
            borderRadius: '5px',
            backgroundClip: 'initial',
        }} />
    </FormGroup>
</div>
 
          <div className="col-md-12 text-right">
            <button type="submit" className={"btn btn-primary"} style={{ borderRadius: '10px'}}>
              Submit
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>

    <Col xs={6} md={3}>
    <Button onClick={() => { window.open('http://srv481744.hstgr.cloud:8081/', '_blank'); }} className={`${s.top_third} img-fluid`}>
      <section>
        <h3 className={"text-center fw-bold"}>Individual</h3>
        <h5 className={"text-center"}>Shop more and get possible Discount</h5>
      </section>
    </Button>


    </Col>

    <Modal isOpen={isIndividualModalOpen} toggle={() => setIndividualModalOpen(false)}>
      <ModalHeader toggle={() => setIndividualModalOpen(false)}>
        <h3 className={"fw-bold"}> Individual Form</h3>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label for="name" className="fw-bold">Name</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <div className="d-flex flex-row gap-5">
              <div className="text-center">
                <Label for="password" className="fw-bold">Contact</Label>
              </div>
              <div>
                <span className="text-center align-baseline">
                  <input
                    type="checkbox"
                    className="text-center ml-3 align-baseline"
                    onChange={() => setDisableWhatsApp(!disableWhatsApp)}
                  />
                  <span> Click if above number is on WhatsApp</span>
                </span>
              </div>
            </div>
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
          </FormGroup>
          <FormGroup>
            <div >
              <div className=" d-flex">
            <Label for="password" className="fw-bold">WhatsApp</Label>

            </div>

            <Input
              type="text"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              disabled={disableWhatsApp}
            /></div>
          </FormGroup>
          <FormGroup>
            <Label for="password" className="fw-bold">Email</Label>
            <Input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormGroup>
          <div className="col-md-12 text-right">
            <button type="submit" className={"btn btn-primary"} style={{ borderRadius: '10px'}}>
              Submit
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>

    <Col xs={6} md={3}>
      <Button onClick={() => setCorporateModalOpen(true)} className={`${s.top_forth} img-fluid`}>
        <section>
          <h3 className={"fw-bold text-center"}>Corporate</h3>
          <h5 className={"text-center "}>Buy Gift With Discount</h5>
        </section>
      </Button>
    </Col>

    <Modal isOpen={isCorporateModalOpen} toggle={() => setCorporateModalOpen(false)} style={{ maxWidth : '500px'}} className=".bd-example-modal-sm">
      <ModalHeader toggle={() => setCorporateModalOpen(false)}>
        <h3 className={"fw-bold"}> Corporate Form</h3>
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleFormSubmit}>
          <FormGroup>
            <Label for="name" className="fw-bold">Name</Label>
            <Input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </FormGroup>
          

          <FormGroup>
            <Label className="fw-bold">Mobile Number</Label>
          <div className="d-inline-flex" style={{
    fontFamily: 'inherit',
    boxShadow: 'none',
    transition: 'border-color ease-in-out 0.15s, background-color ease-in-out 0.15s',
    padding: '14px 89px',
    height: '40px',
    border: '1px solid #d9d9d9',
    borderRadius: '5px',
    backgroundClip: 'initial',
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start', // Align contents to the right
  }}>
    <PhoneInput
        className="border-0"
        placeholder="Enter phone number"
        value={formData.contact}
        onChange={(value) => {
            setFormData({
                ...formData,
                contact: value,
                whatsapp: disableWhatsApp ? value : formData.whatsapp,
            });
        }}
        country="IN"
        countryCallingCode="+91" 
        maxLength={15} 
    />
</div>
</FormGroup>

          <FormGroup>
            <div className="d-flex">
            <Label for="password" className="fw-bold">WhatsApp</Label>
            <span className="text-center align-baseline">
                  <input
                    type="checkbox"
                    className="text-center ml-3 align-baseline"
                    onChange={() => setDisableWhatsApp(!disableWhatsApp)}
                  />
                  <span> Click if above number is on WhatsApp</span>
                </span>

            </div>
            <Input
              type="text"
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              disabled={disableWhatsApp}
            />
          </FormGroup>
          <FormGroup>
          <Label for="password" className="fw-bold">Email</Label>
            <Input
              type="text"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </FormGroup>
          <div className="d-flex flex-column col-md-12">
    <FormGroup>
        <Label className="fw-bold">Message</Label>
        <textarea className="form-control" style={{
            fontFamily: 'inherit',
            boxShadow: 'none',
            transition: 'border-color ease-in-out 0.15s, background-color ease-in-out 0.15s',
            
            borderRadius: '5px',
            backgroundClip: 'initial',
        }} />
    </FormGroup>
</div>
 
          <button className={"btn btn-primary"} style={{ borderRadius: '10px'}}>
            <Link href={"/shop"} color="primary">
              Submit
            </Link>
          </button>
        </form>
      </ModalBody>
    </Modal>
    {/* </div> */}
  </Row>
</Container>
)}

    

      <Container fluid  style={{ marginTop: 80, marginBottom: 80, maxWidth: '90%'} }>
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
      md={2}
      xs={6}
      className={`mb-4 ${s.product}`}
      key={index}
      style={{ padding:'5px  ' }}
    >
      <div   style={{backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' }}>
      <div style={{ position: "relative" }}>
        <Link href={`/products/${item.id}`}>
          <a>
            <div
              style={{
                background: `url(${item.image[0]?.publicUrl}) no-repeat center`,
                backgroundSize: "contain",
                
                borderBottom: "0.8px solid #919191",
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
          {/* Additional actions */}
        </div>
      </div>
      
      <div className={s.productInfo}>
        <div>
          <div>
            {item.categories && item.categories.length > 0 && (
              <Link href={`/category/${item.categories[0].id}`}>
                <a className={"mt-3 text-muted mb-0 d-inline-block"}>
                  {item.categories[0].title[0].toUpperCase() + item.categories[0].title.slice(1)}
                </a>
              </Link>
            )}
          </div>
          <div></div>
          <Link href={`/products/${item.id}`}>
            <a title={item.title}>
              <h5 className={"fw-bold font-size-base mt-1"} style={{ fontSize: 16 }}>
                {truncateString(item.title, 30)}
              </h5>
            </a>
          </Link>
          {item.status && (
            <h5
              className={`btn btn-dark align-middle mx-auto`}
              style={{
                backgroundColor: '#000',
                borderRadius: '30px',
                color: '#fff',
                padding: '4px 15px',
                width: 'auto',
                boxShadow: '0 2px 11px 0 rgba(227, 82, 0, 0.3)',
              }}
            >
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </h5>
          )}
        </div>
      </div>
      </div>
    </Col>
  ))}
</Row>

        
      </Container>
      



      <div className="d-none d-sm-block"> {/* Hide on mobile devices (sm and below) */}
        <InstagramWidget />
      </div>
      <InfoBlock />
  


      <div>
        <Row className={"justify-content-between"} style={{ background: "radial-gradient(circle, rgba(226,128,57,1) 0%, rgba(231,63,63,1) 100%)" }}>

          <section className={`${s.top_daily} img-fluid`}>
            <div style={{ display: 'inline-block' }}>
            <h5 className={`${s.text_white} fw-bold text-white`} style={{ display: 'inline-block', marginLeft: '30px', marginTop: '15px', verticalAlign: 'top' }}>Daily Offer on Your Device</h5>
<br />
<p className={`${s.text_white} fw-bold text-white`} style={{ display: 'inline-block', fontSize: "0.9rem", marginLeft: '31px', verticalAlign: 'top' }}>
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