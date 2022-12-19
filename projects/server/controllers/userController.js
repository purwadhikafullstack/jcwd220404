const db = require("../models");
const user = db.User;
const profile = db.Profile;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, phoneNumber, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword) throw `Wrong Password`;

      if (password.length < 8) throw `Minimum 8 characters`;

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const data = await user.create({
        name,
        phoneNumber,
        email,
        password: hashPass,
      });

      const token = jwt.sign({ phoneNumber: phoneNumber }, "jcwd220404");
      res.status(200).send({
        message: "Register success",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      console.log(req.body);
      const { phoneEmail, password } = req.body;
      const isUserExist = await user.findOne({
        where: {
          [Op.or]: {
            phoneNumber: phoneEmail ? phoneEmail : "",
            email: phoneEmail ? phoneEmail : "",
          },
        },
        raw: true,
      });
      console.log(isUserExist);
      if (!isUserExist) throw `User not found`;
      const payload = { phoneNumber: isUserExist.phoneNumber };
      const token = jwt.sign(payload, "jcwd220404");
      const isValid = await bcrypt.compare(password, isUserExist.password);
      if (!isValid) throw `Wrong password`;
      res.status(200).send({
        message: "Login success",
        isUserExist,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd220404");
      const result = await user.findOne({
        where: {
          // [Op.or]: {
            phoneNumber: verify.phoneNumber,
            // name: verify.name,
          // },
        },
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  //   gender: async (req, res) => {
  //     try {
  //     } catch (err) {
  //       res.status(400).send(err);
  //     }
  //   },
  //   address: async (req, res) => {
  //     try {
  //     } catch (err) {
  //       res.status(400).send(err);
  //     }
  //   },
};
