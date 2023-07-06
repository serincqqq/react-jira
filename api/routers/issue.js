const express = require('express')
const Issue = require('../schema/issueSchema')
const app = express()
const issuesRouter = express.Router()
issuesRouter.get('/delete', async function (req, res) {
  res.send(await Issue.find()) //通过find查找Product中的信息
})
issuesRouter.get('/detail', async function (req, res) {
  console.log('xx', req, res)
})
issuesRouter.get('/modify', async function (req, res) {
  console.log('modify', req, res)
})
issuesRouter.get('/create', async function (req, res) {
  console.log('info', req, res)
})
issuesRouter.get('/search', async function (req, res) {
  console.log('info', req, res)
})
module.exports = issuesRouter
