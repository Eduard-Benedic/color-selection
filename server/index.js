const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

let mongoose = require("mongoose");
var config = require("./config");
let port = process.env.PORT;

if (port == null || port == "") {
  port = 9000;
}

app.use(express.static(path.resolve("../dist/")));

app.use(
  cors({
    // origin: "http://localhost:8080",
    credentials: true,
  })
);

const userRoutes = require("./routes/user");

app.use(bodyParser.json());
app.use(cookieParser());

//================== MULTER ==============

app.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: path.join(__dirname, "../dist") });
});
app.use("/api/user", userRoutes);

mongoose.connect(
  config.getDbConnectionString(),
  { useNewUrlParser: true, useUnifiedTopology: true },
  function() {
    app.listen(port);
    console.log("connected sucesful");
  }
);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
