const db = require('../db/models/pro_enq');
const ProDBApi = require('../db/api/prod_enq');

module.exports = class FeedbackService {
  static async createEnquiry(data, currentUser) {
    try {
      const enquiry = await ProDBApi.createEnquiry(data, currentUser);
      return enquiry;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}