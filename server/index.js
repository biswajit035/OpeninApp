require("dotenv").config();
var cors = require("cors");
const express = require("express");
const PORT = process.env.PORT || 8000;
require("dotenv").config();
const session = require("express-session");
const passport = require("passport");
const dataRoutes = require("./Routes/data");
const authRoutes = require("./Routes/auth");
const connectToMongo = require("./db");
const passportSetup = require("./config/setup_google");

const app = express();
app.use(
  cors()
);
// JSON parsing middleware
app.use(express.json());

// URL-encoded parsing middleware
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/data", dataRoutes);
app.use("/api", authRoutes);



connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
  });
});

