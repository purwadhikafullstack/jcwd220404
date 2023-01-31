const db = require("../../models");
const bcrypt = require("bcrypt");
const admin = db.Admin;
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

module.exports = {
  register: async (req, res) => {
    try {
      const { username, email, password, password_confirmation, isSuper } =
        req.body;

      if (password !== password_confirmation) throw `password not match`;

      if (password.length < 8) throw "Minimum 8 characters";

      const salt = await bcrypt.genSalt(10);

      const hashPass = await bcrypt.hash(password, salt);

      const data = await admin.create({
        username,
        email,
        password: hashPass,
        isSuper,
      });

      const token = jwt.sign({ username: username, email: email }, "jcwd2204");

      res.status(200).send({
        message: "Register Succes",
        data,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { usernameEmail, password } = req.body;

      const isUserExist = await admin.findOne({
        where: {
          [Op.or]: {
            username: usernameEmail ? usernameEmail : "",
            email: usernameEmail ? usernameEmail : "",
          },
        },
        raw: true,
      });

      if (!isUserExist) throw "Account not found";

      const payload = { username: isUserExist.username };
      const token = jwt.sign(payload, "jcwd2204");

      const isValid = await bcrypt.compare(password, isUserExist.password);

      if (!isValid) throw `Password incorrect`;

      res.status(200).send({
        message: "Login Succes",
        isUserExist,
        token,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      const result = await admin.findOne({
        where: {
          username: verify.username,
        },
        raw: true,
      });

      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAll: async (req, res) => {
    try {
      const admins = await admin.findAll({
        where: {
          isSuper: 1,
        },
        attributes: ["username", "email", "isSuper"],
        raw: true,
      });
      res.status(200).send(admins);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};