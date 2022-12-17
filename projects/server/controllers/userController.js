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
            const {  name, phone_number, email, password, password_confirmation } = req.body;
            if (password !== password_confirmation) throw "Password doesnt match with confirm password";
            if (password.length < 8) throw "Password only valid if length is more than 8";

            const code_otp = Math.floor(100000 + Math.random() * 900000).toString()

            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            const hashOtp = await bcrypt.hash(code_otp, salt);

            const data = await user.create({
                name,
                phone_number,
                email,
                password: hashPass,
                code_otp: hashOtp
            });

            await db.Profile.create({
                UserId: data.id
            })

            const token = jwt.sign({ id: data.id }, "jcwd2204", { expiresIn: "1h" });

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
                html: tempResult
            })

            res.status(200).send({
                massage: "Register Succes",
                data,
                token
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
            }
    },
    login: async (req, res) => {
        try {
            const { data, password } = req.body;
    
            const isAccountExist = await user.findOne({
                where: {
                    [Op.or]: {
                        email: data ? data : "",
                        phone_number: data ? data : "",
                    },
                },
                raw: true,
            });
            // console.log(isAccountExist);
            if (isAccountExist === null) throw "Account not found"
            if (isAccountExist.status === false) throw "Your Account is blocked"

            const payload = { id: isAccountExist.id };
            const token = jwt.sign(payload, "jcwd2204");

            const isProflieExist = await profile.findOne({
                where: {
                        userId: isAccountExist.id
                    },
                raw: true,
            });
            isAccountExist.profilePic = isProflieExist.profilePic
        
            const isValid = await bcrypt.compare(password, isAccountExist.password);

            if(!isValid) throw `Password incorrect...`

            res.status(200).send({
                message: "Login Succes",
                isAccountExist,
                token
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    keepLogin: async (req, res) => {
        try {
            
            const verify = jwt.verify(req.token, "jcwd2204");
            // console.log(verify);
            const result = await user.findOne({
                where: {
                    id: verify.id,
                },
                raw: true,
            });
            
            const isProflieExist = await db.Profile.findOne({
                where: {
                    userId: result.id
                },
                raw: true,
            });

            result.profilePic = isProflieExist.profilePic
            // console.log(result)
            
            res.status(200).send(result);
            } catch (err) {
            res.status(400).send(err);
        }
    },
    findAllUser: async (req, res) => {
        try {

            const users = await user.findAll({ include: profile });


            res.status(200).send(users);
        } catch (err) {

            res.status(400).send(err);
        }
    },
    findUser: async (req, res) => {
        try {

            const users = await user.findAll({
                where: {
                    id: req.params.id
                },
                include: [{
                    model: profile
                }]
            });

            res.status(200).send(users);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updatePassword: async (req, res) => {
        try {
            const { password, password_confirmation } = req.body;

            if (password.length < 8) throw "Password only valid if length is more than 8";
            if (password !== password_confirmation) throw "Password doesnt match with confirm password";
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            await user.update({ password: hashPass }, {
                where: {
                    id: req.user.id
                }
            })
            res.status(200).send("Update Password Success");
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    uploadFile: async (req, res) => {
        try {
            let fileUploaded = req.file;
            console.log("controller", fileUploaded);
            
            await profile.update(
                {
                    profilePic: fileUploaded.filename,
                },
                {
                    where: {
                    UserId: req.params.id,
                    },
                }
            );

            const getUser = await profile.findOne({
                where: {
                    UserId: req.params.id,
                },
                raw: true,
            });
            res.status(200).send({
                id: getUser.id,
                name: getUser.name,
                profilePic: getUser.profilePic,
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
                    id: req.user.id
                },
                raw: true,
            });

            const isValid = await bcrypt.compare(code_otp, isAccountExist.code_otp);

            if(!isValid) throw `your code otp incorrect...`


            await user.update({ isVerified: true },
            {
                where: {
                    id: req.user.id
                }
            }
            );
            res.status(200).send({
                message: "Succes Verification",
                data: isAccountExist
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    updateProfile: async (req, res) => {
        try {
            const { bio, lokasi, situs_web } = req.body;
            console.log(req.body)
            await profile.update({ bio, lokasi, situs_web }, {
                where: {
                    UserId: req.params.id
                }
            })
            res.status(200).send("Update Success");
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

            if (isAccountExist === null) throw "Account not found"
            else if (isAccountExist.status === false) throw "Your Account is blocked"

            const token = jwt.sign({ id: isAccountExist.id }, "jcwd2204", { expiresIn: "1h" });

            const tempEmail = fs.readFileSync("./template/email.html", "utf-8");
            const tempCompile = handlebars.compile(tempEmail);
            const tempResult = tempCompile({
                phoneNumber: isAccountExist.phoneNumber,
                link: `http://localhost:3000/resetpassword/${token}`,
            });

            await transporter.sendMail({
                from: "Admin",
                to: email,
                subject: "Reset Password",
                html: tempResult
            })

            res.status(200).send("Send email request reset password succes, open your email");
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    changeOtp: async (req, res) => {
        try {
            const { id } = req.body;
            
            const code_otp = Math.floor(100000 + Math.random() * 900000).toString()

            const salt = await bcrypt.genSalt(10);
            const hashOtp = await bcrypt.hash(code_otp, salt);
        
            const data = await user.update({ code_otp: hashOtp }, {
                where: {
                    id
                }
            })

            const isAccountExist = await user.findOne({
                where: { id },
                raw: true,
            });

            const token = jwt.sign({ id }, "jcwd2204", { expiresIn: "1h" });

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
                html: tempResult
            })

            res.status(200).send({
                massage: "Check Your Email, code otp send succes",
                data,
                token
            });
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
};
