const { Op } = require("sequelize");
const db = require("../../models");
const inventory = db.Inventory;
const product = db.Product;
const price = db.Price;
const category = db.Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { stockQty, entryDate, BranchId, ProductId, AdminId } = req.body;
      const data = await inventory.create({
        stockQty,
        entryDate,
        BranchId,
        ProductId,
        AdminId,
      });
      res.status(200).json({
        message: "Success added",
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },

  findByBranch: async (req, res) => {
    try {
      const stock = await inventory.findAll({
        attributes: ["stockQty"],
        where: {
          BranchId: req.params.id,
        },
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
        ],
      });
      res.status(200).json({
        message: "Success retrieved",
        stock,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },
};
