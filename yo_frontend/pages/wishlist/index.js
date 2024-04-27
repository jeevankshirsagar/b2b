import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "reactstrap";
import close from "public/images/e-commerce/close.svg";
import InstagramWidget from 'components/e-commerce/Instagram';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import s1 from "./Wishlist.module.scss";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import productsListActions from "../../redux/actions/products/productsListActions";
import InfoBlock from "components/e-commerce/InfoBlock";

const Wishlist = () => {
  const [test, setTest] = useState(false);
  const [products, setProducts] = useState([]);
  const currentUser = useSelector((store) => store.auth.currentUser);
  const dispatchStore = useDispatch();

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (currentUser) {
        try {
          const res = await axios.get(`/users/${currentUser.id}`);
          const wishlistIds = res.data.wishlist.map(item => item.id);
          const productsData = await Promise.all(wishlistIds.map(id => axios.get(`/products/${id}`)));
          const wishlistProducts = productsData.map(res => res.data);
          setProducts(wishlistProducts);
        } catch (error) {
          console.error("Error fetching wishlist products:", error);
        }
      } else {
        const localWishlist = localStorage.getItem("wishlist");
        if (localWishlist) {
          const wishlistIds = JSON.parse(localWishlist);
          const productsData = await Promise.all(wishlistIds.map(id => axios.get(`/products/${id.product}`)));
          const wishlistProducts = productsData.map(res => res.data);
          setProducts(wishlistProducts);
        }
      }
    };

    fetchWishlistProducts();
  }, [currentUser, test]);

  const removeFromWishlist = async (id) => {
    try {
      if (currentUser) {
        await axios.put(`/users/${currentUser.id}`, {
          id: currentUser.id,
          data: {
            ...currentUser,
            wishlist: [],
          },
        });
      } else {
        localStorage.removeItem("wishlist");
      }
      setTest(prev => !prev);
      toast.info("Product successfully removed");
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  const addToCart = async (id) => {
    try {
      if (currentUser) {
        await axios.post(`/orders/`, {
          data: {
            amount: 1,
            order_date: new Date(),
            product: id,
            status: "ordered",
            user: currentUser.id,
          },
        });
      } else {
        const localProducts = JSON.parse(localStorage.getItem("products")) || [];
        localProducts.push({
          amount: 1,
          order_date: new Date(),
          product: id,
          status: "ordered",
        });
        localStorage.setItem("products", JSON.stringify(localProducts));
        dispatchStore(productsListActions.doAdd(localProducts));
        localStorage.removeItem("wishlist");
        setProducts([]);
      }
      toast.info("Product successfully added to your cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="B2B store and module" />
        <meta name="keywords" content="yodigital" />
        <meta name="author" content="yodigital pvt. ltd." />
        <meta charSet="utf-8" />
        <meta property="og:title" content="Yodigital B2B Website" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://localhost:3000/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="fb:app_id" content="712557339116053" />
        <meta property="og:site_name" content="yodigital" />
        <meta name="twitter:site" content="@yodigital" />
      </Head>
      <Container>
        <ToastContainer />
        <Row className={"mb-5"} style={{ marginTop: 32 }}>
          <Col xs={12} style={{ overflow: 'auto' }}>
            <h2 className={"fw-bold mt-4 mb-4"}>Wishlist</h2>
            <Table className={s1.wishListTable} borderless>
              <thead>
                <tr style={{ borderBottom: "1px solid #D9D9D9" }}>
                  <th className={"bg-transparent text-dark px-0"}>Product</th>
                  {/* <th className={"bg-transparent text-dark px-0"}>Price</th> */}
                  <th className={"bg-transparent text-dark px-0"}>Stock status</th>
                  <th className={"bg-transparent text-dark px-0"} />
                  <th className={"bg-transparent text-dark px-0"} />
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">No items</td>
                  </tr>
                ) : (
                  products.map((item, index) => (
                    <tr key={index} className={"mt-2"}>
                      <td className={"px-0 pt-4"}>
                        <div className={"d-flex align-items-center"}>
                          {item.image && item.image.length > 0 && (
                            <img src={item.image[0].publicUrl} width={100} className={"mr-4"} />
                          )}
                          <div>
                          {item.categories && item.categories[0] && (
                            <h6 className={"text-muted"}>
                              {item.categories[0].title[0].toUpperCase() + item.categories[0].title.slice(1)}
                            </h6>
                                )}
                            <h5 className={"fw-bold"}>{item.title}</h5>
                          </div>
                        </div>
                      </td>
                      {/* <td className={"px-0 pt-4"}>
                        <h6 className={"fw-bold mb-0"}>INR {item.price}</h6>
                      </td> */}
                      <td className={"px-0 pt-4"}>
                        <h6 className={`fw-bold mb-0 text-uppercase ${item.status === "out of stock" && "text-muted"}`}>
                          {item.status}
                        </h6>
                      </td>
                      <td className={"px-0 pt-4"}>
                        {item.status !== "out of stock" && (
                          <Button
                            color={"primary"}
                            outline
                            className={`text-uppercase d-flex align-items-center ${s1.addToCartBtn}`}
                            size={"sm"}
                            onClick={() => {
                              addToCart(item.id);
                            }}
                          >
                            <div className={`mr-2 ${s1.addToCart}`} />
                            add to cart
                          </Button>
                        )}
                      </td>
                      <td className={"px-0 pt-4"}>
                        <Button
                          className={"bg-transparent border-0 p-0"}
                          onClick={() => {
                            removeFromWishlist(item.id);
                          }}
                        >
                          <img src={close} alt={"close"} />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <InfoBlock />
      {/* <InstagramWidget /> */}
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

export default Wishlist;
