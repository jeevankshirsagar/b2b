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
          pass: 'Pass@123', // Change this to your email password
        },
      });

      // Send email
      await transporter.sendMail({
        from: 'jeevan@exigirtech.com',
        to: 'jeevan@worldtechsolutions.in', // Change this to the recipient's email address
        subject: 'New B2B Enquiry Form Submission',
        html: `
        <!doctype html>
        <html>
        <head>
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <title>New B2B Enquiry Form Submission</title>
          <style>
            /* Your CSS styles for the email template */
            body {
              background-color: #f2f2f7;
              font-family: sans-serif;
              -webkit-font-smoothing: antialiased;
              font-size: 15px;
              line-height: 1.4;
              margin: 0;
              padding: 0;
            }
            .container {
              display: block;
              margin: 0 auto !important;
              max-width: 580px;
              padding: 10px;
              width: 580px;
            }
            .image{
              width: 100%;
            }
            .content {
              box-sizing: border-box;
              display: block;
              margin: 0 auto;
              max-width: 580px;
              padding: 10px;
            }
            h3 {
              color: #1c1c1e;
              font-family: sans-serif;
              font-weight: 400;
              line-height: 1.5;
              margin: 0;
              margin-bottom: 10px;
            }
            p {
              color: #1c1c1e;
              font-family: sans-serif;
              font-size: 15px;
              font-weight: normal;
              margin: 0;
              margin-bottom: 15px;
            }
            table {
              border-collapse: collapse;
              border-spacing: 0;
              width: 100%;
            }
            table td,
            table th {
              padding: 8px;
              text-align: left;
              vertical-align: top;
            }
          </style>
        </head>
        <body>
          <table class="container">
            <tr>
              <td>
              <img class="image" src="https://discover.zestmoney.in/wp-content/uploads/2021/02/apple-LP-banner-2048x850.png">
                <h1>Customer Information:</h1>
                <table>
                  <tr>
                    <td style="padding-right: 10px;"><strong>Name:</strong></td>
                    <td>${formData.name}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 10px;"><strong>Email:</strong></td>
                    <td>${formData.email}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 10px;"><strong>Contact:</strong></td>
                    <td>${formData.contact}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 10px;"><strong>Business GST:</strong></td>
                    <td>${formData.bgst}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 10px;"><strong>Business Address:</strong></td>
                    <td>${formData.address}</td>
                  </tr>
                  <tr>
                    <td style="padding-right: 10px;"><strong>Business Message:</strong></td>
                    <td>${formData.message}</td>
                  </tr>
                  
                  <hr>
                  <tr>
                  <td>
              A Privacy Policy is a legally required document that discloses your privacy practices, such as what personal information you collect, and how you collect, use and share it.
A Terms and Conditions agreement is not legally required, but highly recommended. It's a document that outlines the rules, requirements and restrictions for using your website, service or app.
A Disclaimer gives a short notice to users to be aware of something, while often disclaiming your legal liability.</td></tr>
                </table>
              </td>
              
            </tr>
          </table>
        </body>
        </html>
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