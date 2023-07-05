const express = require('express')
const Project = require('../schema/projectSchema')
const app = express()
app.get('/project', async function (req, res) {
  res.send(await Project.find()) //通过find查找Product中的信息
})
app.post('/insert', async function (req, res) {
  console.log(req.body)

  // res.send(
  //   await Project.insertMany([
  //     {
  //       title: "Click on an issue to see what's behind it.",
  //       description: 'xx',
  //       type: 'task',
  //       status: 'done',
  //       priority: '2',
  //       listPosition: 2,
  //       createdAt: '2023-05-17T07:09:07.537Z',
  //       updatedAt: '2023-06-14T08:03:26.258Z',
  //     },
  //   ])
  // )
})

module.exports = app
