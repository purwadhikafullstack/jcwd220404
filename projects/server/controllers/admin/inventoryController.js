const { Op } = require("sequelize");
const db = require("../../models");
const inventory = db.Inventory;
const product = db.Product;
const price = db.Price;
const branch = db.Branch;
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
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findByBranch: async (req, res) => {
    try {
      const inventories = await inventory.findAll({
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
          {
            model: branch,
            where: {
              longitude: { [Op.between]: [req.params.from, req.params.to] },
            },
          },
        ],
      });
      res.status(200).send(inventories);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
