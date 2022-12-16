"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Branch);
      Admin.hasMany(models.Inventory);
      Admin.hasMany(models.Price);
      Admin.hasMany(models.Transaction);
    }
  }
  Admin.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      isSuper: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
