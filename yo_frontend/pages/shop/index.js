import React from "react";
import { Container, Row, Col, Input, Button, Modal } from "reactstrap";
import Checkbox from "react-custom-checkbox";
import InputRange from "react-input-range";
import Link from "next/link";
import {useDispatch, useSelector} from "react-redux";
import s from "./Shop.module.scss";

import InfoBlock from 'components/e-commerce/InfoBlock';
import filter from "public/images/e-commerce/filter.svg";
import relevant from "public/images/e-commerce/relevant.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Head from "next/head";
import InstagramWidget from 'components/e-commerce/Instagram';
import arrowRight from "../../public/images/e-commerce/home/arrow-right.svg";
import rating from "../../public/images/e-commerce/details/stars.svg";
import productsListActions from "../../redux/actions/products/productsListActions";


function truncateString(str, maxLength) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

let categoriesList = [],
  brandsList = [];

const Index = () => {
  
  const [quantity, setQuantity] = React.useState(1);
  const dispatchStore = useDispatch()
  const [rangeValue, setRangeValue] = React.useState({
    min: 0,
    max: 1000,
  });
  const openReducer = (state, action) => {
    switch (action.type) {
      case "open0":
        return {
          ...state,

          open0: !state.open0,
        };
      case "open1":
        return {
          ...state,
          open1: !state.open1,
        };
      case "open2":
        return {
          ...state,

          open2: !state.open2,
        };
      case "open3":
        return {
          ...state,

          open3: !state.open3,
        };
      case "open4":
        return {
          ...state,

          open4: !state.open4,
        };
      case "open5":
        return {
          ...state,

          open5: !state.open5,
        };
      case "open6":
        return {
          ...state,

          open6: !state.open6,
        };
      case "open7":
        return {
          ...state,

          open7: !state.open6,
        };
      case "open8":
        return {
          ...state,

          open8: !state.open8,
        };
    }
  };
  const [width, setWidth] = React.useState(1440);
  const [products, setProducts] = React.useState([]);
  const [showFilter, setShowFilter] = React.useState(false);
  const [allProducts, setAllProducts] = React.useState([]);
  const [openState, dispatch] = React.useReducer(openReducer, {
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
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    axios.get("/products").then((res) => {
      setAllProducts(res.data.rows);
      setProducts([...res.data.rows]);
    });
  }, []);

  const addToCart = (id) => {
    if (currentUser) {
      axios.post(`/orders/`, {
        data: {
          amount: 1,
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
      amount: 1,
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

  const filterByCategory = (category, brands) => {
    let count = 0,
      brandsCount = 0,
      brandsString = "",
      categoriesString = "";
    if (brands) {
      brandsList.push(category);
      brandsList.forEach((item) => {
        if (item === category) brandsCount += 1;
      });
      brandsList = brandsList.filter((item) => {
        if (brandsList.length === 1) {
          return true;
        }
        if (brandsCount === 1 && item === category) return true;
        return item !== category;
      });
      brandsString = brandsList.join("|");
    } else {
      categoriesList.push(category);
      categoriesList.forEach((item) => {
        if (item === category) count += 1;
      });
      categoriesList = categoriesList.filter((item) => {
        if (categoriesList.length === 1) {
          return true;
        }
        if (count === 1 && item === category) return true;
        return item !== category;
      });
      categoriesString = categoriesList.join("|");
    }
    axios
      .get(`/products?categories=${categoriesString}&brand=${brandsString}`)
      .then((res) => {
        setProducts([...res.data.rows]);
      });
  };

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta name="description" content="b2b store and module" />
        <meta name="keywords" content="yodigital" />
        <meta name="author" content="yodigital pvt. ltd." />
        <meta charSet="utf-8" />


        <meta property="og:title" content="yodigital b2b website"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://localhost:3000/"/>
  
        <meta name="twitter:card" content="summary_large_image" />

        <meta property="fb:app_id" content="712557339116053" />

        <meta property="og:site_name" content="yodigital"/>
        <meta name="twitter:site" content="@yodigital" />
      </Head>
      <Container fluid className={"mb-5"} style={{ marginTop: 32 }}>
        <Row>
          <ToastContainer />
          <Col sm={3} className={`${s.filterColumn} ${showFilter ? s.showFilter : ''}`} style={{backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', height:"auto" }}>
            <div className={s.filterTitle}><h5 className={"fw-bold mb-5 text-uppercase"}>Categories</h5><span onClick={() => setShowFilter(false)}>✕</span></div>
            <div className={"d-flex align-items-center"}>
              <Checkbox
                borderColor={"#232323"}
                borderWidth={1}
                borderRadius={2}
                icon={
                  <div
                    style={{
                      backgroundColor: "#bd744c",
                      borderRadius: 2,
                      padding: 4,
                    }}
                  />
                }
                size={16}
                label={
                  <p className={"d-inline-block ml-1 mb-0"}>Mobile</p>
                }
                onChange={() =>
                  filterByCategory("176953fe-2180-470d-a64d-efac0a367d12")
                }
                style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Camera</p>
                  }
                  onChange={() =>
                      filterByCategory("4e79cdda-a98e-43cb-bf00-c7d6ad87d2f4")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Camcorder</p>
                  }
                  onChange={() =>
                      filterByCategory("475ae017-5d38-4a2b-93bb-7a3c3869faf9")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>TV</p>
                  }
                  onChange={() =>
                      filterByCategory("ff07f133-93ba-42d0-bb52-78481d660ccf")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Tripods</p>
                  }
                  onChange={() =>
                      filterByCategory("c75bd533-d4a9-45d8-938b-a2a0dabd64dd")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Gimbals</p>
                  }
                  onChange={() =>
                      filterByCategory("68ba925f-7080-442c-844e-fab348aa3511")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Earpods</p>
                  }
                  onChange={() =>
                      filterByCategory("e8b5de9c-2b35-4b70-81b4-27d0739a8d73")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Powerbanks</p>
                  }
                  onChange={() =>
                      filterByCategory("78653e70-bf87-4c6b-8923-02b4c2e7ebe4")
                  }
                  style={{marginTop: -1}}
              />
            </div>
            
            {/* <h5 className={"fw-bold mb-5 mt-5 text-uppercase"}>Brands</h5>
            <div className={"d-flex align-items-center"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>APPLE</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc721", true)
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>PANASONIC</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc722", true)
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>LG</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc723", true)
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>SAMSUNG</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc724", true)
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>REDMI</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc725", true)
                  }
                  style={{marginTop: -1}}
              />
            </div> */}
            <h5 className={"fw-bold mb-5 mt-5 text-uppercase"}>
              Availability
            </h5>
            <div className={"d-flex align-items-center"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>On Stock</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc724", true)
                  }
                  style={{marginTop: -1}}
              />
            </div>
            <div className={"d-flex align-items-center mt-2"}>
              <Checkbox
                  borderColor={"#232323"}
                  borderWidth={1}
                  borderRadius={2}
                  icon={
                    <div
                        style={{
                          backgroundColor: "#bd744c",
                          borderRadius: 2,
                          padding: 4,
                        }}
                    />
                  }
                  size={16}
                  label={
                    <p className={"d-inline-block ml-1 mb-0"}>Out of Stock</p>
                  }
                  onChange={() =>
                      filterByCategory("1fcb7ece-6373-405d-92ef-3f3c4e7dc723", true)
                  }
                  style={{marginTop: -1}}
              />
            </div>
          </Col>
          <Col sm={width <= 768 ? 12 : 9}>
            {!(width <= 768) ? (
              <div
                className={"d-flex justify-content-between align-items-center"}
                style={{ marginBottom: 0 }}
              >
                <h6>
                  Showing{" "}
                  <span className={"fw-bold text-primary"}>
                    {products.length}
                  </span>{" "}
                  products 
                </h6>
                {/* <div className={"d-flex align-items-center"}>
                  <h6 className={"text-nowrap mr-3 mb-0"}>Sort by:</h6>
                  <Input type={"select"} style={{ height: 50, width: 180 }}>
                    <option>Most Popular</option>
                    <option>Newest</option>
                    <option>Price: low to high</option>
                    <option>Price: high to low</option>
                  </Input>
                </div> */}
              </div>
            ) : (
              <>
                <div className={"d-flex justify-content-between"} style={{backgroundColor:"#0000"}}>
                  <Button
                    className={"text-dark bg-transparent border-0"}
                    style={{ padding: "14px 0 22px 0" }}
                    onClick={() => setShowFilter(true)}
                  >
                    <img src={filter} /> Filters
                  </Button>
                  {/* <Button
                    className={"text-dark bg-transparent border-0"}
                    style={{ padding: "14px 0 22px 0" }}
                  >
                    <img src={relevant} /> Relevant
                  </Button> */}
                </div>
                <hr style={{ marginTop: 0, marginBottom: "2rem" }} />
              </>
            )}
            <Row>
              {products.map((item, index) => (
                <Col md={6} lg={3} xs={12} className={`mb-4 ${s.product}`} key={index}>
                  <Modal
                    isOpen={openState[`open${index}`]}
                    toggle={() => dispatch({ type: `open${index}` })}
                  >
                    <div className={s.modalWidndow}>z
                    <div className={s.image}>
  {item.image && item.image.length > 0 && (
    <img
      src={item.image[0].publicUrl}
      width={"100%"}
      height={"100%"}
      alt={`Image ${index}`}
    />
  )}
</div>
                      <div
                        className={
                          `${s.content} p-4 d-flex flex-column justify-content-between`
                        }
                      
                      >
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
                        <h6 className={`text-muted`}>
                          {item.categories[0].title[0].toUpperCase() +
                            item.categories[0].title.slice(1)}
                        </h6>
                        <h4 className={"fw-bold"}>{item.title}</h4>
                        
                        <p>
                        {item.description}
                        </p>
                        <div className={"d-flex"}>
                          <div
                            className={
                              "d-flex flex-column mr-5 justify-content-between"
                            }
                          >
                            <h6 className={"fw-bold text-muted text-uppercase"}>
                              Quantity
                            </h6>
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
                            className={
                              "d-flex flex-column justify-content-between"
                            }
                          >
                            <h6 className={"fw-bold text-muted text-uppercase"}>
                              Price
                            </h6>
                            <h6 className={"fw-bold"}>{item.price} INR</h6>
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
                  <div style={{backgroundColor: '#fff', padding: '15px', borderRadius: '12px', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px' }}>
                  <div style={{ position: "relative" }}>
                    <Link href={`/products/${item.id}`}>
                      <a>
                      <div
  style={{
    backgroundImage: item.image && item.image.length > 0 ? `url(${item.image[0].publicUrl})` : 'none', borderBottom: '1px solid #f2e9e9'
  }}
  className={s.productImage} 
/>

                      </a>
                    </Link>
                    <div
                      className={`d-flex flex-column justify-content-center ${s.product__actions}` }
                      style={{
                        position: "absolute",
                        height: "100%",
                        top: 0,
                        right: 15,
                      }}
                    >
                      {/* <Button
                        className={"p-0 bg-transparent border-0"}
                        onClick={() => {
                          addToWishlist(item.id);
                          toast.info(
                            "products successfully added to your wishlist"
                          );
                        }}
                      >
                        <div className={`mb-4 ${s.product__actions__heart}`} />
                      </Button>
                      <Button
                        className={"p-0 bg-transparent border-0"}
                        onClick={() => {
                          dispatch({ type: `open${index}` });
                        }}
                      >
                        <div className={`mb-4 ${s.product__actions__max}`} />
                      </Button>
                      <Button
                        className={"p-0 bg-transparent border-0"}
                        onClick={() => {
                          addToCart(item.id);
                          toast.info(
                            "products successfully added to your cart"
                          );
                        }}
                      >
                        <div className={`mb-4 ${s.product__actions__cart}`} />
                      </Button> */}
                    </div>
                  </div>
                  <div className={s.productInfo}>
                    <div>
                      <Link href={`/category/${item.categories[0].id}`}>
                        <a className={"mt-3 text-muted mb-0  d-inline-block"} >
                        {item.categories[0].title[0].toUpperCase() +
                          item.categories[0].title.slice(1)}
                        </a>
                      </Link>
                      <Link href={`/products/${item.id}`}>
                        <a>
                          <h6
                            className={"fw-bold font-size-base mt-1"}
                            style={{ fontSize: 16 }}
                          >
                            {truncateString(item.title, 20)}
                          </h6>
                        </a>
                      </Link>
                      {/* <h6 style={{ fontSize: 16 }}>INR {item.price}</h6> */}
                    </div>
                  </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <InfoBlock />
      <InstagramWidget />
    </>
  );
};

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default Index;
