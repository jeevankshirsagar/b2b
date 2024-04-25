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
import ImagesFormItem from "components/admin/FormItems/items/ImagesFormItem";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import product from "public/images/e-commerce/home/product5.png";

import person2 from "public/images/e-commerce/details/person2.jpg";
import person3 from "public/images/e-commerce/details/person3.jpg";
import product1 from "public/images/e-commerce/home/product1.png";
import product2 from "public/images/e-commerce/home/product2.png";
import product3 from "public/images/e-commerce/home/product3.png";
import product4 from "public/images/e-commerce/home/product4.png";
import s from "./Product.module.scss";

import InfoBlock from 'components/e-commerce/InfoBlock';
import closeIcon from "public/images/e-commerce/details/close.svg";
import preloaderImg from 'public/images/e-commerce/preloader.gif';
import InstagramWidget from 'components/e-commerce/Instagram';
import axios from "axios";
import close from "public/images/e-commerce/close.svg";
import chevronRightIcon from "public/images/e-commerce/details/chevron-right.svg";
import chevronLeftIcon from "public/images/e-commerce/details/chevron-left.svg";
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

const Star = ({ selected=false, onClick=f=>f }) =>
  <div className={(selected) ? ${s.star} ${s.selected} : ${s.star}}
      onClick={onClick}>
  </div>

const products = [
  {
    id: 0,
    img: product1,
  },
  {
    id: 1,
    img: product2,
  },
  {
    id: 2,
    img: product3,
  },
  {
    id: 3,
    img: product4,
  },
  {
    id: 7,
    img: product1,
  },
  {
    id: 4,
    img: product2,
  },
  {
    id: 5,
    img: product3,
  },
  {
    id: 6,
    img: product4,
  },
];

const Id = ({ product: serverSideProduct, currentProductId }) => {
  const [isOpen, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState(1440);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const feedbackList = useSelector((state) => state.feedback.list.rows)
  const [starsSelected, setStarsSelected] = React.useState(0)
  const [firstname, setFirstName] = React.useState('');
  const [lastname, setLastName] = React.useState('');
  const [review, setReview] = React.useState('');
  const dispatch = useDispatch();
  
  const [product, setProduct] = React.useState(serverSideProduct);
  const [quantity, setQuantity] = React.useState(1);
  const [unit, setUnit] = React.useState(serverSideProduct.unit);
  const [fetching, setFetching] = React.useState(true)
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  React.useEffect(() => {
    dispatch(feedbackActions.doFetch({}))
    typeof window !== "undefined" &&
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    typeof window !== "undefined" && window.setTimeout(() => {
      setFetching(false)
    }, 1000)
  }, [])

  const addFeedback = () => {
  
    axios.post(/feedback/, {
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
  }

  const addToCart = () => {
    dispatch(actions.doFind(id));
    if (currentUser) {
      axios.post(/orders/, {
        data: {
          amount: quantity,
          order_date: new Date(),
          product: id,
          status: "in cart",
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
      status: "in cart",
    });
    typeof window !== "undefined" &&
      localStorage.setItem("products", JSON.stringify(localProducts));
    dispatch(productsListActions.doAdd(localProducts))
  };

  const iniValues = () => {
    return IniValues(feedbackFields, {});
  };

  const processOrder = async () => {
    // Call the addToCart function imported from the billing page
    await addToCart(product.id, quantity, currentUser, dispatch);
    // Redirect the user to the billing page
    router.push("/cart");
  };


  

  const formValidations = () => {
    return FormValidations(feedbackFields, {});
  };

  const handleSubmit =async (values) => {
    const { id, ...data } = PreparedValues(feedbackFields, values || {});
    // const finalData = {...data, ...{
    //   avatar: '',
    //   feedback_date: new Date(),
    //   firstname,
    //   lastname,
    //   status: 'hidden',
    //   rating: starsSelected,
    //   review,
    //   product: currentProductId
    // }}

    try {
      const response = await fetch("http://localhost:8080/api/feedback/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          title: selectedProduct, // Include the selected product value
        }),
      });
  
      if (!response.ok) {
        throw new Error("Error while saving feedback");
      }
  
      console.log("Feedback saved successfully");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  //   setOpen(false);
  //   dispatch(feedbackActionsForm.doCreate(finalData));
  // };


  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/products/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(Failed to fetch products: ${response.statusText});
      }

      const responseData = await response.json();

      // Check if the 'rows' property is an array
      if (Array.isArray(responseData.rows)) {
        console.log("Products data:", responseData.rows);

        setProducts(responseData.rows);

        if (responseData.rows.length > 0) {
          console.log("First Product Title:", responseData.rows[0].title);
        }
      } else {
        console.error("Products data is not an array:", responseData);
        // Set a default value or handle the error appropriately
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setUnit(serverSideProduct.unit * newQuantity);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    setQuantity(newUnit / serverSideProduct.unit);
  };

  return (
    
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="description" content={${product.meta_description || 'b2b yodigital store'}}  />
        <meta name="keywords" content={${product.keywords || "ecommerce, "}} />
        <meta name="author" content={${product.meta_author || "YoDigital PVT LTD"}} />
        <meta charSet="utf-8" />


        <meta property="og:title" content={${product.meta_og_title || "PRoduct TItle"}} />
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={${product.meta_og_url || "https://flatlogic-ecommerce.herokuapp.com/"}} />
        <meta property="og:image" content={${product.meta_og_image || "https://flatlogic-ecommerce-backend.herokuapp.com/images/blogs/content_image_six.jpg"}} />
        <meta property="og:description" content={${product.meta_description || 'Description'}} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content={${product.meta_fb_id || "712557339116053"}} />

        <meta property="og:site_name" content={${product.meta_og_sitename || "YoDigital"}} />
        <meta name="twitter:site" content={${product.post_twitter || "@YoDigital"}} />
      </Head>
      <ToastContainer />
      <Container>
        { fetching ? (
            <div style={{height: 480}} className={"d-flex justify-content-center align-items-center"}>
              <img src={preloaderImg} alt={"fetching"}/>
            </div>
            ) : (
                <Row className={"mb-5"} style={{marginTop: 32}}>
            <Col
                xs={12}
                lg={product.image.length > 1 ? 7 : 6}
                className={"d-flex"}
            >
              <ReactImageMagnify {...{
                smallImage: {
                  alt: 'Wristwatch by Ted Baker London',
                  isFluidWidth: true,
                  src: product.image[0].publicUrl,
                },
                largeImage: {
                  src: product.image[0].publicUrl,
                  width: 1200,
                  height: 1200
                }
              }}
              className={${product.image.length && 'mr-3'}}
              enlargedImagePosition={"over"}
              />
            </Col>
            <Col
                xs={12}
                lg={product.image.length > 1 ? 5 : 6}
                className={"d-flex flex-column justify-content-between"}
            >
              <div className={"d-flex flex-column justify-content-between"} style={{height: 320}}>
              <h6 className={text-muted ${s.detailCategory}}>
                {product.categories[0].title[0].toUpperCase() +
                product.categories[0].title.slice(1)}
              </h6>
              <h4 className={"fw-bold"}>{product.title}</h4>
              {/* <div className={"d-flex align-items-center"}>
              {[1,2,3,4,5].map((n, i) =>
                          <Star key={i}
                                selected={i < product.rating}
                                onClick={null}
                            />
                        )}
                <p className={"text-primary ml-3 mb-0"}>{feedbackList.length} reviews</p>
              </div> */}
              <p>
                {product.description}
              </p>
              <h4>{product.status}</h4>
              <div className={"d-flex"}>
                <div
                    className={"d-flex flex-column mr-5 justify-content-between"}
                >
                  <h6 className={"fw-bold text-muted text-uppercase"}>
                    Quantity
                  </h6>
                  <div className={"d-flex align-items-center"}>
                  <Button
          className={bg-transparent border-0 p-1 fw-bold mr-3 ${s.quantityBtn}}
          onClick={() => {
            if (quantity === 1) return;
            handleQuantityChange(quantity - 1);
          }}
        >
                    -
        </Button>
        <p className={"fw-bold mb-0"}>{quantity}</p>
        <Button
          className={bg-transparent border-0 p-1 fw-bold ml-3 ${s.quantityBtn}}
          onClick={() => {
            handleQuantityChange(quantity + 1);
          }}
        >
          +
        </Button>
                  </div>
                </div>
                 <div className={"d-flex flex-column justify-content-between"}>
        <h6 className={"fw-bold text-muted text-uppercase"}>Price</h6>
        <h6 className={"fw-bold"}>{product.price * quantity}$</h6>
      </div>
              </div>
              </div>
              <div className={${s.buttonsWrapper} d-flex}>

              

              {!currentUser ? (
          // If user is not logged in, show "Leave Feedback" button
          <Button
            className={flex-fill mr-4 text-uppercase fw-bold ${s.leaveFeedbackBtn}}
            style={{ width: "100%" }}
            color={"primary"}
            onClick={() => setOpen(true)}
          >
            + Add Enquiry
          </Button>
        ) : (
          // If user is logged in, show "Buy Now" button
          <>
          <Button
              outline
              color={"primary"}
              className={"flex-fill mr-4 text-uppercase fw-bold"}
              style={{ width: "50%" }}
              onClick={() => {
                toast.info("Product successfully added to your cart");
                addToCart();
              }}
            >
              Interested
            </Button>
              <Button
                color={"primary"}
                className={"text-uppercase fw-bold"}
                style={{ width: "50%" }}
                onClick={processOrder}
              >
                Order Now
              </Button>
          
          </>
        )}
      </div>
            </Col>
          </Row> )
        }
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
                    src={product.image[0].publicUrl}
                    width={100}
                    className={"mr-4"}
                    alt={"img"}
                  />
                  <div>
                    <h6 className={"text-muted"}>
                      {product.categories[0].title[0].toUpperCase() +
                        product.categories[0].title.slice(1)}
                    </h6>
                    <h5 className={"fw-bold"}>{product.title}</h5>
                  </div>
                </div>
                <div className={"d-flex align-items-center"}>
                <Button
          className={bg-transparent border-0 p-1 fw-bold mr-3 ${s.quantityBtn}}
          onClick={() => {      
            if (quantity === 1) return;
            handleQuantityChange(quantity - 1);
          }}
        >
    -
    </Button>
        <p className={"fw-bold mb-0"}>{quantity}</p>
        <Button
          className={bg-transparent border-0 p-1 fw-bold ml-3 ${s.quantityBtn}}
          onClick={() => {
            handleQuantityChange(quantity + 1);
          }}
        >
    +
  </Button>
</div>
                {/* <h6 className={"fw-bold mb-0"}>{product.price}$</h6> */}
                <Button
                  className={"bg-transparent border-0 p-0"}
                  onClick={() => {}}
                >
                  <img src={close} alt={"close"} />
                </Button>
              </div>
              
<Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
        render={(form) => (
          <form onSubmit={form.handleSubmit}>
            <InputFormItem name={"name"} schema={productFields} />
            <InputFormItem name={"contact"} schema={productFields} />
            <InputFormItem name={"email"} schema={productFields} />
            <InputFormItem name={"bname"} schema={productFields} />
            <InputFormItem name={"bgst"} schema={productFields} />
            <InputFormItem name={"address"} schema={productFields} />
            <InputFormItem name={"unit"} schema={productFields} />
            {/*unit */}
            {/* <input
        type="text"
        name="unit"
        value={unit}
        onChange={(e) => handleUnitChange(e.target.value)}
        id="unitInput"
        className="w-100"
        placeholder={"Unit"}
      /> */}
            <InputFormItem name={"status"} schema={productFields} />
            <DatePickerFormItem
              name={"enquiry_date"}
              schema={feedbackFields}
              showTimeInput
            />

            {/* <select
              value={selectedProduct}
              onChange={(event) => setSelectedProduct(event.target.value)}
            >
              dropdown
              <option value="" label="Select a product" />
              {products &&
                products.map((product) => (
                  <option key={product.id} value={product.title}>
                    {product.title}
                  </option>
                ))}
            </select>  */}

            <Dropdown
  options={products.map((product1) => ({ label: product1.title, value: product1.title}))}
  value={selectedProduct} 
  onChange={(selectedValues) => setSelectedProduct(selectedValues)}
/>

            <div className="form-buttons">
              <button
                className="btn btn-primary"
                disabled={form.isSubmitting}
                type="submit"
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
          <Col sm={12} className={"d-flex justify-content-between"}>
            {/* <h4 className={"fw-bold"}>Reviews:</h4>
            {/* <Button
              className={bg-transparent border-0 fw-bold text-primary p-0 ${s.leaveFeedbackBtn}}
              onClick={() => setOpen(true)}
            >
              + Leave Feedback
            </Button> */}
          </Col>
          {
            feedbackList && feedbackList.map((item, idx) => {
              if (item.status === "visible") {
                return (
                  <Col sm={12} className={"d-flex mt-5"} key={idx}>
                    <img
                      src={item.image[0].publicUrl || person2}
                      style={{ borderRadius: 65 }}
                      className={mr-5 ${s.reviewImg}}
                      alt={"img"}
                    />
                    <div
                      className={d-flex flex-column justify-content-between align-items-start}
                    >
                      <div
                        className={d-flex justify-content-between w-100 ${s.reviewMargin}}
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
      <InstagramWidget />
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await axios.get(/products/${context.query.id});
  const product = res.data;

  return {
    props: { product, currentProductId: context.query.id }, // will be passed to the page component as props
  };
}

export default Id;