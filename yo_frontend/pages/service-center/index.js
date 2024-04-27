import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "./ServiceCenters.module.scss";

const brandToAreasMap = {
  apple: ["Andheri", "Bandra", "Colaba","Vashi","Panvel"],
  samsung: ["Powai", "Goregaon", "Malad","Vashi","Panvel","Thane"]
};

const Index = () => {
  const router = useRouter();
  const { brand: queryBrand, area: queryArea } = router.query;

  const [brand, setBrand] = useState(queryBrand || 'Choose Brand');
  const [area, setArea] = useState(queryArea || 'Choose Area');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [mapURL, setMapURL] = useState('');

  const [error, setError] = useState('');

  function generateMapURL(brand, area) {
    const apiKey = 'AIzaSyBJvu_OJZWC5_ufsXiEcyM9-bX_EXUwgQ8'; // Replace with your Google Maps API key
    // Construct the URL with both brand and area
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${brand}+${area}`;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (brand === 'Choose Brand' || area === 'Choose Area') {
      setError('Please select both brand and area.');
      return;
    }
    setError('');
    setSelectedBrand(brand);
    setSelectedArea(area);
    const newMapURL = generateMapURL(brand, area); // Use the function to generate the map URL
    setMapURL(newMapURL);
    router.push({
      query: { brand, area }
    });
  }

  return (
    <>
<Head>
  <title>Search Service Centers</title>
  {/* Any other meta tags you want to include */}
</Head>
      <div className="service__centers" style={{ marginTop: 80, marginBottom: 80 }}>
        <Container>
          <h3 className={"text-center fw-bold mb-5"}>Search Service Centers</h3>
          <Row>
            <Col sm={12} lg={8} className="mx-auto">
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <div className={`${styles.sc__choose_dropdown}`}>
                      <select
                        onChange={(e) => {
                          setBrand(e.target.value);
                          setArea('Choose Area'); // Reset area when brand changes
                        }}
                        value={brand}
                        className="w-100" 
                      >
                        <option value="choose">Choose Brand</option>
                        <option value="apple">Apple</option>
                        <option value="samsung">Samsung</option>
                        <option value="samsung">Oppo</option>
                        <option value="samsung">Panasonic</option>
                        <option value="samsung">Boat</option>
                        <option value="samsung">Vivo</option>
                        <option value="samsung">motorola</option>
                      </select>
                    </div>
                  </Col>

                  <Col sm={6} className="mt-4 mt-sm-0">
                    <div className={   `${styles.sc__choose_dropdown}`}>
                      <select
                        onChange={(e) => setArea(e.target.value)}
                        value={area}
                        className="w-100"
                        disabled={brand === 'Choose Brand'}
                      >
                        <option value="choose">Choose Area</option>
                        {brand !== 'Choose Brand' && brandToAreasMap[brand] && brandToAreasMap[brand].map(area => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </select>
                    </div>
                  </Col>
                </Row>
                {error && <p className="text-danger">{error}</p>}
                   
                <Col sm={6} className="mt-4 mt-sm-0">
                  <div className="ssd">
                    <div className="button-wrapper"> {/* Separate div around the button */}
                      <button 
                      type="submit" 
                      className="btn btn-primary" 
                      style={{ 
                      borderRadius: '12px',
                      marginLeft: '740px',
                      marginTop: '-70px'
                      }}
                      >
                        Submit
                     </button>
                    </div>
                  </div>
                </Col>



              </form>
            </Col>
            <Col sm={12} style={{ marginTop: 60 }}>
              <div className={`${styles.service__center_frame}`}>
                {selectedArea && (
                  <p>Selected Area: {selectedArea}</p>
                )}
                {selectedBrand && selectedArea && ( // Check if both brand and area are selected
                  <iframe 
                    src={mapURL}
                    width="800" 
                    height="600" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  // Fetch data if needed
  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default Index;