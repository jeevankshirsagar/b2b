// import React from "react";
// import PropTypes from "prop-types";
// import { withRouter } from "next/router";
// import Link from 'next/link'
// import { connect } from "react-redux";
// import {
//   Container,
//   Button,
//   Col,
//   Row,
//   FormGroup,
//   Label,
//   Input,
//   Form,
// } from "reactstrap";
// import Head from 'next/head';
// import { loginUser } from "redux/actions/auth";
// import jwt from "jsonwebtoken";
// import logo from "public/images/e-commerce/logo.svg";
// import eye from 'public/images/e-commerce/login/eye.png';
// import eyeOff from 'public/images/e-commerce/login/eye-off.png';

// import s from './Login.module.scss';
// import PhoneOtpForm from "./otp-input"; // Import your phone OTP form component

// class Login extends React.Component {
//   static propTypes = {
//     dispatch: PropTypes.func.isRequired,
//     viewPassword: false,
//   };

//   static isAuthenticated() {
//     const token =
//       typeof window !== "undefined" && localStorage.getItem("token");
//     if (!token) return;
//     const date = new Date().getTime() / 1000;
//     const data = jwt.decode(token);
//     if (!data) return;
//     return date < data.exp;
//   }

//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//       // showPhoneOtpForm: false,
//       // Add state for showing phone OTP form
//     };

//     this.doLogin = this.doLogin.bind(this);
//     this.googleLogin = this.googleLogin.bind(this);
//     this.microsoftLogin = this.microsoftLogin.bind(this);
//     this.changeEmail = this.changeEmail.bind(this);
//     this.changePassword = this.changePassword.bind(this);
//     this.signUp = this.signUp.bind(this);
//     // this.showPhoneOtpForm = this.showPhoneOtpForm.bind(this);
//     // this.onOtpSubmit = this.onOtpSubmit.bind(this);
//   }

//   changeEmail(event) {
//     this.setState({ email: event.target.value });
//   }

//   changePassword(event) {
//     this.setState({ password: event.target.value });
//   }

//   doLogin(e) {
//     e.preventDefault();
//     this.props.dispatch(
//       loginUser({ email: this.state.email, password: this.state.password })
//     );
//   }

//   googleLogin() {
//     this.props.dispatch(loginUser({ social: "google" }));
//   }

//   microsoftLogin() {
//     this.props.dispatch(loginUser({ social: "microsoft" }));
//   }

//   signUp() {
//     this.props.router.push("/register");
//   }

//   showPhoneOtpForm() {
//     this.setState({ showPhoneOtpForm: true });
//   }

//   onOtpSubmit(otp) {
//     // You may need to call an action to verify the OTP
//     // For now, let's assume OTP verification is successful
//     // Redirect user to /account page
//     this.props.router.push("/account");
//   }


//   // showPhoneOtpForm() {
//   //   this.setState({ showPhoneOtpForm: true });
//   // }

//   render() {

//     return (
//       <>
//         <Head>
//           <title>Login | Ecommerce</title>
//           <meta name="viewport" content="initial-scale=1.0, width=device-width" />

// <meta name="description" content="yodigital B2B" />
// <meta name="keywords" content="ecommerce, yodigital" />
// <meta name="author" content="yodigital pvt ltd" />
// <meta charSet="utf-8" />


// <meta property="og:title" content="YoDigital B2B ecommerce portal"/>
// <meta property="og:type" content="website"/>
// <meta property="og:url" content="https://localhost:3000"/>
// <meta property="og:image" content="https://localhost:3000/images/blogs/content_image_six.jpg"/>
// <meta name="twitter:card" content="summary_large_image" />

// <meta property="fb:app_id" content="712557339116053" />

// <meta property="og:site_name" content="yodigital"/>
// <meta name="twitter:site" content="@yodigital" />
//         </Head>
//         <Row className={"no-gutters"} style={{ height: "100vh" }}>
//           <Col
//             xs={12}
//             md={6}
//             className={
//               "d-flex flex-column justify-content-center align-items-center h-100"
//             }
//           >
//             <Container>
//               <Row className={"d-flex justify-content-center"}>
//                 <Col lg={8} xs={"auto"}>
//                   <Link href={"/"}>
//                     <img src={logo} alt={"logo"} style={{ marginBottom: 120 }} />
//                   </Link>
//                   <h5 className={"fw-bold mb-5"}>Login</h5>
//                   {!this.state.showPhoneOtpForm ? (
//                     <Form className={"w-100"} onSubmit={this.doLogin}>
//                     <FormGroup>
//                       <Label for="exampleEmail" className="fw-bold">
//                         Email
//                       </Label>
//                       <Input
//                         type="email"
//                         name="text"
//                         id="exampleEmail"
//                         className="w-100"
//                         placeholder={"Email"}
//                         value={this.state.email}
//                         onChange={this.changeEmail}
//                         required
//                       />
//                     </FormGroup>
//                     <FormGroup className={s.formGroup}>
//                       <Label for="exampleEmail" className="fw-bold">
//                         Password
//                       </Label>
//                       <Input
//                           type={this.state.viewPassword ? 'text' : 'password'}
//                         name="text"
//                         id="exampleEmail"
//                         className="w-100"
//                         placeholder={"Password"}
//                         value={this.state.password}
//                         onChange={this.changePassword}
//                         required
//                       />
//                       <img className={s.viewPassword} src={this.state.viewPassword ? eye : eyeOff} onClick={() => this.setState({ viewPassword: !this.state.viewPassword })} />
//                     </FormGroup>
//                     <div
//                       className={
//                         "d-flex justify-content-between align-items-center mt-5"
//                       }
//                     >
//                       <Button
//                           color={"primary"}
//                           className={`${s.button} fw-bold text-uppercase`}
//                           onClick={this.showPhoneOtpForm} // Change this to show phone OTP form
//                         >
//                           Login
//                         </Button>
//                     </div>
//                   </Form>
//                    ) : (  <div className={`${s.data_otp}`}>
//                     <div>
//                       <p>Enter OTP sent to {this.state.email}</p> {/* Use phoneNumber state */}
//                     </div>
//                     <div>
//                       <PhoneOtpForm onOtpSubmit={this.onOtpSubmit} />
//                     </div>
//                   </div>// Render phone OTP form
//                    )}
//                   <footer className={`d-flex justify-content-between ${s.footer}`}>
//                     <Link href={"#"} className={"fw-bold text-dark"}>
//                       Terms & Conditions
//                     </Link>
//                     <Link href={"#"} className={"fw-bold text-dark"}>
//                       Privacy Policy
//                     </Link>
//                     <Link href={"/forgot"} className={"fw-bold text-dark"}>
//                         Forgot password
//                       </Link>
//                   </footer>
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//           <Col sm={6} className={`d-none d-md-inline-block h-100 ${s.backgroundImage}`} />
//         </Row>
//       </>
//     );
//   }
// }

// export async function getServerSideProps(context) {
//   // const res = await axios.get("/products");
//   // const products = res.data.rows;

//   return {
//     props: {  }, // will be passed to the page component as props
//   };
// }

// function mapStateToProps(state) {
//   return {
//     isFetching: state.auth.isFetching,
//     isAuthenticated: state.auth.isAuthenticated,
//     errorMessage: state.auth.errorMessage,
//   };
// }

// export default withRouter(connect(mapStateToProps)(Login));
