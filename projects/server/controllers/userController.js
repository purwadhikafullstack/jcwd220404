const db = require("../models");
const user = db.User;
const profile = db.Profile;
const address = db.Address;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const transporter = require("../middleware/transporter");
const fs = require("fs");
const handlebars = require("handlebars");

module.exports = {
  register: async (req, res) => {
    try {
      const { name, phoneNumber, email, password, password_confirmation } =
        req.body;
      if (password !== password_confirmation)
        throw "Password doesnt match with confirm password";
      if (password.length < 8)
        throw "Password only valid if length is more than 8";

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.create({
        name,
        phoneNumber,
        email,
        password: hashPass,
        code_otp: hashOtp,
      });

      await profile.create({
        UserId: data.id,
      });

      await address.create({
        UserId: data.id,
      });

      const token = jwt.sign(
        { phoneNumber: phoneNumber },
        "jcwd2204"
        // { expiresIn: "1h" }
      );

      const tempEmail = fs.readFileSync("./template/codeotp.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        phoneNumber,
        code_otp,
      });

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Verifikasi akun",
        html: tempResult,
      });

      res.status(200).send({
        massage: "Register Succes",
        data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  verification: async (req, res) => {
    try {
      const { code_otp } = req.body;

      const isAccountExist = await user.findOne({
        where: {
          phoneNumber: req.user.phoneNumber,
        },
        raw: true,
      });

      const isValid = await bcrypt.compare(code_otp, isAccountExist.code_otp);

      if (!isValid) throw `your code otp incorrect...`;

      await user.update(
        { isVerified: true },
        {
          where: {
            phoneNumber: req.user.phoneNumber,
          },
        }
      );
      res.status(200).send({
        message: "Succes Verification",
        data: isAccountExist,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  changeOtp: async (req, res) => {
    try {
      const { phoneNumber } = req.body;

      const code_otp = Math.floor(100000 + Math.random() * 900000).toString();

      const salt = await bcrypt.genSalt(10);
      const hashOtp = await bcrypt.hash(code_otp, salt);

      const data = await user.update(
        { code_otp: hashOtp },
        {
          where: {
            phoneNumber,
          },
        }
      );

      const isAccountExist = await user.findOne({
        where: { phoneNumber },
        raw: true,
      });

      const token = jwt.sign({ phoneNumber }, "jcwd2204", { expiresIn: "1h" });

      const tempEmail = fs.readFileSync("./template/codeotp.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        phoneNumber: isAccountExist.phoneNumber,
        code_otp,
      });

      await transporter.sendMail({
        from: "Admin",
        to: isAccountExist.email,
        subject: "Verifikasi akun",
        html: tempResult,
      });

      res.status(200).send({
        massage: "Check Your Email, code otp send succes",
        data,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  login: async (req, res) => {
    try {
      const { phoneEmail, password } = req.body;

      const isAccountExist = await user.findOne({
        where: {
          [Op.or]: {
            phoneNumber: phoneEmail ? phoneEmail : "",
            email: phoneEmail ? phoneEmail : "",
          },
        },
        raw: true,
      });

      if (isAccountExist === null) throw "Account not found";
      if (isAccountExist.status === false) throw "Your Account is blocked";

      const payload = { phoneNumber: isAccountExist.phoneNumber };
      const token = jwt.sign(payload, "jcwd2204");

      // const isProfileExist = await profile.findOne({
      //   where: {
      //     UserId: isAccountExist.phoneNumber,
      //   },
      //   raw: true,
      // });

      // isAccountExist.profilePic = isProfileExist.profilePic;
      // isAccountExist.gender = isProfileExist.gender;
      // isAccountExist.birthDate = isProfileExist.birthDate;

      // const isAddressExist = await address.findOne({
      //   where: {
      //     UserId: isAccountExist.phoneNumber,
      //   },
      //   raw: true,
      // });

      // isAccountExist.addressLine = isAddressExist.addressLine;

      const isValid = await bcrypt.compare(password, isAccountExist.password);

      if (!isValid) throw `Password incorrect`;

      res.status(200).send({
        message: "Login Succes",
        isAccountExist,
        token,
      });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },

  keepLogin: async (req, res) => {
    try {
      const verify = jwt.verify(req.token, "jcwd2204");
      const result = await user.findOne({
        where: {
          phoneNumber: verify.phoneNumber,
        },
        raw: true,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { password, password_confirmation } = req.body;

      if (password.length < 8)
        throw "Password only valid if length is more than 8";
      if (password !== password_confirmation)
        throw "Password doesnt match with confirm password";
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
      await user.update(
        { password: hashPass },
        {
          where: {
            email: req.user.email,
          },
        }
      );
      res.status(200).send("Update Password Success");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  sendEmailForgotPass: async (req, res) => {
    try {
      const { email } = req.body;

      const isAccountExist = await user.findOne({
        where: { email },
        raw: true,
      });

      if (isAccountExist === null) throw "Account not found";
      else if (isAccountExist.status === false) throw "Your Account is blocked";

      const token = jwt.sign({ email: isAccountExist.email }, "jcwd2204", {
        expiresIn: "1h",
      });

      const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
      const tempCompile = handlebars.compile(tempEmail);
      const tempResult = tempCompile({
        email: isAccountExist.email,
        link: `http://localhost:3000/resetPassword/${token}`,
      });

      await transporter.sendMail({
        from: "Admin",
        to: email,
        subject: "Reset Password",
        html: tempResult,
      });

      res
        .status(200)
        .send("Send email request reset password succes, open your email");
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};

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
