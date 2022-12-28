const { Op } = require("sequelize");
const db = require("../models");
const address = db.Address;
const rajaOngkirKey = process.env.RAJA_KEY;
const openCageKey = process.env.GEO_KEY;

module.exports = {
  mainAddress: async (req, res) => {
    try {
      const response = await address.findOne({
        where: {
          UserId: req.user.id,
          defaultAddress: true,
        },
      });
      res.status(200).json({
        message: "Get main address",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  allAddress: async (req, res) => {
    try {
      const { receiverName = "", detail = "" } = req.query;
      if (receiverName || detail) {
        const response = await address.findAll({
          where: {
            UserId: req.user.id,
            [Op.or]: {
              receiverName: {
                [Op.like]: `%${receiverName}%`,
              },
              detail: {
                [Op.like]: `%${detail}%`,
              },
            },
          },
          order: [["detail", "DESC"]],
        });
        res.status(200).json({
          message: "Get user address by name and full address",
          data: response,
        });
      }
      const response = await address.findAll({
        where: {
          UserId: req.user.id,
        },
        order: [["detail", "DESC"]],
      });
      res.status(200).json({
        message: "Get all address",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  newAddress: async (req, res) => {
    try {
      const {
        receiverName,
        receiverPhone,
        addressLine,
        city,
        province,
        postalCode,
        detail,
        district,
      } = req.body;
      const provinceAndCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );
      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${district},${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;

      const findAddress = await address.findOne({
        where: {
          UserId: req.user.id,
        },
      });

      if (!findAddress) {
        const response = await address.create({
          receiverName,
          receiverPhone,
          addressLine,
          provinceId: province,
          province: provinceName,
          cityID: city,
          city: cityNameAndType,
          postalCode,
          detail,
          district,
          lattitude,
          longitude,
          defaultAddress: true,
          UserId: req.user.id,
        });
        res.status(200).json({
          message: "New address",
          data: response,
        });
      }
      const response = await address.create({
        receiverName,
        receiverPhone,
        addressLine,
        provinceId: province,
        province: provinceName,
        cityID: city,
        city: cityNameAndType,
        postalCode,
        detail,
        district,
        lattitude,
        longitude,
        defaultAddress: true,
        UserId: req.user.id,
      });
      res.status(200).json({
        message: "New address",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
