const { json } = require("body-parser");
const { Op } = require("sequelize");
const db = require("../models");
const address = db.address;
const rajaOngkirKey = process.env.RAJA_KEY;
const openCageKey = process.env.GEO_KEY;

module.exports = {
  addressById: async (req, res) => {
    try {
      const { receiverName = "", addressLine = "" } = req.query;
      if (receiverName || addressLine) {
        const res = await address.findAll({
          where: {
            UserId: req.user.id,
            [Op.or]: {
              receiverName: {
                [Op.like]: `%${receiverName}%`,
              },
              addressLine: {
                [Op.like]: `${addressLine}%`,
              },
            },
          },
          order: [["is_default", "DESC"]],
        });
        return res.status(200).json({
          message: "Get user Address by name and full Address",
          data: res,
        });
      }
      const response = await address.findAll({
        where: {
          UserId: req.user.id,
        },
        order: [["is_default", "DESC"]],
      });
      return res.status(200).send(
        json({
          message: "Get User Address",
          data: response,
        })
      );
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  newAddress: async (req, res) => {
    try {
      const { receiverName, receiverPhone, addressLine } = req.body;
    } catch {}
  },
};
