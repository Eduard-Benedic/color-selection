const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

const { check, validationResult } = require("express-validator");

router.get("/profile", userController.populateProfile);

router.post(
  "/signup",
  [check("username").isEmail(), check("password").isLength({ min: 5 })],
  userController.signUp
);

router.post("/login", userController.logIn);
router.put("/color", userController.saveColor);
router.delete("/color", userController.deleteColor);
router.get("/logOut", userController.logOut);

router.post("/submitImg", userController.submitImg);

module.exports = router;
