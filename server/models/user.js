var mongoose = require("mongoose");
var fs = require("fs");

let readable = fs.readFileSync(__dirname + "/Unknown_Member.jpg");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  colors: [
    {
      raw_hex: String,
      color_name: String,
    },
  ],
  img: {
    type: Buffer,
    default: readable,
  },
});

var user = mongoose.model("user", userSchema);

module.exports = user;
