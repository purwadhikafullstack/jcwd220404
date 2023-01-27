const db = require("../../models");
const discount = db.Discount;
const voucher = db.Voucher;
const promotion = db.Promotion;

module.exports = {
  createDiscount: async (req, res) => {
    try {
      const { nominal, isActive, ProductId } = req.body;
      const result = await discount.create({
        nominal,
        isActive: 1,
        ProductId,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createVoucherOrder: async (req, res) => {
    try {
        const {} = req.body
    } catch (err) {
        res.status(400).send(err)
    }
  }
};
