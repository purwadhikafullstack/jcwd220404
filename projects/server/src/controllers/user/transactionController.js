const db = require("../../models");
const transaction = db.Transaction;
const transactionDetail = db.Transaction_Detail;
const productCart = db.Product_Cart;
const payment = db.Payment;
const product = db.Product;
const price = db.Price;
const { Op } = require("sequelize");

module.exports = {
  create: async (req, res) => {
    let date = new Date();
    date.setDate(date.getDate());
    try {
      let year = date.getFullYear();
      const order = await transaction.findAll();
      const no_order = `OF-${year}${order.length + 1}`;

      const {
        totalOrder,
        totalWeight,
        totalCharge,
        status,
        UserId,
        AdminId,
        id_order,
        ProductId,
        totalCheckout,
        qty,
        BranchId,
        TransactionId,
      } = req.body;
      console.log(req.body);
      const result = await transaction.create({
        totalOrder,
        totalWeight,
        totalCharge,
        status: 1,
        UserId,
        AdminId,
        id_order: no_order,
      });
      const data = await productCart.findAll({
        where: [
          { UserId: req.params.id },
          {
            status: 1,
          },
        ],
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
        ],
      });

      data.map(async (item) => {
        console.log(item.dataValues);
        await transactionDetail.create({
          TransactionId: result.id,
          ProductId: item.dataValues.ProductId,
          id_order: result.id_order,
          totalCheckout: item.dataValues.totalCheckout,
          totalWeight: item.dataValues.totalWeight,
          qty: item.dataValues.qty,
          BranchId: item.dataValues.BranchId,
        });
      });

      data.map(async (item) => {
        await productCart.destroy({
          where: {
            id: item.dataValues.id,
          },
        });
      });

      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findAllById: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          UserId: req.params.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findById: async (req, res) => {
    try {
      const transactions = await transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findProductById: async (req, res) => {
    try {
      const transactions = await transactionDetail.findAll({
        where: {
          TransactionId: req.params.id,
        },
        include: [{ model: product, include: [{ model: price }] }],
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);
      await transaction.update(
        {
          picture: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await transaction.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.picture,
      });
      await transaction.update(
        {
          where: {
            status: 1,
          },
        },
        {
          status: 2,
        }
      );
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findCancelled: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          status: 0,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  findWaitingPayment: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          status: 1,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findConfirmPayment: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          status: 2,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findOnProcess: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          status: 3,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findDelivery: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          status: 4,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findDone: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          status: 5,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
