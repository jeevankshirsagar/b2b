import React from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownItem,
  Container,
  Button,
  UncontrolledDropdown,
} from "reactstrap";
import AnimateHeight from "react-animate-height";
import ActiveLink from "components/admin/ActiveLink/ActiveLink";
import Link from "next/link";
import s from "./Header.module.scss";
import menuImg from "public/images/e-commerce/header/menu.svg";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import {
  changeActiveSidebarItem,
  closeSidebar,
  openSidebar,
} from "redux/actions/navigation";
import axios from "axios";

import MegaMenu from "./MegaMenu";

import { Modal } from "react-bootstrap";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [], // Initialize categories as an empty array
      heightOne: 0,
      heightTwo: 0,
      heightThree: 0,
      heightFour: 0,
      innerWidth: typeof window !== "undefined" && window.innerWidth,
      count: 0,
      showModal: false,
      hoveredItem: null,
    };
  }

  switchSidebar = () => {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.router.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.fetchCategories();
    this.fetchUserOrders();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({ innerWidth: window.innerWidth });
  };

  fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories/");
      this.setState({ categories: response.data });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchUserOrders = () => {
    if (this.props.currentUser) {
      axios
        .get(`/orders?user=${this.props.currentUser.id}&status=in+cart`)
        .then((res) => {
          this.setState({ count: res.data.count });
        })
        .catch((e) => console.log(e));
    } else if (localStorage.getItem("products") && !this.props.currentUser) {
      this.setState({
        count: JSON.parse(localStorage.getItem("products")).length,
      });
    }
  };

  toggleHeightOne = () => {
    this.setState({
      heightOne: "auto",
      heightTwo: 0,
      heightThree: 0,
      heightFour: 0,
    });
  };

  toggleHeightTwo = () => {
    this.setState({
      heightOne: 0,
      heightTwo: "auto",
      heightThree: 0,
      heightFour: 0,
    });
  };

  toggleHeightThree = () => {
    this.setState({
      heightOne: 0,
      heightTwo: 0,
      heightThree: "auto",
      heightFour: 0,
    });
  };

  toggleHeightFour = () => {
    this.setState({
      heightOne: 0,
      heightTwo: 0,
      heightThree: 0,
      heightFour: "auto",
    });
  };




  render() {
    const { heightOne, heightTwo, heightThree, heightFour, categories } =
      this.state;
    const { currentUser, isAdmin } = this.props;

    return (
      <Navbar className={s.header}>
        <Container>
          {this.state.innerWidth <= 768 && (
            <Button
              className={"bg-transparent border-0 p-0"}
              onClick={() => this.switchSidebar()}
            >
              <img src={menuImg} alt={"menu"} />
            </Button>
          )}

          <NavbarBrand>
            <Link href={"/"}>
              <span className={s.logoStyle}></span>
            </Link>
          </NavbarBrand>

          {this.state.innerWidth >= 768 && (
            <nav className={s.nav}>
              <ul className={s.nav__menu}>
                <li className={s.nav__menuItem} style={{ width: 90 }}>
                  <ActiveLink
                    className={s.navLink}
                    onMouseOver={this.toggleHeightOne}
                    href={"/"}
                  >
                    <span className={s.dropdownItem}>Home</span>
                  </ActiveLink>
                </li>

                {/* {Array.isArray(categories) &&
                  categories.map((category, index) => (
                    <li className={s.nav__menuItem} key={index}>
                      <span
                        className={s.dropdownItem}
                        onMouseOver={this.toggleHeightThree}
                      >
                        {category.title}{" "}
                        <div className={s.dropdownItemImg} />
                      </span>
                      <AnimateHeight
                        duration={500}
                        className={`${s.nav__submenu}`}
                        height={heightThree}
                      >
                        <UncontrolledDropdown>
                          <DropdownItem className={s.dropdownMenuItem}>
                            <ActiveLink href={`/shop/${category.slug}`}>
                              <a>{category.title}</a>
                            </ActiveLink>
                          </DropdownItem>
                        </UncontrolledDropdown>
                      </AnimateHeight>
                    </li>
                  ))} */}

                <li className={s.nav__menuItem}>
                  <span
                    className={s.dropdownItem}
                    onMouseOver={this.toggleHeightThree}
                  >
                    Shop <div className={s.dropdownItemImg} />
                  </span>
                  <AnimateHeight
                    duration={500}
                    className={`${s.nav__submenu}`}
                    height={heightThree}
                  >
                    {/* <UncontrolledDropdown>
                      <DropdownItem
                        className={s.dropdownMenuItem}
                        style={{ width: "980%", height: "980%" }}
                      >
                        <ActiveLink href={"/shop"}>
                          <a>
                            <MegaMenu model={item} />
                          </a>
                        </ActiveLink>
                      </DropdownItem>
                    </UncontrolledDropdown> */}

<div className={` ${s.header_right}`}>
  <ul className={`${s.main_menu}`}>
    <MegaMenu />
    {/* Add other menu items here */}
  </ul>
  {/* <a href="#" id="hamburger-icon" className="mobile-toggler" aria-label="Mobile Menu" onClick={toggleMobileMenu}> */}
    {/* <i className={mobileMenuVisible ? 'fas fa-xmark' : 'fas fa-bars'}></i> */}
  {/* </a> Remove this erroneous closing tag */}
</div>


                  </AnimateHeight>
                </li>
                <li className={s.nav__menuItem} style={{ width: 90 }}>
                  <ActiveLink
                    className={s.navLink}
                    onMouseOver={this.toggleHeightOne}
                    href={"/contact"}
                  >
                    <span className={s.dropdownItem}>Join Us</span>
                  </ActiveLink>
                </li>

                {isAdmin && (
                  <li className={s.nav__menuItem}>
                    <ActiveLink
                      className={s.navLink}
                      onMouseOver={this.toggleHeightFour}
                      href={"/admin/feedback"}
                    >
                      <span className={s.dropdownItem}>Dashboard</span>
                    </ActiveLink>
                  </li>
                )}
              </ul>
            </nav>
          )}

          <Nav>
            <NavItem className="d-flex align-items-center">
              {this.state.innerWidth >= 768 && (
                  <>
                    <li className={s.nav__menuItem} style={{ width: 90 }}>
                      {this.props.currentUser ? (
                          <ActiveLink className={s.navLink} onMouseOver={this.toggleHeightOne} href="/account">
                            <span className={s.dropdownItemm}>{this.props.currentUser.firstName}</span>
                          </ActiveLink>
                      ) : (
                          <ActiveLink className={s.navLink} onMouseOver={this.toggleHeightOne} href="/login">
                            <span className={s.dropdownItemm}>Login</span>
                          </ActiveLink>
                      )}
                    </li>
                  </>
              )}
            </NavItem>
            {/*<NavItem className={"d-flex align-items-center"}>*/}
            {/*  {this.state.innerWidth >= 768 && (*/}
            {/*    <>*/}
            {/*      <li className={s.nav__menuItem} style={{ width: 90 }}>*/}


            {/*        <ActiveLink*/}
            {/*          className={s.navLink}*/}
            {/*          onMouseOver={this.toggleHeightOne}*/}
            {/*          href={"/account"} // Adjust the href as needed*/}
            {/*        >*/}
            {/*          {this.props.currentUser ? ( // Check if currentUser exists*/}
            {/*            <span className={s.dropdownItemm}>*/}
            {/*              {this.props.currentUser.firstName}*/}
            {/*            </span>*/}
            {/*          ) : (*/}
            {/*            <span className={s.dropdownItemm}>Login</span> // Display "Login" text if currentUser is not available*/}
            {/*          )}*/}
            {/*        </ActiveLink>*/}

            {/*      </li>*/}
            {/*    </>*/}
            {/*  )}*/}
            {/*</NavItem>*/}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

Header.propTypes = {};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    currentUser: store.auth.currentUser,
    navbarType: store.layout.navbarType,
    navbarColor: store.layout.navbarColor,
    products: store.products.list,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
