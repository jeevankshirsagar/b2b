import React from 'react';
import preloaderImg from 'public/images/e-commerce/preloader.gif';

const FullScreenLoader = () => {
  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <img src={preloaderImg} alt="Loading..." />
    </div>
  );
};

export default FullScreenLoader;
