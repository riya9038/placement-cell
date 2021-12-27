const express = require("express");
const dotenv= require('dotenv').config();
const port = process.env.PORT||8000;
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const User = require("./models/user");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportGoogle = require("./config/passport-google-strategy");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

const app = express();
app.use(express.urlencoded());

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//setting up layouts
app.use(expressLayouts);

//setting up extracted static files
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up static files
app.use(express.static("./assets"));

app.use(
  session({
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl:process.env.mongoURI,
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server:${err}`);
    return;
  }
  console.log(`Server is running on the port:${port}`);
});
