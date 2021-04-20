const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load user model
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy((email, password, done) => {

        //find user
      User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Email is not registered" });
        }

        //Compare password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "password is incorrect" });
          }
        });
      })
      .catch(error => console.log(error));
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
