const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');
const nodemailer = require('nodemailer'); // Add nodemailer library

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class FeedbackDBApi {
  static async createEnquiry(data, currentUser) {
    try {
      const enquiry = await db.enquiry.create({
        enquiry_date: data.enquiry_date || null,
        name: data.name || null,
        contact: data.contact || null,
        email: data.email || null,
        bname: data.bname || null,
        bgst: data.bgst || null,
        address: data.address || null,
        unit: data.unit || null,
        status: data.status || null,
        title: data.title || null,
        whatsapp: data.whatsapp || null,
        message: data.message || null,
      });

      // Send email after successful creation of enquiry
      await FeedbackDBApi.sendEmail(data);

      return enquiry;
    } catch (error) {
      console.error("Error while creating enquiry:", error.message);
      throw error;
    }
  }

  static async sendEmail(formData) {
    try {
      // Create a transporter object using SMTP transport
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com', // Change this to your SMTP server
        port: 465,
        secure: true,
        auth: {
          user: 'jeevan@exigirtech.com', // Change this to your email address
          pass: '', // Change this to your email password
        },
      });

      // Send email
      await transporter.sendMail({
        from: 'jeevan@exigirtech.com',
        to: 'cm.a.55.jeevan.kshirsagar@gmail.com', // Change this to the recipient's email address
        subject: 'New B2B Enquiry Form Submission',
        html: `
            <p>Name: ${formData.name}</p>
            <p>Contact: ${formData.contact}</p>
            <p>Email: ${formData.email}</p>
            <p>Business Name: ${formData.bname}</p>
            <p>Business GST: ${formData.bgst}</p>
            <p>Business Address: ${formData.address}</p>
        `,
    });

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }


  static async update(feedback, data) {
    try {
      if (!feedback) {
        throw new ValidationError('FeedbackNotFound');
      }
  
      await feedback.update({
        status: data.status
      });
  
      return feedback;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || {id: null};
    const transaction = (options && options.transaction) || undefined;

    const feedback = await db.feedback.findByPk(id, options);

    await feedback.update({
      deletedBy: currentUser.id
    }, {
      transaction,
    });

    await feedback.destroy({
      transaction
    });

    return feedback;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;
  
    try {
      const feedback = await db.enquiry.findOne(
        { where },
        { transaction }
      );
  
      if (!feedback) {
        return null; 
      }
  
      const output = feedback.get({ plain: true });
  
      // output.product = await feedback.getProduct({
      //   transaction,
      // });
  
      // output.user = await feedback.getUser({
      //   transaction,
      // });
  
      // output.payment = await feedback.getPayment({
      //   transaction,
      // });
  
      // output.image = await feedback.getImage({
      //   transaction,
      // });
  
      return output;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  static async update(data, id, currentUser) {
    try {
      let feedback = await FeedbackDBApi.findBy({ id });
  
      if (!feedback) {
        throw new ValidationError('FeedbackNotFound');
      }
  
      
      await FeedbackDBApi.update({ status: data.status, updatedById: currentUser.id }, { where: { id } });
  
      return feedback;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  static async findAll(queryParams) {
    try {
      const feedbackList = await db.enquiry.findAll({
        where: queryParams, // Use the provided query parameters to filter the results
      });

      return feedbackList;
    } catch (error) {
      throw new Error(`Error in findAll: ${error.message}`);
    }
  }
  

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike(
            'feedback',
            'product',
            query,
          ),
        ],
      };
    }

    const records = await db.feedback.findAll({
      attributes: [ 'id', 'product' ],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['product', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.product,
    }));
  }


};