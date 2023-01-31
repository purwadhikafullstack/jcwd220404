const { Sequelize } = require("sequelize");
const db = require("../../models");
const product = db.Product;
const price = db.Price;
const address = db.Address;
const user = db.User;
const inventory = db.Inventory;
const branch = db.Branch;
const productCart = db.Product_Cart;
var request = require("request");
const rajaOngkirKey = process.env.RAJA_KEY;
const rajaOngkirURL = process.env.BASE_URL_RAJAONGKIR_COST;

module.exports = {
  createCart: async (req, res) => {
    try {
      const { ProductId, UserId } = req.body;
      if (!UserId) throw `You have to Login First`;
      const data = await productCart.create({
        ProductId,
        UserId,
        qty: 1,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  deleteCart: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await productCart.destroy({
        where: { id },
      });
      res.status(200).send({
        message: "Delete success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateQty: async (req, res) => {
    try {
      const { id, qty } = req.body;
      const response = await productCart.findOne({
        where: [
          {
            UserId: req.params.id,
          },
          {
            id,
          },
        ],

        include: [
          {
            model: product,
            include: [
              {
                model: price,
              },
            ],
          },
        ],
        raw: true,
      });
      console.log(response["Product.Price.productPrice"]);
      const data = await productCart.update(
        {
          qty,
          totalCheckout: qty * response["Product.Price.productPrice"],
          totalWeight: qty * response["Product.weight"],
        },
        {
          where: { id },
        }
      );
      console.log(data);
      res.status(200).send({
        message: "Update success",
        data,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findCartBy: async (req, res) => {
    try {
      const carts = await productCart.findAll({
        where: { UserId: req.params.id },
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
        ],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(400).send(err);
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
      res.status(200).send({
        message: "Update success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findTotal: async (req, res) => {
    try {
      const carts = await productCart.findAll({
        where: [
          { UserId: req.params.id },
          {
            status: 1,
          },
        ],
        attributes: [
          "qty",
          "id",
          [Sequelize.literal(`(qty*Product.Price.productPrice)`), "Total"],
        ],
        include: [
          {
            model: product,
            required: true,
            include: [
              {
                model: price,
                required: true,
                attributes: ["productPrice"],
              },
            ],
            attributes: [],
          },
        ],
        group: "id",
        raw: true,
        subQuery: false,
      });
      res.status(200).send(carts);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
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
        include: [
          {
            model: product,
            include: [{ model: inventory }, { model: price }],
          },
        ],
      });
      res.status(200).send(carts);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalCheckout: async (req, res) => {
    try {
      const response = await productCart.findOne({
        where: {
          UserId: req.params.id,
        },
      });
      const { qty, productPrice, id } = req.body;
      const data = await productCart.update(
        {
          qty,
          productPrice,
        },
        {
          where: { id },
        }
      );
      res.send(200).send(data);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
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
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createCost: async (req, res) => {
    try {
      // const response = await productCart.findOne({
      //   where: [
      //     {
      //       UserId: req.params.id,
      //     },
      //     {
      //       id,
      //     },
      //   ],

      //   include: [
      //     {
      //       model: product,
      //       include: [
      //         {
      //           model: price,
      //         },
      //       ],
      //     },
      //   ],
      //   raw: true,
      // });
      // console.log(response["Product.Price.productPrice"]);
      const { origin, weight, courier, destination } = req.body;
      var options = {
        method: "POST",
        url: rajaOngkirURL,
        headers: {
          key: rajaOngkirKey,
          "content-type": "application/x-www-form-urlencoded",
        },
        form: {
          origin: origin,
          destination: destination,
          weight: weight,
          courier: courier,
        },
      };
      console.log(req.body);

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
        res.status(200).send(JSON.parse(body));
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};