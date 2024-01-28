const mongoose = require("mongoose");

const DataSchema = mongoose.Schema({
  title: String,
});

module.exports = mongoose.model("Data", DataSchema);
