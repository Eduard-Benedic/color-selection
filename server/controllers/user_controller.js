const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const path = require("path");
const multer = require("multer");

// const storage = multer.memoryStorage();
// INIT upload
const upload = multer({
  // storage: storage,
}).single("myFile");

exports.submitImg = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ message: "whatasp" });
    } else {
      const cookieToken = req.cookies.token;
      const userId = jwt.verify(cookieToken, process.env.JWT_SECRET).id;
      console.log("req.file", req.file);
      userModel.findByIdAndUpdate(
        userId,
        { img: req.file.buffer },
        { new: true },
        (err, dbResponse) => {
          if (err) return console.log(err);
          else {
            const buffer = new Buffer(dbResponse.img.buffer);
            const img = buffer.toString("base64");
            return res.status(200).json({ img });
          }
        }
      );
    }
  });
};

exports.signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const credentials = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  };

  const user = new userModel(credentials);

  userModel.findOne({ username: req.body.username }, function(err, userStatus) {
    if (err) {
      console.log(err);
    } else {
      if (!userStatus) {
        user.save((err, uniqueUser) => {
          if (err) console.error(err);
          else {
            let token = jwt.sign({ id: uniqueUser._id }, secret(), {
              expiresIn: 86400, // expires in 24 hours
            });
            console.log("Token for signing up", token);
            res.cookie("token", token);
            return res.status(200).json({
              auth: true,
              message: "Succesfuly signe up cookie should be set",
            });
          }
        });
      }
    }
  });
};

exports.logIn = (req, res, next) => {
  const credentials = {
    username: req.body.name,
    password: req.body.password,
  };

  userModel.findOne({ username: credentials.username }, (err, user) => {
    if (err) return console.log("error", err);

    const password = user.password;
    const checkPassword = bcrypt.compareSync(credentials.password, password);

    if (!checkPassword) {
      return res.status(401).send({
        auth: false,
        token: null,
        msg: "Authentication failed, try again",
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60, // expires in 1 hour
      });

      res.cookie("token", token);
      return res
        .status(200)
        .json({ auth: true, message: "Authentication succeded" });
    }
  });
};

exports.logOut = (req, res, next) => {
  const cookieToken = req.cookies.token;

  const userId = jwt.verify(cookieToken, process.env.JWT_SECRET).id;
  const token = jwt.sign(
    {
      id: userId,
      exp: Math.floor(Date.now() / 1000) - 500,
    },
    process.env.JWT_SECRET
  );
  res.clearCookie("token", { path: "/" });
  res.cookie("token", token, { path: "/" });
  return res.json({ user: null, auth: false });
};

exports.populateProfile = (req, res, next) => {
  const cookieToken = req.cookies.token;

  jwt.verify(cookieToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.json({
        userProfile: { username: null, colors: null },
      });
    const userId = decoded.id;
    userModel.findById(userId, (error, dbResponse) => {
      if (error) return res.json({ auth: false, user: null });
      const buffer = new Buffer(dbResponse.img.buffer);
      const imgDebuffered = buffer.toString("base64");

      return res.status(200).json({
        userProfile: {
          username: dbResponse.username,
          colors: dbResponse.colors,
        },
        profileImg: imgDebuffered,
        auth: true,
      });
    });
  });
};

exports.saveColor = (req, res, next) => {
  const cookieToken = req.cookies.token;
  const userId = jwt.verify(cookieToken, process.env.JWT_SECRET).id;
  const colorTheme = {
    raw_hex: req.body.payload.raw_hex,
    color_name: req.body.payload.color_name,
  };

  userModel.findByIdAndUpdate(
    userId,
    { $push: { colors: colorTheme } },
    (err, user) => {
      if (err) console.log(err);
      else {
        return res.status(200).json({ colors: user.colors });
      }
    }
  );
};

exports.deleteColor = (req, res, next) => {
  const colorHex = req.body.colorHex;
  const cookieToken = req.cookies.token;
  const userId = jwt.verify(cookieToken, process.env.JWT_SECRET).id;

  userModel.findByIdAndUpdate(
    userId,
    { $pull: { colors: { raw_hex: colorHex } } },
    { new: true },
    (err, dbResponse) => {
      if (err) return console.log(err);
      return res.status(200).json({ colors: dbResponse.colors });
    }
  );
};
