export const ordersFields = {
  id: { type: "id", label: "ID" },
  order_date: { type: "datetime", label: "Order date" },
  product: { type: "relation_one", label: "Product" },
  user: { type: "relation_one", label: "User" },
  amount: { type: "int", label: "Amount" },
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "interested", label: "interested" },

      { value: "ordered", label: "ordered" },
    ],
  },
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
