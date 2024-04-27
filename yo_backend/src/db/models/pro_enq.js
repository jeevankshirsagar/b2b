const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const pro_enq = sequelize.define(
    'pro_enq',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      enquiry_date: {
        type: DataTypes.DATE,
      },
      name: {
        type: DataTypes.STRING,
      },
      contact: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      bname: {
        type: DataTypes.STRING,
      },
      bgst: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      status:{
        type: DataTypes.BOOLEAN,
      },
      title:{
        type: DataTypes.STRING,
      }

    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  

  // Uncomment and correct the association name from enquiry to db.enquiry if needed
  /*
  enquiry.associate = (db) => {
    // Your associations here
  };
  */

  return pro_enq;
};