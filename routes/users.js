var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/moviejobtask").then(function (connection) {
  console.log("database connection established to moviejobtask");
})

const Schema = mongoose.Schema({
  name: String,
  imbd: Number,
  details: String,
  img: String,
})


module.exports = mongoose.model('user', Schema)