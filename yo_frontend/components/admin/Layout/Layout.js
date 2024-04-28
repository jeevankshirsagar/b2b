import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector } from "react-redux";
import { withRouter } from 'next/router'
import Loader from "components/admin/Loader";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";
import Header from "../Header";
import ErrorPage from "../../../pages/404";
import HeaderComp from 'components/e-commerce/Header';
import FooterComp from 'components/e-commerce/Footer';
import Helper from "../Helper";
import Sidebar from "../Sidebar/Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "redux/actions/navigation";
import s from "./Layout.module.scss";
import BreadcrumbHistory from "../BreadcrumbHistory";

import { SidebarTypes } from "redux/reducers/layout";

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };


  

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768 && this.props.sidebarStatic) {
      this.props.dispatch(toggleSidebar(false));
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    const { currentUser, loadingInit, router } = this.props; // Destructure currentUser from props
  
    if (!currentUser && !router.pathname.includes('documentation')) {
      // if (loadingInit) return
      //  <Loader />
      return (
        <>
          <HeaderComp />
          <ErrorPage />
          <FooterComp />
        </>
      )
    }
  
    return (
      <div
        className={[
          s.root,
          this.props.sidebarStatic ? `${s.sidebarStatic}` : "",
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "sing-dashboard",
          `dashboard-${
            this.props.sidebarType === SidebarTypes.TRANSPARENT
              ? "light"
              : this.props.dashboardTheme
          }`,
        ].join(" ")}
      >
        <Sidebar />
        <div className={s.wrap}>
          <Header />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              
              {/* {currentUser && currentUser.role == "admin" && <BreadcrumbHistory url={router.pathname} />} */}
              <TransitionGroup>
                <CSSTransition
                  classNames="fade"
                  timeout={200}
                >
                  {this.props.children}
                </CSSTransition>
              </TransitionGroup>
              <footer className={s.contentFooter}>
                WTS Ecommerce - Made by{" "}
                <a
                  href="https://exigirtech.com"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  WTS
                </a>
              </footer>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
  
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    dashboardTheme: store.layout.dashboardTheme,
    sidebarType: store.layout.sidebarType,
    currentUser: store.auth.currentUser,
    loadingInit: store.auth.loadingInit,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
