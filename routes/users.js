const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");
const UserState = require("../models/UserState");
const { check, validationResult } = require("express-validator");

router.post(
  "/register",
  check("firstName").isAlpha().withMessage("contains special characters"),
  check("lastName").isAlpha().withMessage("contains special characters"),
  check("email").custom(value => {
    return User.findOne({email: value}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use')
      }
    })}),
  check("phoneNumber").isMobilePhone(),
  check("password").isLength({ min: 8 })
    .withMessage("should have at least 8 characters")
    .custom((value, { req }) => {
        if (value !== req.body.passwordConfirm) {
          throw new Error('Password confirmation is incorrect');
        }
        return true;
      }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      console.log(errors);
      res.render("adminRegister"
      , {
        errors: errors.array(),
        ...req.body
      }
      );
    }
    else{
        console.log("success")
    }
  }
);

//Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/logout", (req, res, next) => {
  req.logOut();
  req.flash("success_msg", "you are logged out");
  res.redirect("/login");
});

module.exports = router;
