const express = require('express')
const Project = require('../schema/projectSchema')
const app = express()
app.get('/project', async function (req, res) {
  res.send(await Project.find()) //通过find查找Product中的信息
})
app.get('/insert', async function (req, res) {
  res.send(
    await Project.insertMany([
      { title: '产品111', type: 'task' },
      { title: '产品2', type: 'story' },
      { title: '产品3' },
    ])
  ) //通过find查找Product中的信息
})

module.exports = app
