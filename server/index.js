const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let mongoose = require("mongoose");
let config = require("./config");
let compression = require("compression");

app.use(compression());
app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:8080",
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

// HANDLE PRODUCTION
if (process.env.NODE_ENV === "production") {
  // static folder

  app.use(express.static(__dirname + "/public"));

  // handle SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const port = process.env.PORT || 9000;
mongoose.connect(
  config.getDbConnectionString(),
  { useNewUrlParser: true, useUnifiedTopology: true },
  function () {
    app.listen(port);
    console.log("connected sucesful");
  }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
