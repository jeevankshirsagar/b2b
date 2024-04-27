import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import s from "./Loader.module.scss";
import Lottie from "lottie-web";
import animationData from "../../../public/animation/yologo.json";
import { Container } from "reactstrap";

const Loader = ({ size, className }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000); // Display for 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    if (showLoader) {
      Lottie.loadAnimation({
        container: document.getElementById("loader"), // Use an ID to target the container
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, [showLoader]);

  return showLoader ? (
    <div className={s.loaderWrapper}>
      <span
        id="loader" 
        className={cx(s.root, className)}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  ) : null;
};

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Loader.defaultProps = {
  size: 21,
};

export default Loader;
