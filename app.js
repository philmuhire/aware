const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const session = require("express-session");
const exphbs = require("express-handlebars");
const connectDB = require("./config/db");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");

//dotenv config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
// const route = express.Router();

// logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

//Handlebars
app.engine(
    ".hbs",
    exphbs({
      defaultLayout: "main",
      extname: ".hbs",
    })
  );
  app.set("view engine", ".hbs");

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// session
app.use(
  session({
    secret: "randomSecret",
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Connect flash
app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})

//static folder
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
