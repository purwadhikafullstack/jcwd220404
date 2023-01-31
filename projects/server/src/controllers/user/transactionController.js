const db = require("../../models");
const transaction = db.Transaction;
const transactionDetail = db.Transaction_Detail;
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
          status: 4
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
          status: 5
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
