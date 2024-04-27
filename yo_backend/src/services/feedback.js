const db = require('../db/models');
const FeedbackDBApi = require('../db/api/feedback');

module.exports = class FeedbackService {
  static async createEnquiry(data, currentUser) {
    try {
      const enquiry = await FeedbackDBApi.createEnquiry(data, currentUser);
      return enquiry;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  static async update(id, data) {
    try {
        const feedbackInstance = await FeedbackDBApi.findBy({ id });
        
        if (!feedbackInstance) {
            throw new ValidationError('FeedbackNotFound');
        }

        await feedbackInstance.update({
            status: data.status
        });

        return feedbackInstance;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError(
          'errors.forbidden.message',
        );
      }

      await FeedbackDBApi.remove(
        id,
        {
          currentUser,
          transaction,
        },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};