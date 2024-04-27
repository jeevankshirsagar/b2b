const ordersFields = {
  id: { type: "id", label: "ID" },
  order_date: { type: "datetime", label: "Order date" },
  product: { type: "relation_one", label: "Product" },
  user: { type: "relation_one", label: "User" },
  amount: { type: "int", label: "Amount" },
  order_no: { type: "string", label: "order No"},
  status: {
    type: "enum",
    label: "Status",

    options: [
      { value: "ordered", label: "Ordered" },

      { value: "delivered", label: "Delivered" },
    ],
  },
};

export default ordersFields;
