const db = require("../../models");
const product = db.Product;
const price = db.Price;
const address = db.Address;
const user = db.User;
const branch = db.Branch;
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
      const user = await productCart.findOne({
        where: {
          UserId: req.params,
        },
      });
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
        user,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process Error",
        err,
      });
    }
  },

  findCartBy: async (req, res) => {
    try {
      const carts = await productCart.findAll({
        where: { UserId: req.params.id },
        attributes: ["ProductId", "id"],
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
        ],
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

  cartStatus: async (req, res) => {
    try {
      const user = await productCart.findOne({
        where: {
          UserId: req.params,
        },
      });

      const { status, id } = req.body;
      const data = await productCart.update(
        {
          status,
        },
        {
          where: { id },
        }
      );
      res.status(200).json({
        message: "Update success",
        user,
        data,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process error",
        err,
      });
    }
  },

  findCheckout: async (req, res) => {
    try {
      const carts = await productCart.findAll({
        where: [
          { UserId: req.params.id },
          {
            status: 1,
          },
        ],
        attributes: ["ProductId", "id", "status", "qty"],
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
        ],
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

  totalCheckout: async (req, res) => {
    try {
      const { qty, price } = req.body;
      const res = await productCart.update({
        weight: req.product.weight,
        where: {
          UserId: req.params.id,
        },
      });
    } catch (err) {
      res.status(400).json({
        message: "Process error",
      });
    }
  },

  findData: async (req, res) => {
    try {
      const response = await address.findOne({
        where: {
          UserId: req.params.id,
          defaultAddress: 1,
        },
        attributes: ["cityId", "city"],
        include: [
          {
            model: branch,
          },
        ],
      });
      res.status(200).json({
        message: "Data retrieved",
        response,
      });
    } catch (err) {
      res.status(400).json({
        message: "Process error",
      });
    }
  },

  createCost: async (req, res) => {
    try {
      const { cityId, weight, courier } = req.body;
      const generateCost = await axios.post(
        `https://api.rajaongkir.com/starter/cost`
      );
      const cost = await productCart.update({
        origin: cityId,
        destination: cityId,
        weight: weight,
        courier: courier,
      });
      res.status(200).json({
        message: "Get Success",
        generateCost,
        cost,
      });
    } catch (err) {
      res.status(400).json({
        message: `Process error`,
        err,
      });
    }
  },
};
