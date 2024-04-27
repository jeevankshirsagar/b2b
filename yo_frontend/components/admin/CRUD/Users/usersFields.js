const usersFields = {
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
  bname: { type: "string", label: "Business Name" },
  baddress: { type: "string", label: "Business Address" },
  cin: { type: "string", label: "cin"},
  gst: { type: "string", label: "GST" },
  balance: { type: "string", label: "balance" },
  duedate: { type: "datetime", label: "duedate" },
  aadhar: { type: "string", label: "Aadhar Number" },
  aadhar_url: { type: "image", label: "Aadhar Front" },
  aadhar_back_url: { type: "image", label: "Aadhar Back" },
  pan: { type: "string", label: "pan" },
  pan_url: { type: "image", label: "PAN" },
  
  
  
};

export default usersFields;
