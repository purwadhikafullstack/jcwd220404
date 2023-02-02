const db = require("../../models");
const transaction = db.Transaction;
const transactionDetail = db.Transaction_Detail;
const productCart = db.Product_Cart;
const payment = db.Payment;
const product = db.Product;
const price = db.Price;
const branch = db.Branch;
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
        BranchId,
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
      const toFalse = await transaction.update(
        {
          status: false,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toTwo = await transaction.update(
        {
          status: 2,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.picture,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findCancelled: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      console.log(findBranch);
      const transactions = await transaction.findAll({
        where: {
          status: 0,
          BranchId: findBranch?.dataValues?.id,
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
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      console.log(findBranch);
      const transactions = await transaction.findAll({
        where: {
          status: 1,
          BranchId: findBranch?.dataValues?.id,
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
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      console.log(findBranch);
      const transactions = await transaction.findAll({
        where: {
          status: 2,
          BranchId: findBranch?.dataValues?.id,
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
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      console.log(findBranch);
      const transactions = await transaction.findAll({
        where: {
          status: 3,
          BranchId: findBranch?.dataValues?.id,
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
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      console.log(findBranch);
      const transactions = await transaction.findAll({
        where: {
          status: 4,
          BranchId: findBranch?.dataValues?.id,
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
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      console.log(findBranch);
      const transactions = await transaction.findAll({
        where: {
          status: 5,
          BranchId: findBranch?.dataValues?.id,
        },
      });
      console.log(transactions);
      res.status(200).send(transactions);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  setProcess: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: false,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toThree = await transaction.update(
        {
          status: 3,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Order Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  setDelivery: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: false,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toFour = await transaction.update(
        {
          status: 4,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Delivery Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  setDone: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: false,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toFour = await transaction.update(
        {
          status: 5,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Done Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  setCancelled: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: false,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      res.status(200).send("Set Cancelled Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findSalesDepok: async (req, res) => {
    try {
      const salesDepok = await transaction.findAll({
        where: {
          BranchId: 1,
        },
      });
      res.status(200).send(salesDepok);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findSalesJaksel: async (req, res) => {
    try {
      const salesJaksel = await transaction.findAll({
        where: {
          BranchId: 2,
        },
      });
      res.status(200).send(salesJaksel);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findSalesJaktim: async (req, res) => {
    try {
      const salesJaktim = await transaction.findAll({
        where: {
          BranchId: 3,
        },
      });
      res.status(200).send(salesJaktim);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};