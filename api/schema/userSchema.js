const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

const User = Mongoose.model(
  'User',
  new Mongoose.Schema({
    //属性名:属性类型
    userType: String,
    userName: String,
    userAvatar: String,
  })
)
module.exports = User
