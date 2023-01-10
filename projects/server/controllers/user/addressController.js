const { Op } = require("sequelize");
const axios = require("axios");
const db = require("../../models");
const address = db.Address;
const user = db.User;
const rajaOngkirKey = process.env.RAJA_KEY;
const openCageKey = process.env.GEO_KEY;

module.exports = {
  addressById: async (req, res) => {
    try {
      const response = await address.findAll({
        where: {
          UserId: req.params.id,
        },
        order: [["defaultAddress", "DESC"]],
      });
      return res.status(200).send({
        message: "Get User Address",
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

      const response = await address.create({
        receiverName,
        receiverPhone,
        addressLine,
        provinceId: province,
        province: provinceName,
        cityId: city,
        city: cityNameAndType,
        postalCode,
        detail,
        district,
        lattitude,
        longitude,
        defaultAddress: true,
        UserId: req.params.id,
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

  updateAddress: async (req, res) => {
    try {
      const {
        receiverName,
        receiverPhone,
        addressLine,
        province,
        city,
        postalCode,
        detail,
        district,
      } = req.body;
      const { id } = req.params;
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
      await address.update(
        {
          receiverName,
          receiverPhone,
          addressLine,
          provinceId: province,
          province: provinceName,
          cityId: city,
          city: cityNameAndType,
          postalCode,
          detail,
          district,
          lattitude,
          longitude,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const findData = await address.findByPk(
        id
        //   {
        //   where: {
        //     UserId: req.params.id,
        //   },
        // }
      );
      res.status(200).json({
        message: "Address edited",
        data: findData,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params;
      await address.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        message: "Address deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  setDefault: async (req, res) => {
    try {
      const { id } = req.params;
      const findDefault = await address.findOne({
        where: {
          defaultAddress: true,
          UserId: req.user.id,
        },
      });
      if (findDefault) {
        await address.update(
          {
            defaultAddress: false,
          },
          {
            where: {
              id: findDefault.id,
            },
          }
        );
        await address.update(
          {
            defaultAddress: true,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({
          message: "success",
        });
      }
      if (!findDefault) {
        await address.update(
          {
            defaultAddress: true,
          },
          {
            where: {
              id: id,
            },
          }
        );
        res.status(200).json({
          message: "success",
        });
      }
      res.status(200).json({
        message: "set as default",
        data: findDefault,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  findAddressById: async (req, res) => {
    try {
      // const response = await address.findAll({
      //   where: {
      //     UserId: req.params.id,
      //   },
      // });
      const response = await address.findOne({
        where: {
          UserId: req.params.id,
          id: req.body.id,
        },
      });
      return res.status(200).send({
        message: "Get User Address",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};