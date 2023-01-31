const db = require("../../models");
const transaction = db.Transaction;
const transactionDetail = db.Transaction_Detail;
const productCart = db.Product_Cart;
const payment = db.Payment;
const product = db.Product
const price = db.Price
const { Op } = require("sequelize");

module.exports = {
  // createCart: async (req, res) => {
  //   try {
  //     const {
  //       UserId,
  //       status,
  //       qty,
  //       ProductId,
  //       // totalCheckout,
  //       // totalWeight,
  //       BranchId,
  //     } = req.body;
  //     const [transactions, created] = await transaction.findOrCreate({
  //       where: {
  //         [Op.and]: [{ UserId }, { status: 1 }],
  //       },
  //       defaults: {
  //         status: 1,
  //         UserId,
  //       },
  //       raw: true,
  //     });

  //     console.log(transactions.id); // 'sdepold'
  //     console.log(created); // The boolean indicating whether this instance was just created
  //     const transDetail = await transactionDetail.findOne({
  //       where: {
  //         [Op.and]: [{ TransactionId: transactions.id }, { ProductId }],
  //       },
  //     });
  //     // console.log(transDetail.dataValues.id);
  //     if (transDetail) {
  //       await transDetail.update(
  //         {
  //           qty,
  //         },
  //         {
  //           where: {
  //             id: transDetail.dataValues.id,
  //           },
  //         }
  //       );
  //     } else {
  //       await transactionDetail.create({
  //         TransactionId: transactions.id,
  //         qty,
  //         ProductId,
  //         totalCheckout,
  //         totalWeight,
  //         BranchId,
  //       });
  //     }

  //     res.status(200).send("success");
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },

  // checkout: async (req, res) => {
  //   let date = new Date();
  //   date.setDate(date.getDate());
  //   try {
  //     // let year = date.getFullYear();
  //     // const order = await transaction.findAll();
  //     // const no_order = `OF-${year}${order.length + 1}`;

  //     const toCheckout = await transaction.update(
  //       {
  //         status: 2,
  //       },
  //       {
  //         where: {
  //           id: req.params.id,
  //         },
  //       }
  //     );

  // data?.map(async (item) => {
  //   await productCart.destroy({
  //     where: {
  //       id: item.id,
  //     },
  //   });
  // });

  // const {
  //   totalOrder,
  //   totalWeight,
  //   totalCharge,
  //   status,
  //   UserId,
  //   AdminId,
  //   id_order,
  //   data,
  // } = req.body;
  // console.log(req.body);

  // const result = await transaction.create({
  //   totalOrder,
  //   totalWeight,
  //   totalCharge,
  //   status: 1,
  //   UserId,
  //   AdminId,
  //   id_order: no_order,
  // });

  //     res.status(200).send(toCheckout);
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },

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
        TransactionId
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
          // {
          //   model: inventory,
          //   include: [{ model: branch }],
          // },
        ],
      });
      // console.log(data)
      data.map(async (item) => {
        console.log(item.dataValues)
        await transactionDetail.create({
          TransactionId: result.id,
          ProductId: item.dataValues.ProductId,
          id_order: result.id_order,
          totalCheckout: item.dataValues.totalCheckout,
          totalWeight: item.dataValues.totalWeight,
          qty: item.dataValues.qty,
          BranchId: item.dataValues.BranchId
        });
      });

      data.map(async (item) => {
        await productCart.destroy({
          where: {
            id: item.dataValues.id
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
        // include: [{ model: productCategory, include: [{ model: category }] }],
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

  // cartStatus: async (req, res) => {
  //   try {
  //     const user = await productCart.findOne({
  //       where: {
  //         UserId: req.params,
  //       },
  //     });

  //     const { status, id } = req.body;

  //     const data = await productCart.update(
  //       {
  //         status,
  //       },
  //       {
  //         where: { id },
  //       }
  //     );
  //     res.status(200).send({
  //       message: "Update success",
  //       data,
  //     });
  //   } catch (err) {
  //     res.status(400).send(err);
  //   }
  // },

  // updateQty: async (req, res) => {
  //   try {
  //     const { id, qty } = req.body;
  //     const response = await productCart.findOne({
  //       where: [
  //         {
  //           UserId: req.params.id,
  //         },
  //         {
  //           id,
  //         },
  //       ],

  //       include: [
  //         {
  //           model: product,
  //           include: [
  //             {
  //               model: price,
  //             },
  //           ],
  //         },
  //       ],
  //       raw: true,
  //     });
  //     console.log(response["Product.Price.productPrice"]);
  //     const data = await productCart.update(
  //       {
  //         qty,
  //         totalCheckout: qty * response["Product.Price.productPrice"],
  //         totalWeight: qty * response["Product.weight"],
  //       },
  //       {
  //         where: { id },
  //       }
  //     );
  //     console.log(data);
  //     res.status(200).send({
  //       message: "Update success",
  //       data,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     res.status(400).send(err);
  //   }
  // },
};
