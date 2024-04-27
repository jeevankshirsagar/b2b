// models/Setting.js

module.exports = (sequelize, DataTypes) => {
  const Setting = sequelize.define("Setting", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    offertext: {
      type: DataTypes.STRING,
    },
    description:{
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
    paranoid: true,
  });

  return Setting;
};
