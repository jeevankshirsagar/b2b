import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Head from "next/head";
import terms from '../../public/images/e-commerce/alert.jpeg';  
// import UseAnimations from "react-useanimations";
// import github from 'react-useanimations/lib/github';


const Index = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Initial width on component mount
    setWidth(window.innerWidth);

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
        {/* Add your meta tags here */}
      </Head>
      <Container fluid className="align-middle"  style={{  height: '100%' }}>
      <Row>
        {/* Column for the heading */}
        <Col md={6} style={{backgroundColor: '#fff6e3',}}>
          <h2 className="fw-bold align">Terms & Conditions</h2>
        </Col>
        {/* Column for the image */}
        <Col md={6} className="d-none d-md-block" style={{ position: 'relative' }}>
          {/* Overlay gradient */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(71deg, rgba(255,246,227,1) 2%, rgba(212,255,215,0) 100%)', zIndex: 1 }} />
          {/* Image as background */}
          <div style={{ backgroundImage: `url(${terms})`, backgroundSize: 'cover', backgroundPosition: 'right', width: '100%', height: '100px' }} />
        </Col>
      </Row>
    </Container>
      <Container fluid className={"mb-sm-5 "}>
        <Row>
          {/* Index Section */}
          <Col sm={2} className="d-none d-sm-block " style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '12px', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', height: "auto" }}>

            <div className="index ">
              <dvi className="d-flex">
              <h2 className="font-weight-normal">Index</h2>
              {/* <UseAnimations animation={github} size={30} /> */}
              </dvi>

              <ol>
                <li><a href="#OUR-SERVICES">Our Services</a></li>
                <li><a href="#INTELLECTUAL-PROPERTY-RIGHTS">Interllectual Property Right</a></li>
                <li><a href="#USER-REPRESENTATIONS">User Representations</a></li>
                <li><a href="#PRODUCTS">Products</a></li>
                <li><a href="#PURCHASES-AND-PAYMENT">Purchase and Payments</a></li>
                <li><a href="#RETURN-POLICY">Return Policy</a></li>
                <li><a href="#PROHIBITED-ACTIVITIES">Prohibited Activities</a></li>
                <li><a href="#USER-GENERATED-CONTRIBUTIONS">User Gnerated Contribution</a></li>
                <li><a href="#CONTRIBUTION-LICENSE">Contribution LICENSE</a></li>
                <li><a href="#SERVICES-MANAGEMENT">Service Agreement</a></li>
                <li><a href="#PRIVACY-POLICY">Privacy Policy</a></li>
                <li><a href="#TERM-AND-TERMINATION">Term and Terminations</a></li>
                <li><a href="#MODIFICATIONS-AND-INTERRUPTIONS">Modifications and Interruptions</a></li>
                <li><a href="#GOVERNING-LAW">Governing Law</a></li>
                <li><a href="#DISPUTE-RESOLUTION">Dispute Resolutions</a></li>
                <li><a href="#CORRECTIONS">Corrections</a></li>
                <li><a href="#DISCLAIMER">Discalimer</a></li>
                <li><a href="#LIMITATIONS-OF-LIABILITY">Limitations of Liability</a></li>
                <li><a href="#INDEMNIFICATION">Indemnification</a></li>
                <li><a href="#USER-DATA">User data</a></li>
                <li><a href="#CONTACT-US">Contact Us</a></li>
              </ol>
            </div>
          </Col> 
          {/* Products Section */}
          <Col sm={width <= 768 ? 12 : 9} className="mt-sm-8 ml-3" style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '12px', boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', height: "auto" }}>
            {/* Stages */}
            <div id="stage-1" className="stage">
              <h2 style={{fontSize:'20px'}}>Introduction</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor magna at elit malesuada, sed fringilla dolor aliquet. Integer aliquet velit sed justo vehicula, at varius urna scelerisque. Nullam vestibulum erat a tellus blandit, ac commodo purus fermentum. Donec auctor neque a lacus feugiat, ut commodo purus luctus. Sed bibendum sollicitudin eros, non ullamcorper nisi convallis vel. Ut eu risus malesuada, interdum arcu et, rutrum leo.</p>
            </div>
            <div id="stage-2" className="stage" >
              <h2 style={{fontSize:'20px'}}>User Agreement</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor magna at elit malesuada, sed fringilla dolor aliquet. Integer aliquet velit sed justo vehicula, at varius urna scelerisque. Nullam vestibulum erat a tellus blandit, ac commodo purus fermentum. Donec auctor neque a lacus feugiat, ut commodo purus luctus. Sed bibendum sollicitudin eros, non ullamcorper nisi convallis vel. Ut eu risus malesuada, interdum arcu et, rutrum leo.</p>
            </div>
            <div id="stage-3" className="stage">
              <h2 style={{fontSize:'20px'}}>Privacy Policy</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor magna at elit malesuada, sed fringilla dolor aliquet. Integer aliquet velit sed justo vehicula, at varius urna scelerisque. Nullam vestibulum erat a tellus blandit, ac commodo purus fermentum. Donec auctor neque a lacus feugiat, ut commodo purus luctus. Sed bibendum sollicitudin eros, non ullamcorper nisi convallis vel. Ut eu risus malesuada, interdum arcu et, rutrum leo.</p>
            </div>
            {/* Add more stages with dummy content */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
