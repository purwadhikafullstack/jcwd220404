const { Op } = require("sequelize");
const axios = require("axios");
const db = require("../../models");
const branch = db.Branch;
const rajaOngkirKey = process.env.RAJA_KEY;
const openCageKey = process.env.GEO_KEY;

module.exports = {
  branchById: async (req, res) => {
    try {
      const response = await branch.findAll({
        where: {
          // UserId: req.params.id,
        },
        order: [["defaultAddress", "DESC"]],
      });
      return res.status(200).send({
        message: "Get Branch Address",
        data: response,
      });
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        data: err,
      });
    }
  },

  newBranch: async (req, res) => {
    try {
      const { branchName, address, city, province, postalCode, phoneNumber } =
        req.body;
      const provinceAndCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );
      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;

      const response = await branch.create({
        branchName,
        address,
        provinceId: province,
        province: provinceName,
        cityId: city,
        city: cityNameAndType,
        postalCode,
        lattitude,
        longitude,
        phoneNumber,
        // UserId: req.user.id,
      });
      res.status(200).send({
        message: "New Branch added",
        data: response,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        message: "Process error",
        data: err,
      });
    }
  },

  updateBranch: async (req, res) => {
    try {
      const { branchName, address, province, city, postalCode } = req.body;
      const { id } = req.params;
      const provinceAndCity = await axios.get(
        `https://api.rajaongkir.com/starter/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );
      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const location = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${openCageKey}&q=${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;
      await branch.update(
        {
          branchName,
          address,
          provinceId: province,
          province: provinceName,
          cityId: city,
          city: cityNameAndType,
          postalCode,
          lattitude,
          longitude,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const findData = await branch.findByPk(id);
      res.status(200).send({
        message: "Branch edited",
        data: findData,
      });
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        data: err,
      });
    }
  },

  deleteBranch: async (req, res) => {
    try {
      const { id } = req.params;
      await branch.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        message: "Address deleted",
      });
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        data: err,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const branches = await branch.findAll({
        attributes: ["id", "branchName"],
      });
      res.status(200).send({
        message: "Data retrieved",
        data: branches,
      });
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        data: err,
      });
    }
  },

  findBranchById: async (req, res) => {
    try {
      const response = await branch.findOne({
        where: {
          UserId: req.params.id,
          id: req.body.id,
        },
      });
      return res.status(200).send({
        message: "Get Branch Address",
        data: response,
      });
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        data: err,
      });
    }
  },
};
