const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

const Issue = Mongoose.model(
  'Issue',
  new Mongoose.Schema({
    //属性名:属性类型
    title: String,
    type: String,
    status: String,
    priority: String,
    listPosition: String,
    createdAt: String,
    updatedAt: String,
  })
)
module.exports = Issue
