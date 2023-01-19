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
      res.status(200).send({
        message: "Success added",
        data: data,
      });
    } catch (err) {
      res.status(400).send({
        message: "Process Error",
        data: err,
      });
    }
  },

  findByBranch: async (req, res) => {
    try {
      const inventories = await inventory.findAll({
        // attributes: ["stockQty"],
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
      res.status(200).send({
        message: "Success retrieved",
        data: inventories,
      });
    } catch (err) {
      res.status(400).send({
        message: "Process Error",
        data: err,
      });
    }
  },
};
