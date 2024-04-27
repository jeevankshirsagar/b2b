export const feedbackFields = {
  id: { type: "id", label: "ID" },
  image: { type: "images", label: "Image" },
  enquiry_date: { type: "date", label: "Enquire date" },

name: { type: 'string', label: 'Name',

  },
  contact: { type: 'string', label: 'Contact',

  },
  email: { type: 'string', label: 'email',

  },
  bname:{type:'string', label:'Business Name'},
  whatsapp: { type: 'string', label: 'Whatsapp'},
  bgst:{type:'string', label:'Business GST'},
  address:{type:'string', label:'Business Address'},
  unit:{type:'string', label:'Unit'},
  status:{type:'string', label:'Status'},
  message: {type: 'string', label: 'Message'},
  title: { type: "string", label: "Product Name" },
  };



const Component = () => {
  return null
}

export async function getServerSideProps(context) {
  // const res = await axios.get("/products");
  // const products = res.data.rows;

  return {
    props: {  }, // will be passed to the page component as props
  };
}

export default Component