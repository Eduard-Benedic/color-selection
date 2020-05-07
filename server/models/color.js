var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var colorSchema = new Schema({
  raw_hex: String,
  color_name: String
});

var color = mongoose.model("color", colorSchema);

module.exports = color;
