const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

// {
//   id: 1097636,
//   title: "Click on an issue to see what's behind it.",
//   type: 'task',
//   status: 'done',
//   priority: '2',
//   listPosition: 2,
//   createdAt: '2023-05-17T07:09:07.537Z',
//   updatedAt: '2023-06-14T08:03:26.258Z',
//   userIds: [405882],
// },
const Project = Mongoose.model(
  'Project',
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
module.exports = Project
