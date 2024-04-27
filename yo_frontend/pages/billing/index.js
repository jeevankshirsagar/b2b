import React from "react";
import { Container, Button } from "reactstrap"; // Import Button from reactstrap
import s from "./Billing.module.scss";
// import confirmedAnimation from "../../public/animation/confirmed.json";
// import Lottie from 'lottie-react';
import Link from "next/link";


const Index = () => {
  return (
    <Container className={"mb-5"} style={{ marginTop: 32, textAlign: "center" }}>
      <div className={s.paymentInfo}>
        <div className={`${s.form} mt-4`}>
          <h3 className={"fw-bold mb-0"}>Order Placed Successfully</h3>
          <div style={{ width: 200, height: 200, margin: "0 auto" }}>
            {/* <Lottie
              animationData={confirmedAnimation}
              style={{ height: "100%", width: "100%" }}
            /> */}
          </div>
          <div>
            <p>We Got your order Securely</p>
            <p>We'll contact You As Soon As Possible</p>
          </div>
          <Link href="/shop">
            <a> 
              <Button
                color={"primary"}
                className={`${s.checkOutBtn} text-uppercase mt-auto fw-bold`}
              >
                Shop More
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Index;
