
export const usersFields = {
  id: { type: "id", label: "ID" },
  wishlist: { type: "relation_many", label: "Wishlist" },
  firstName: { type: "string", label: "First Name" },
  lastName: { type: "string", label: "Last Name" },
  phoneNumber: { type: "string", label: "Phone Number" },
  email: { type: "string", label: "E-mail" },
  role: {
    type: "enum",
    label: "Role",

    options: [
      { value: "admin", label: "admin" },

      { value: "user", label: "user" },
    ],
  },
  disabled: { type: "boolean", label: "Disabled" },
  avatar: { type: "images", label: "Avatar" },
  password: { type: "string", label: "Password" },
  emailVerified: { type: "boolean", label: "emailVerified" },
  emailVerificationToken: { type: "string", label: "emailVerificationToken" },
  emailVerificationTokenExpiresAt: {
    type: "datetime",
    label: "emailVerificationTokenExpiresAt",
  },
  passwordResetToken: { type: "string", label: "passwordResetToken" },
  passwordResetTokenExpiresAt: {
    type: "datetime",
    label: "passwordResetTokenExpiresAt",
  },
  provider: { type: "string", label: "provider" },
  bname: { type: "string", label: "bname" },
  baddress: { type: "string", label: "baddress" },
  cin: { type: "string", label: "cin"},
   gst: { type: "string", label: "gst" },
  balance: { type: "string", label: "balance"},
  aadhar: { type: "string", label: "aadhar" },
  aadhar_url: { type: "string", label: "aadhar_url"},
  aadhar_back_url: { type: "string", label: "aadhar_back_url"},
  pan: { type: "string", label: "pan"  },
  pan_url: { type: "string", label: "pan_url"},
  
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
