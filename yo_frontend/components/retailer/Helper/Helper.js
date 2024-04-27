import React, { Component } from "react";
import cx from "classnames";
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  DashboardThemes,
  SidebarTypes,
  NavbarTypes,
} from "redux/reducers/layout";
import {
  changeTheme,
  changeSidebarColor,
  changeNavbarColor,
  navbarTypeToggle,
  sidebarTypeToggle,
} from "../../../redux/actions/layout";
import CustomColorPicker from "../ColorPicker";
import config from "constants/config";

import Widget from "../Widget";

import s from "./Helper.module.scss"; // eslint-disable-line

class Helper extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    dashboardTheme: PropTypes.string,
  };

  static defaultProps = {
    dashboardTheme: DashboardThemes.DARK,
  };

  state = {
    isOpened: false,
  };

  toggle = () => {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  };

  changeTheme = (state) => {
    this.props.dispatch(changeTheme(state));
    this.props.dispatch(changeSidebarColor(state));
  };

  navbarStateToggle = (state) => {
    this.props.dispatch(navbarTypeToggle(state));
  };

  sidebarStateToggle = (state) => {
    this.props.dispatch(sidebarTypeToggle(state));
  };

  updateColor = (value) => {
    this.props.dispatch(changeNavbarColor(value));
  };

  render() {
    const { isOpened } = this.state;
    const { navbarColor, sidebarColor, navbarType, sidebarType } = this.props;

    return (
      <div className={cx(s.themeHelper, { [s.themeHelperOpened]: isOpened })}>
        <div
          className={`${s.themeHelperBtn} bg-primary helper-button`}
          onClick={this.toggle}
        >
          <div className={cx(s.themeHelperSpinner, "text-white")}>
            <i className="la la-cog" />
            <i className="la la-cog" />
          </div>
        </div>
        <Widget className={s.themeHelperContent}>
          <div className={s.helperHeader}>
            <h5 className="m-0">Theme Customizer</h5>
          </div>

          <div className="theme-settings">
            <h5 className="navbar-type-switcher">Navbar Type</h5>
            <div className="form-group row">
              <div className="abc-radio">
                <input
                  onChange={() => this.navbarStateToggle(NavbarTypes.STATIC)}
                  type="radio"
                  checked={navbarType === NavbarTypes.STATIC ? true : ""}
                  name="navbar-type"
                  id="navbar_static"
                />
                <label htmlFor="navbar_static">Static</label>
              </div>

              <div className="abc-radio">
                <input
                  onChange={() => this.navbarStateToggle(NavbarTypes.FLOATING)}
                  type="radio"
                  checked={navbarType === NavbarTypes.FLOATING ? true : ""}
                  name="navbar-type"
                  id="navbar_floating"
                />
                <label htmlFor="navbar_floating">Floating</label>
              </div>
            </div>

            <h5 className="mt-4 navbar-color-picker">Navbar Color</h5>
            <CustomColorPicker
              colors={config.app.colors}
              activeColor={navbarColor}
              updateColor={this.updateColor}
              customizationItem={"navbar"}
            />

            <h5 className="mt-4 sidebar-type-switcher">Sidebar Type</h5>
            <div className="form-group row">
              <div className="abc-radio">
                <input
                  type="radio"
                  onChange={() =>
                    this.sidebarStateToggle(SidebarTypes.TRANSPARENT)
                  }
                  checked={sidebarType === SidebarTypes.TRANSPARENT ? true : ""}
                  name="sidebar-type"
                  id="sidebar_transparent"
                />
                <label htmlFor="sidebar_transparent">Transparent</label>
              </div>

              <div className="abc-radio">
                <input
                  type="radio"
                  onChange={() => this.sidebarStateToggle(SidebarTypes.SOLID)}
                  checked={sidebarType === SidebarTypes.SOLID ? true : ""}
                  name="sidebar-type"
                  id="sidebar_solid"
                />
                <label htmlFor="sidebar_solid">Solid</label>
              </div>
            </div>

            <h5 className="mt-4 sidebar-color-picker">Sidebar Color</h5>
            <CustomColorPicker
              colors={config.app.colors}
              activeColor={sidebarColor}
              updateColor={this.changeTheme}
              customizationItem={"sidebar"}
            />
          </div>
          <div className="mt-5">
            
            
          </div>
          <div className="d-flex justify-content-between mt-lg">
            <Button
              href="https://worldtechsolutions.com/contact"
              target="_blank"
              className="btn-outline-default btn-rounded-f fs-mini text-muted px-2"
            >
              <i className="glyphicon glyphicon-headphones mr-xs" />
              Support
            </Button>
            <Button
              href="https://github.com/worldtechsolutions/sing-app"
              target="_blank"
              className="btn-outline-default btn-rounded-f fs-mini text-muted px-2"
            >
              <i className="fa fa-github mr-xs" />
              Github
            </Button>
          </div>
          <div className="mt-lg d-flex flex-column align-items-center theme-helper__sharing">
            <span className="fs-sm">Thank you for sharing!</span>
            <div className="d-flex justify-content-center text-light mt-2">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/intent/tweet?text=Amazing%20dashboard%20built%20with%20NodeJS,%20React%20and%20Bootstrap!&url=https://github.com/worldtechsolutions/react-dashboard&via=worldtechsolutions"
              >
                <i className="fa fa-twitter pr-1" />
              </a>
              <a
                href="https://www.facebook.com/search/top/?q=worldtechsolutions%20llc"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-facebook pl-1" />
              </a>
            </div>
          </div>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    dashboardTheme: store.layout.dashboardTheme,
    sidebarColor: store.layout.sidebarColor,
    navbarColor: store.layout.navbarColor,
    navbarType: store.layout.navbarType,
    sidebarType: store.layout.sidebarType,
  };
}

export default connect(mapStateToProps)(Helper);
