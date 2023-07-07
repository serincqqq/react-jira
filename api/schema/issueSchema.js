const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

const Issue = Mongoose.model(
  'Issue',
  new Mongoose.Schema({
    //属性名:属性类型
    issuename: String,
    issuetype: String,
    summary: String,
    description: String,
    priority: String,
    //reporter展示的时候是需要有头像和名字的
    reporter: Object,
    assignee: Object,
    multiple: String,
    status: String,
    comments: Array,
    originalEstimate: Number,
    timeEstimate: Object,
    createdAt: String,
    updatedAt: String,
  })
)
module.exports = Issue
