import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
  Toast,
  ToastBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import feedbackFields from "components/admin/CRUD/Feedback/feedbackFields";
import { Formik } from "formik";
import IniValues from "components/admin/FormItems/iniValues";
import PreparedValues from "components/admin/FormItems/preparedValues";
import FormValidations from "components/admin/FormItems/formValidations";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import person2 from "public/images/e-commerce/details/person2.jpg";
import product1 from "public/images/e-commerce/home/product1.png";
import product2 from "public/images/e-commerce/home/product2.png";
import product3 from "public/images/e-commerce/home/product3.png";
import product4 from "public/images/e-commerce/home/product4.png";
import s from "./Product.module.scss";

import InfoBlock from 'components/e-commerce/InfoBlock';
import closeIcon from "public/images/e-commerce/details/close.svg";
import InstagramWidget from 'components/e-commerce/Instagram';
import axios from "axios";
import close from "public/images/e-commerce/close.svg";

import actions from "redux/actions/products/productsFormActions";
import Head from "next/head";
import feedbackActions from "redux/actions/feedback/feedbackListActions";
import feedbackActionsForm from "redux/actions/feedback/feedbackFormActions";
import productsListActions from "redux/actions/products/productsListActions";
import ReactImageMagnify from 'react-image-magnify';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Dropdown from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import productFields from "./productFields";
import InputFormItem from "components/admin/FormItems/items/InputFormItem";
import DatePickerFormItem from "components/admin/FormItems/items/DatePickerFormItem";
import 'bootstrap-icons/font/bootstrap-icons.css';
import FullScreenLoader from "components/e-commerce/preloader/FullScreenLoader";
import Loader from "components/admin/Loader/Loader";

const Star = ({ selected = false, onClick = f => f }) => (
  <div className={selected ? `${s.star} ${s.selected}` : `${s.star}`} onClick={onClick}></div>
);

const products = [
  { id: 0, img: product1 },
  { id: 1, img: product2 },
  { id: 2, img: product3 },
  { id: 3, img: product4 },
  { id: 7, img: product1 },
  { id: 4, img: product2 },
  { id: 5, img: product3 },
  { id: 6, img: product4 },
];

const Id = ({ product: serverSideProduct, currentProductId }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(1440);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const feedbackList = useSelector((state) => state.feedback.list.rows);
  const [starsSelected, setStarsSelected] = React.useState(0);
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [review, setReview] = React.useState('');
  const dispatch = useDispatch();
  
  const [product, setProduct] = React.useState(serverSideProduct);
  const [quantity, setQuantity] = React.useState(1);
  const [unit, setUnit] = React.useState(serverSideProduct.unit);
  const [fetching, setFetching] = React.useState(true);
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);


  React.useEffect(() => {
    dispatch(feedbackActions.doFetch({}));
    typeof window !== "undefined" &&
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    typeof window !== "undefined" && window.setTimeout(() => {
      setFetching(false);
    }, 3000);
  }, []);

  const addFeedback = () => {
    axios.post(`/feedback/`, {
      data: {
        avatar: '',
        feedback_date: new Date(),
        firstname,
        lastname,
        status: 'hidden',
        rating: starsSelected,
        review,
        product: currentProductId
      }
    }).then(setOpen(false));
  };

  const addToCart = () => {
    dispatch(actions.doFind(id));
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
    dispatch(productsListActions.doAdd(localProducts));
  };

  const iniValues = () => {
    // Initialize form values
    return {
      name: '',
      contact: '',
      email: '',
      message: product.title, // Set initial value of message field to item.title
      bname: '',
      bgst: '',
      address: '',
      unit: '',
    };
  };

  const processOrder = async () => {
    // Add the order directly to the user's account
    try {
      if (currentUser) {
        await axios.post(`/orders/`, {
          data: {
            amount: quantity,
            order_date: new Date(),
            product: id,
            status: "ordered",
            user: currentUser.id,
          },
        });
        toast.success("Order placed successfully!");
      } else {
        // Handle the case when the user is not logged in
        toast.error("Please log in to place an order.");
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      toast.error("Failed to place order. Please try again later.");
    }
  };
  

  const formValidations = () => FormValidations(feedbackFields, {});

  const handleSubmit = async (values, form) => {
    const { id, ...data } = PreparedValues(feedbackFields, values || {});
    const finalData = { ...data, firstname, lastname, product: currentProductId };

    try {
      const response = await fetch("http://srv481744.hstgr.cloud:8080/api/feedback/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (!response.ok) {
        throw new Error("Error while saving feedback");
      }

      console.log("Feedback saved successfully");
      setOpen(false);
      form.resetForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const [showLoader, setShowLoader] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://srv481744.hstgr.cloud:8080/api/products/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const responseData = await response.json();

      if (Array.isArray(responseData.rows)) {
        console.log("Products data:", responseData.rows);
        setProducts(responseData.rows);
        if (responseData.rows.length > 0) {
          console.log("First Product Title:", responseData.rows[0].title);
        }
      } else {
        console.error("Products data is not an array:", responseData);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  
  useEffect(() => {
    fetchProducts();
  }, []);



  const toggleOrderModal = () => {
    setOrderModalOpen(!isOrderModalOpen);
  };



  const handlePlaceOrder = () => {
    // Add logic to place the order here
    processOrder(); // Example function to process the order
    toggleOrderModal(); // Close the modal after placing the order
  };



  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setUnit(serverSideProduct.unit * newQuantity);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    setQuantity(newUnit / serverSideProduct.unit);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); // Hide the loader after 5 seconds (5000 milliseconds)
  
    return () => clearTimeout(timer); // Cleanup function to clear the timer when the component unmounts
  }, []);


  
  

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={`${product.meta_description || 'b2b yodigital store'}`}  />
        <meta name="keywords" content={`${product.keywords || "ecommerce, "}`} />
        <meta name="author" content={`${product.meta_author || "YoDigital PVT LTD"}`} />
        <meta charSet="utf-8" />
        <meta property="og:title" content={`${product.meta_og_title || "PRoduct TItle"}`} />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${product.meta_og_url || "https://flatlogic-ecommerce.herokuapp.com/"}`} />
        <meta property="og:image" content={`${product.meta_og_image || "http://localhost:3000/products/75000834-f875-4ce2-aa3d-3f0fcd8fe088"}`} />
        <meta property="og:description" content={`${product.meta_description || 'Description'}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="fb:app_id" content={`${product.meta_fb_id || "712557339116053"}`} />
        <meta property="og:site_name" content={`${product.meta_og_sitename || "YoDigital"}`} />
        <meta name="twitter:site" content={`${product.post_twitter || "@YoDigital"}`} />
      </Head>
      <ToastContainer />
      <Container>
      {/* {showLoader ? (
        <div className="custom-loader">
      <Loader />
      </div> // Display your custom loader if showLoader is true
    ) : ( */}
            <Row className={"mb-5"} style={{marginTop: '32', backgroundColor: '#fff',borderRadius: ' 12px', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px', padding: '30px'}}>
              <Col
                xs={12}
                lg={(product.image?.length > 1) ? 7 : 6}
                className={"d-flex"}
              >
                <ReactImageMagnify {...{
                  smallImage: {
                    alt: 'magnifier',
                    isFluidWidth: true,
                    src: product.image[0].publicUrl,
                  },
                  largeImage: {
                    src: product.image[0].publicUrl,
                    width: 1200,
                    height: 1200
                  }
                }}
                className={`${product.image.length && 'mr-2'}`}
                enlargedImagePosition={"over"}
                />
              </Col>
              <Col
                  xs={12}
                  lg={product.image.length > 1 ? 5 : 6}
                  className={"d-flex flex-column justify-content-between"}
              >
                <div className={"d-flex flex-column justify-content-between"} style={{height: 320}}>
                  <h6 className={`text-muted ${s.detailCategory}`}>
                    {product.categories[0].title[0].toUpperCase() +
                    product.categories[0].title.slice(1)}
                  </h6>
                  <h4 className={"fw-bold"}>{product.title}</h4>
                  <p>{product.description}</p>
                  <h4>{product.status.charAt(0).toUpperCase() + product.status.slice(1)}</h4>
                  <div className={"d-flex mb-5"}>
                  <div className={"d-flex align-items-center"}>
                    <Button
                      className={`bg-transparent border-0 p-1 fw-bold mr-3 ${s.quantityBtn}`}
                      onClick={() => {      
                        if (quantity === 1) return;
                        handleQuantityChange(quantity - 1);
                      }}
                    >
                      -
                    </Button>
                    <p className={"fw-bold mb-0"}>{quantity}</p>
                    <Button
                      className={`bg-transparent border-0 p-1 fw-bold ml-3 ${s.quantityBtn}`}
                      onClick={() => {
                        handleQuantityChange(quantity + 1);
                      }}
                    >
                      +
                    </Button>
                  </div>
                  </div>
                </div>
                <div className={`${s.buttonsWrapper} d-flex`}>
                  {!currentUser ? (
                    <Button
                      className={`flex-fill mr-4 text-uppercase fw-bold ${s.leaveFeedbackBtn}`}
                      style={{ width: "100%", borderRadius: '12px' }}
                      color={"primary"}
                      onClick={() => setOpen(true)}
                    >
                      + Add Enquiry
                    </Button>
                  ) : (
                    <>
                      <Button
                          outline
                          color={"dark"}
                          className={"flex-fill mr-4 text-uppercase fw-bold"}
                          style={{ width: "50%", borderRadius: '12px' }}
                          onClick={() => setOpen(true)}
                      >
                        <i className="bi bi-info-circle-fill mr-2"></i>
                        Interested
                      </Button>
                      <Button
                          color={"primary"}
                          className={"text-uppercase fw-bold"}
                          style={{ width: "50%", borderRadius: '12px'}}
                          onClick={toggleOrderModal}
                      >
                        <i className={"bi bi-bag-fill mr-2"}></i>
                        Order Now
                      </Button>
                    </>
                  )}
                </div>
              </Col>
            </Row>
 
        <hr />
        <Row className={"mt-5 mb-5"}>
          <Modal
            isOpen={isOpen}
            toggle={() => setOpen((prevState) => !prevState)}
            style={{ width: 920 }}
          >
            <div className={"p-5"}>
              <div style={{ position: "absolute", top: 0, right: 0 }}>
                <Button
                  className={"border-0 bg-transparent"}
                  style={{ padding: "15px 15px" }}
                  onClick={() => setOpen((prevState) => !prevState)}
                >
                  <img src={closeIcon} alt={'closeIcon'} />
                </Button>
              </div>
              <ModalBody>
                <h3 className={"fw-bold mb-5"}>Enquiry Form</h3>
                <div
                  className={` ${s.modalProduct} d-flex justify-content-between align-items-center`}
                >
                  <div className={"d-flex align-items-center"}>
                    <img
                      src={product.image?.[0]?.publicUrl}
                      width={100}
                      className={"mr-4"}
                      alt={"img"}
                    />
                    <div>
                      <h6 className={"text-muted"}>
                        {product.categories?.[0]?.title ? 
                          product.categories[0].title[0].toUpperCase() + product.categories[0].title.slice(1) : 
                          ""
                        }
                      </h6>
                      <h5 className={"fw-bold"}>{product.title}</h5>
                    </div>
                  </div>
                  {/* <div className={"d-flex align-items-center"}>
                    <Button
                      className={`bg-transparent border-0 p-1 fw-bold mr-3 ${s.quantityBtn}`}
                      onClick={() => {      
                        if (quantity === 1) return;
                        handleQuantityChange(quantity - 1);
                      }}
                    >
                      -
                    </Button>
                    <p className={"fw-bold mb-0"}>{quantity}</p>
                    <Button
                      className={`bg-transparent border-0 p-1 fw-bold ml-3 ${s.quantityBtn}`}
                      onClick={() => {
                        handleQuantityChange(quantity + 1);
                      }}
                    >
                      +
                    </Button>
                  </div> */}
                  <Button
                    className={"bg-transparent border-0 p-0"}
                    onClick={() => {}}
                  >
                    <img src={close} alt={"close"} />
                  </Button>
                </div>

                <Formik
                  onSubmit={(values, form) => handleSubmit(values, form)}
                  initialValues={iniValues()}
                  validationSchema={formValidations()}
                  render={(form) => (
                    <form onSubmit={form.handleSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <InputFormItem name={"name"} schema={productFields} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="contact">Contact</label>
                            <InputFormItem name={"contact"} schema={productFields} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <InputFormItem name={"email"} schema={productFields} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Message</label>
                            <InputFormItem name={"message"} schema={productFields} />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="bname">Business Name</label>
                            <InputFormItem name={"bname"} schema={productFields} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="bgst">GST Number</label>
                            <InputFormItem name={"bgst"} schema={productFields} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="address">Address</label>
                            <InputFormItem name={"address"} schema={productFields} />
                          </div>
                          <div className="form-group">
                            <label htmlFor="unit">Units</label>
                            <InputFormItem name={"unit"} schema={productFields} />
                          </div>
                        </div>
                      </div>
                      <div className="form-buttons">
                        <button
                          className="btn btn-primary"
                          disabled={form.isSubmitting}
                          type="submit"
                          style={{ borderRadius: '12px' }}
                        >
                          Save
                        </button>{" "}
                        <button
                          className="btn btn-light"
                          type="button"
                          disabled={form.isSubmitting}
                          onClick={form.handleReset}
                        >
                          Reset
                        </button>{" "}
                        <button
                          className="btn btn-light"
                          type="button"
                          disabled={form.isSubmitting}
                          onClick={() => props.onCancel()}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                />
              </ModalBody>
            </div>
          </Modal>

          <Modal
  isOpen={isOrderModalOpen}
  toggle={toggleOrderModal}
  style={{ width: 920 }}
>
  <div className={"p-2"}>
    <div style={{ position: "absolute", top: 0, right: 0 }}>
      <Button
        className={"border-0 bg-transparent"}
        style={{ padding: "15px 15px" }}
        onClick={toggleOrderModal}
      >
        <img src={closeIcon} alt={'closeIcon'} />
      </Button>
    </div>
    <ModalBody>
  {/* Add order details here */}
  <h3 className={"fw-bold mb-5"}>Order Preview</h3>
  <div className={"d-flex flex-row align-items-center"}>
    {/* Image */}
    <img
      src={product.image?.[0]?.publicUrl}
      width={100}
      // className={"mr-3"}
      alt={"img"}
    />
    {/* Product title and category */}
    <div className={"d-flex flex-column justify-content-center ml-4"}>
      <h5 className={"fw-bold mb-2"}>{product.title}</h5>
      <p className={"text-muted mb-0"}>
        {product.categories?.[0]?.title || ""}
      </p>
    </div>
    {/* Quantity selection */}
    <div className={"ml-auto"}>
      <div className={"mb-3 mr-4"}>
        <label htmlFor="quantity" className="mr-4">Quantity  </label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          style={{
            alignItems: 'center',
            boxShadow : 'none',
            transition : 'border-color ease-in-out 0.15s, background-color ease-in-out 0.15s',
            width: '50px',
            height : '40px',
            border : '1px solid #d9d9d9',
            borderRadius : '5px',
          
            
          }}
        />
      </div>
    </div>
  </div>
  {/* Place Order button */}
  <div className={"mt-4 d-flex justify-content-end"}>
  {/* Additional text */}
  {/* <p className={"text-muted mr-3"}>
    This order will be delivered to your registered business address.<br/> If the address is different, please contact your manager.
  </p> */}
  {/* Place Order button */}
  <Button
    color={"primary"}
    className={"text-uppercase fw-bold"}
    style={{ borderRadius: '12px'}}
    onClick={handlePlaceOrder}
  >
    Confirm Order
  </Button>
</div>
</ModalBody>

  </div>
</Modal>


          <Col sm={12} className={"d-flex justify-content-between"}></Col>
          {feedbackList && feedbackList.map((item, idx) => {
              if (item.status === "visible") {
                return (
                  <Col sm={12} className={"d-flex mt-5"} key={idx}>
                    <img
                      src={item.image[0].publicUrl || person2}
                      style={{ borderRadius: 65 }}
                      className={`mr-5 ${s.reviewImg}`}
                      alt={"img"}
                    />
                    <div
                      className={`d-flex flex-column justify-content-between align-items-start`}
                    >
                      <div
                        className={`d-flex justify-content-between w-100 ${s.reviewMargin}`}
                      >
                        <h6 className={"fw-bold mb-0"}>{item.firstname} {item.lastname}</h6>
                        <p className={"text-muted mb-0"}>{item.feedbackDate && item.feedbackDate.toString().slice(0, 10) || item.createdAt && item.createdAt.toString().slice(0, 10)}</p> 
                      </div>
                      <div className={s.starRating}>
                        {[1,2,3,4,5].map((n, i) =>
                          <Star key={i}
                                selected={i < item.rating}
                                onClick={null}
                            />
                        )}
                      </div>
                      <p className={"mb-0"}>
                        {item.review}
                      </p>
                    </div>
                  </Col>              
                )
              }
            }
          )
          }
        </Row>
      </Container>
      <InfoBlock />
      <div className="d-none d-sm-block"> {/* Hide on mobile devices (sm and below) */}
        <InstagramWidget />
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await axios.get(`/products/${context.query.id}`);
  const product = res.data;

  return {
    props: { product, currentProductId: context.query.id }, // will be passed to the page component as props
  };
}

export default Id;
