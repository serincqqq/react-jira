const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

const Suffix = Mongoose.model(
  'Suffix',
  new Mongoose.Schema({
    label: String,
    value: String,
  })
)
module.exports = Suffix
