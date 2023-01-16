const db = require("../../models");
const product = db.Prouct;
const user = db.User;
const cart = db.Cart;
const productCart = db.Product_Cart;

module.exports = {
  createCart: async (req, res) => {
    try {
      const { ProductId, UserId } = req.body;
      if (!UserId) throw `You have to Login First`;
      const data = await productCart.create({
        ProductId,
        UserId,
      });
      res.status(200).json({
        message: "Cart created",
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await productCart.destroy({
        where: { id },
      });
      res.status(200).json({
        message: "Delete success",
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },

  updateQty: async (req, res) => {
    try {
      const { id, qty } = req.body;
      const data = await productCart.update(
        {
          qty,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: "Update success",
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const { id } = await cart.findAll({
        where: {
          UserId: req.params.id,
        },
        raw: true,
      });
      res.status(200).json({
        message: "Data retrieved",
        carts,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },
};
