import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import OtpInput from "react-otp-input";
import {
  Container,
  Button,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import Head from "next/head";
import { loginUser } from "redux/actions/auth";
import jwt from "jsonwebtoken";
import logo from "public/images/e-commerce/logo.svg";
import eye from "public/images/e-commerce/login/eye.png";
import eyeOff from "public/images/e-commerce/login/eye-off.png";

import s from "./Login.module.scss";

import 'bootstrap-icons/font/bootstrap-icons.css'

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    viewPassword: PropTypes.bool, // Corrected: PropTypes.bool
  };

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      otp: "", // Add OTP state
      isOTPMode: false,
      viewPassword: false, // Corrected: added viewPassword to state
    };

    this.doLogin = this.doLogin.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeOTP = this.changeOTP.bind(this);
    this.handleOTPSubmit = this.handleOTPSubmit.bind(this);
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }

  changePassword(event) {
    this.setState({ password: event.target.value });
  }

  changeOTP(otp) {
    this.setState({ otp: otp });
  }

  doLogin(e) {
    e.preventDefault();
    const { email, password, otp, isOTPMode } = this.state;
    if (isOTPMode) {
      if (otp.trim() !== "") {
        
        this.props.router.push("/admin/dashboard");
      } 
    } else {
      this.props.dispatch(loginUser({ email: email, password: password }));
    }
  }

  toggleMode() {
    // Toggle between email/password mode and OTP mode
    this.setState((prevState) => ({ isOTPMode: !prevState.isOTPMode }));
  }

  changeMobileNumber(event) {
    const inputValue = event.target.value;
    if (/^\d{10}$/.test(inputValue)) {
      
      this.setState({ mobileNumber: inputValue });
    } else if (inputValue === '' || /^\d+$/.test(inputValue))   
      this.setState({ mobileNumber: inputValue });
    }
  

  handleOTPSubmit(otp) {
    // Check if OTP is valid (for demonstration, consider any non-empty OTP as valid)
    if (otp.trim() !== "") {
      // Navigate to the account page
      this.props.router.push("/account");
    } else {
      // Handle invalid OTP (optional)
      console.log("Invalid OTP");
    }
  }

  render() {
    const { isOTPMode } = this.state;

    return (
      <>
        <Head>
          <title>Login | Ecommerce</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />

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
        <Row className={"no-gutters"} style={{ height: "100vh" }}>
          <Col
            xs={12}
            md={6}
            className={
              "d-flex flex-column justify-content-center align-items-center h-100"
            }
          >
            <Container fluid>
              <Row className={"d-flex justify-content-center"}>
                <Col lg={8} xs={"auto"}>
                  <h2 className={"fw-bold mb-5"}>Retailer Login</h2>
                  <Form className={"w-100"} onSubmit={this.doLogin}>
                  {/* <FormGroup>
                          <Label for="contact" className="fw-bold">
                            Registered Mobile
                          </Label>
                          <Input
                            type="contact"
                            name="contact"
                            id="contact"
                            className="w-50"
                            placeholder="Registered Mobile"
                            value={this.state.email}
                            onChange={this.changeEmail}
                            required
                          />
                        </FormGroup> */}
                    {/* Render OTP field only in OTP mode */}
                    {isOTPMode ? (
                      <>
<FormGroup>
  <Label for="mobileNumber" className="fw-bold">
    Mobile Number
  </Label>
  <div className="position-relative d-flex">
  <Input
  type="tel" // Change type to "tel" for mobile number input
  name="mobileNumber"
  id="mobileNumber"
  className="w-60 pr-5" // Added padding to accommodate the button
  placeholder="Registered Number"
  value={this.state.mobileNumber} // Use mobileNumber state variable
  onChange={this.changeMobileNumber} // Update to changeMobileNumber function
  required
/>

    <button className={`btn-primary ml-1  ${s.sendOTPButton}`} onClick={this.sendOTP} style={{borderRadius:'25px'}}>
    <i className="bi bi-arrow-right-circle-fill"></i>
    </button>
  </div>
</FormGroup>

                      <FormGroup>
                        <Label for="otp" className="fw-bold">
                          OTP
                        </Label>
                        <OtpInput
                          inputStyle={{
                            width: "45px",
                            height: "45px",
                            fontSize: "20px",
                            margin: "5px",
                          }}
                          value={this.state.otp}
                          onChange={this.changeOTP}
                          numInputs={4}
                          renderSeparator={<span>-</span>}
                          renderInput={(props) => <input {...props} />}
                        />
                      </FormGroup>
                      
                      </>

                    ) : (
                      <>
                        <FormGroup>
                          <Label for="email" className="fw-bold">
                            Username or Email
                          </Label>
                          <Input
                            type="email"
                            name="email"
                            id="email"
                            className="w-100"
                            placeholder="User Mail"
                            value={this.state.email}
                            onChange={this.changeEmail}
                            required
                          />
                        </FormGroup>
                        <FormGroup className={s.formGroup}>
                          <Label for="password" className="fw-bold">
                            Password
                          </Label>
                          <Input
                            type={this.state.viewPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            className="w-100"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.changePassword}
                            required
                          />
                          <img
                            className={s.viewPassword}
                            src={this.state.viewPassword ? eye : eyeOff}
                            onClick={() =>
                              this.setState({
                                viewPassword: !this.state.viewPassword,
                              })
                            }
                          />
                        </FormGroup>
                      </>
                    )}
                   <div className={"d-flex justify-content-between align-items-center mt-5"}>
  {isOTPMode ? (
    <>
      <Button
        color={"primary"}
        style={{ width: "45%", borderRadius: '12px' }}
        className={`${s.button} fw-bold text-uppercase`}
        type="submit"
      >
        Verify
      </Button>
      
    </>
  ) : (
    <>
      <Button
        color={"primary"}
        style={{ width: "45%", borderRadius: '12px' }}
        className={`${s.button} fw-bold text-uppercase`}
        type="submit"
      >
        Login
      </Button>
      <Button
        color={"secondary"}
        style={{ width: "60%", borderRadius: '12px' }}
        className={`${s.button}  text-uppercase fw-bold ml-2`}
        onClick={this.toggleMode}
      >
        OTP
      </Button>
    </>
  )}
</div>

                  </Form>
                  <footer
                    className={`d-flex justify-content-between ${s.footer}`}
                  >
                    <Link href={"/terms"} className={"fw-bold text-dark"}>
                      Terms & Conditions
                    </Link>
                    {/* <Link href={"/reset"} className={"fw-bold text-dark"}>
                      Forget Password?
                    </Link> */}
                    <Link href={"/terms"} className={"fw-bold text-dark"}>
                      Privacy Policy
                    </Link>
                  </footer>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col
            sm={6}
            className={`d-none d-md-inline-block h-100 ${s.backgroundImage}`}
          />
        </Row>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));