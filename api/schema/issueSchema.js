const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

const Issue = Mongoose.model(
  'Issue',
  new Mongoose.Schema({
    //属性名:属性类型
    issuetype: String,
    summary: String,
    description: String,
    priority: Object,
    //reporter展示的时候是需要有头像和名字的
    reporter: Object,
    assignee: Object,
    multiple: String,
    status: Object,
    comments: Array,
    originalEstimate: Number,
    timeEstimate: Object,
    createdAt: String,
    updatedAt: String,
  })
)
module.exports = Issue
