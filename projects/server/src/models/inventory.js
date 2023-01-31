"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventory.belongsTo(models.Admin);
      Inventory.belongsTo(models.Branch);
      Inventory.belongsTo(models.Product);
      // Inventory.hasMany(models.Transaction)
    }
  }
  Inventory.init(
    {
      stockQty: DataTypes.INTEGER,
      entryDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Inventory",
    }
  );
  return Inventory;
};