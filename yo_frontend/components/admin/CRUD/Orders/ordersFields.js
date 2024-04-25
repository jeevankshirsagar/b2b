const ordersFields = {
  id: { type: "id", label: "ID" },
  order_date: { type: "datetime", label: "Order date" },
  product: { type: "relation_one", label: "Product" },
  user: { type: "relation_one", label: "User" },
  amount: { type: "int", label: "Amount" },
  order_no: { type: "string", label: "order No" },
  dp: { type: "string", label: "dp" },
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "interested", label: "interested" },

      { value: "ordered", label: "ordered" },
    ],
  },
};

export default ordersFields;
