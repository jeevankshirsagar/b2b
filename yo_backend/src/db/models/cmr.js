const config = require("../../config");
const providers = config.providers;
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const cmr = sequelize.define(
    "cmr",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      offertext: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING, 
     
    },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  // Uncomment and correct the association name from enquiry to db.enquiry if needed
  /*
  enquiry.associate = (db) => {
    // Your associations here
  };
  */

  return cmr;
};
