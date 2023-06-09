const express = require('express')
const Issue = require('../schema/issueSchema')
const app = express()
const issuesRouter = express.Router()
issuesRouter.get('/list', async function (req, res) {
  res.send(await Issue.find()) //通过find查找Product中的信息
})
issuesRouter.get('/delete', async function (req, res) {
  const { issueId } = req.query
  try {
    await Issue.deleteOne({ _id: issueId })
    res.status(200).send({ code: 200 })
  } catch (err) {
    res.status(500).send('Internal server error')
  }
})
issuesRouter.get('/detail', async function (req, res) {
  const { issueId } = req.query
  Issue.findOne({
    _id: issueId,
  }).then((response) => {
    res.send(response)
  })
})
issuesRouter.post('/update', async function (req, res) {
  const { issueId } = req.query
  try {
    const savedData = await Issue.updateOne({ _id: issueId }, { $set: req.body })
    res.status(200).json(savedData)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})
issuesRouter.post('/create', async function (req, res) {
  const issue = new Issue(req.body)
  try {
    const savedData = await issue.save()
    res.status(200).json(savedData)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})
issuesRouter.get('/search', async function (req, res) {
  console.log('info', req, res)
})
module.exports = issuesRouter
