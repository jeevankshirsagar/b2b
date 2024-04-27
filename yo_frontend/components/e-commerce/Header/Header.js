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
  DropdownToggle,
  DropdownMenu,
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

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.switchSidebar = this.switchSidebar.bind(this);

    this.state = {
      heightOne: 0,
      heightTwo: 0,
      heightThree: 0,
      heightFour: 0,
      innerWidth: typeof window !== "undefined" && window.innerWidth,
      count: 0,
    };
  }

  switchSidebar() {
    if (this.props.sidebarOpened) {
      this.props.dispatch(closeSidebar());
      this.props.dispatch(changeActiveSidebarItem(null));
    } else {
      const paths = this.props.router.pathname.split("/");
      paths.pop();
      this.props.dispatch(openSidebar());
      this.props.dispatch(changeActiveSidebarItem(paths.join("/")));
    }
  }


  // const doLogout = async () => {
  //   dispatch(logoutUser());
  //   try {
  //     await router.push("/");
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error redirecting to home page:", error);
  //   }
  // };
  componentDidMount() {
    typeof window !== "undefined" &&
      window.addEventListener("resize", () => {
        this.setState({ innerWidth: window.innerWidth });
      });
    if (this.props.currentUser) {
      axios
        .get(`/orders?user=${this.props.currentUser.id}&status=in+cart`)
        .then((res) => {
          this.setState({
            count: res.data.count,
          });
        })
        .catch(e => console.log(e));
      return;
    } else if (localStorage.getItem("products") && !this.props.currentUser) {
      this.setState({
        count: JSON.parse(localStorage.getItem("products")).length,
      });
    }
  }

  toggle = (e) => {
    this.setState({ [e.target.name]: true });
  };

  onMouseEnter = (e) => {
    this.setState({ [e.target.name]: true });
  };

  onMouseLeave = (e) => {
    this.setState({ [e.target.name]: false });
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
    const { heightTwo, heightThree, heightFour } = this.state;
    const isAdmin = this.props.currentUser && this.props.currentUser.role === 'admin';
    

    return (
      <Navbar className={s.header}>
        <Container fluid>

          {this.state.innerWidth <= 768 && (
                <Button
                    className={"bg-transparent border-0 p-0"}
                    onClick={() => this.switchSidebar()}
                >
                  <img src={menuImg} alt={'menu'} />
                </Button>
          )}

          <NavbarBrand>
            <Link href={"/"}><span className={s.logoStyle}></span></Link>
          </NavbarBrand>

          {this.state.innerWidth >= 768 && (
            <div>
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
                
                <li className={s.nav__menuItem} style={{ width: 90 }}>
                  <ActiveLink
                    className={s.navLink}
                    onMouseOver={this.toggleHeightOne}
                    href={"/contact"}
                  >
                    <span className={s.dropdownItem}>Contact</span>
                  </ActiveLink>
                </li>

                <li className={s.nav__menuItem} style={{ width: 90 }}>
                  
                  <ActiveLink
                    className={s.navLink}
                    onMouseOver={this.toggleHeightOne}
                    href={"/shop"}
                  >
                    <span className={s.dropdownItem}>Shop</span>
                  </ActiveLink>
                </li>

                {/* <li className={s.nav__menuItem}>
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
                    <UncontrolledDropdown>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/shop"}>
                          <a>Shop</a>
                        </ActiveLink>
                      </DropdownItem>
                    </UncontrolledDropdown>
                  </AnimateHeight>
                </li> */}
                <li className={s.nav__menuItem}>
                  <span
                    className={s.dropdownItem}
                    onMouseOver={this.toggleHeightThree}
                  >
                    Company<div className={s.dropdownItemImg} />
                  </span>
                  <AnimateHeight
                    duration={500}
                    className={`${s.nav__submenu}`}
                    height={heightThree}
                  >
                    <UncontrolledDropdown>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/about"}>
                          <a>About</a>
                        </ActiveLink>
                      </DropdownItem>
                      <DropdownItem className={s.dropdownMenuItem}>
                        <ActiveLink href={"/announcement"}>
                          <a>Announcements</a>
                        </ActiveLink>
                      </DropdownItem>
                    </UncontrolledDropdown>
                  </AnimateHeight>
                </li>
                
                {/* {isAdmin && (
                  <li className={s.nav__menuItem}>
                    <ActiveLink
                      className={s.navLink}
                      onMouseOver={this.toggleHeightFour}
                      href={"/admin/feedback"}
                    >
                      <span className={s.dropdownItem}>Dashboard</span>
                    </ActiveLink>
                  </li>
                )} */}
              </ul>
            </nav>
            </div>
          )}

          <Nav>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.currentUser ? this.props.currentUser.firstName : "Login"}
              </DropdownToggle>
              <DropdownMenu right>
                {this.props.currentUser ? (
                  <>
                  {isAdmin && (                  
                    <DropdownItem
                      className={s.navLink}
                      onMouseOver={this.toggleHeightFour}
                      href={"/admin/users"}
                    >

<i className="bi bi-cast"/>Dashboard
                    </DropdownItem>
                )}
                    <DropdownItem href="/admin/dashboard">
                      <i className="la la-user" /> My Account
                    </DropdownItem>
                    <DropdownItem href="/shop">
                      <i className="bi bi-shop-window" /> Shop
                    </DropdownItem>
                    <DropdownItem onClick={this.doLogout}>
                      <i className="la la-sign-out" /> Log Out
                    </DropdownItem>
                    
                  </>
                ) : (
                  <DropdownItem href="/login">
                    <i className="la la-sign-in" /> Login
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
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
    products: store.products.list
  };
}

export default withRouter(connect(mapStateToProps)(Header));
