const db = require("../models");

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

const Setting = db.Setting;

// Create or update a setting in the database
const upsertSetting = async (offertext, description) => {
    try {
        const setting = await Setting.create({ offertext, description });
        return setting;
    } catch (error) {
        console.error("Error upserting setting:", error);
        throw new Error("Internal Server Error");
    }
};

const getAllSettings = async () => {
    try {
        const settings = await Setting.findAll({});
        return settings;
    } catch (error) {
        console.error("Error fetching settings:", error);
        throw new Error("Internal Server Error");
    }
};


// Update a setting by ID
const updateSettingById = async (id, offertext, description) => {
    try {
      const setting = await Setting.findByPk(id);
      if (!setting) {
        throw new Error("Setting not found");
      }
      setting.offertext = offertext;
      setting.description = description;
      await setting.save();
    } catch (error) {
      console.error("Error updating setting:", error);
      throw new Error("Internal Server Error");
    }
  };
  
  // Delete a setting by ID
  const deleteSettingById = async (id) => {
    try {
      const setting = await Setting.findByPk(id);
      if (!setting) {
        throw new Error("Setting not found");
      }
      await setting.destroy();
    } catch (error) {
      console.error("Error deleting setting:", error);
      throw new Error("Internal Server Error");
    }
  };


module.exports = {
    upsertSetting,
    getAllSettings,
    updateSettingById,
    deleteSettingById
};
