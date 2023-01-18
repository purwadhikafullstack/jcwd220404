"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Admin);
      // Transaction.belongsTo(models.Branch);
      Transaction.belongsTo(models.Inventory);
      Transaction.belongsTo(models.Payment);
      Transaction.hasOne(models.Transaction_Detail);
      Transaction.hasMany(models.Voucher);
      Transaction.hasMany(models.Notification);
    }
  }
  Transaction.init(
    {
      isVoucher: DataTypes.BOOLEAN,
      status: DataTypes.BOOLEAN,
      totalCharge: DataTypes.INTEGER,
      totalOrder: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
