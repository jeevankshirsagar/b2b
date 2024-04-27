
const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const orders = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_date: {
        type: DataTypes.DATE,
      
      },
      amount: {
        type: DataTypes.INTEGER,
      
      },
      status: {
        type: DataTypes.ENUM,
      
        values: [
          "ordered",
          "intransit",
          "delivered"
        ],

      },

    order_no: {
      type: DataTypes.STRING,

    },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );





  orders.beforeCreate(async (order) => {
    try {
      // Find the latest order number
      const latestOrder = await orders.findOne({
        order: [['createdAt', 'DESC']]
      });

      let orderNo = '#YD100'; // Default starting order number
      if (latestOrder && latestOrder.order_no) {
        // Extract the numeric part of the latest order number and increment it
        const latestOrderNo = parseInt(latestOrder.order_no.slice(3)); // Remove '#YD' and parse to integer
        orderNo = '#YD' + (latestOrderNo + 1); // Increment and concatenate with '#YD'
      }

      // Assign the generated order number to the new order
      order.order_no = orderNo;
    } catch (error) {
      console.error('Error generating order number:', error);
      // Handle error if any
    }
  });




  orders.associate = (db) => {

    db.orders.belongsTo(db.products, {
      as: 'product',
      constraints: false,
    });

    db.orders.belongsTo(db.users, {
      as: 'user',
      constraints: false,
    });

    db.orders.belongsTo(db.payments, {
      as: 'payment',
      constraints: false,
    });


    db.orders.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.orders.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };



  return orders;
};