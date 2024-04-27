const db = require('../models');
const FileDBApi = require('./file');
// const crypto = require('crypto');
// const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ProDBApi {
  static async createEnquiry(data, currentUser) {
    try {
      const enquiry = await db.pro_enq.create({
        enquiry_date: data.enquiry_date || null,
        name: data.name || null,
        contact: data.contact || null,
        email: data.email || null,
        bname: data.bname || null,
        bgst: data.bgst || null,
        address: data.address || null,
        unit: data.unit || null,
        status: data.status || null,
     title : data.title || null,
      });

      return enquiry;
    } catch (error) {
      console.error("Error while creating enquiry:", error.message);
      throw error;
    }
  }

}