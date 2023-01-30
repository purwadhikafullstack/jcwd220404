const db = require("../../models");
const discount = db.Discount;
const voucher = db.Voucher;
const promotion = db.Promotion;

module.exports = {
  createDiscount: async (req, res) => {
    try {
      const { nominal, isActive } = req.body;
      const result = await discount.create({
        nominal,
        isActive: 1,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createVoucherOrder: async (req, res) => {
    try {
      const {} = req.body;
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findDiscount: async (req, res) => {
    try {
        const result = await discount.findAll({
            
        })
    } catch (err) {
        res.status(400).send(err)
    }
  }
};