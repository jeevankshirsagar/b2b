const SettingsDBApi = require("../db/api/settings");

// Create or update a setting in the database
const createOrUpdateSetting = async (text, description) => {
  await SettingsDBApi.upsertSetting(text, description);
};

const getAllSettings = async () => {
  return await SettingsDBApi.getAllSettings();
};

// Update a setting by ID
const updateSettingById = async (id, text, description) => {
    await SettingsDBApi.updateSettingById(id, text, description);
  };
  
  // Delete a setting by ID
  const deleteSettingById = async (id) => {
    await SettingsDBApi.deleteSettingById(id);
  };

module.exports = {
  createOrUpdateSetting,
  getAllSettings,
  updateSettingById,
  deleteSettingById
};
