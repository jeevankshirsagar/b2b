// pages/products/productFields.js

import React from 'react';

const ProductFieldsPage = () => {
  const productFields = {
    id: { type: "id", label: "ID" },
    image: { type: "images", label: "Image" },
    enquiry_date: { type: "date", label: "Enquire date" },
    name: { type: 'string', label: 'Name' },
    contact: { type: 'string', label: 'Contact' },
    email: { type: 'string', label: 'Email' },
    bname: { type: 'string', label: 'Business Name' },
    bgst: { type: 'string', label: 'Business GST' },
    address: { type: 'string', label: 'Business Address' },
    unit: { type: 'string', label: 'Unit' },
    dp: { type: 'string', label: 'Distributor Price'},
    status: { type: 'string', label: 'Status' },
    title: { type: "string", label: "Product Name" },
  };

  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
};

export default ProductFieldsPage;
