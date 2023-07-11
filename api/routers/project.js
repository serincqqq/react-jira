const express = require('express')
const Project = require('../schema/projectSchema')
const projectsRouter = express.Router()

projectsRouter.get('/list', async function (req, res) {
  res.send(await Project.find()) //通过find查找Product中的信息
})

projectsRouter.get('/search', async function (req, res) {
  const { searchQuery, searchType } = req.query
  Project.find({
    projectType: searchType,
    $or: [
      { projectName: { $regex: searchQuery, $options: 'i' } },
      { managerName: { $regex: searchQuery, $options: 'i' } },
      { keyword: { $regex: searchQuery, $options: 'i' } },
      // ... 其他字段
    ],
  }).then((response) => {
    res.send(response)
  })
})
projectsRouter.post('/create', async function (req, res) {
  // const data = req.body
  const project = new Project(req.body)
  try {
    const savedData = await project.save()
    console.log(savedData)
    res.status(200).json(savedData)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})

projectsRouter.get('/delete', async function (req, res) {
  const { projectId } = req.query
  try {
    await Issue.deleteOne({ _id: projectId })
    res.status(200).send({ code: 200 })
  } catch (err) {
    res.status(500).send('Internal server error')
  }
})
projectsRouter.post('/edit', async function (req, res) {
  const { projectId } = req.query
  try {
    const savedData = await Project.updateOne({ _id: projectId }, { $set: req.body })
    res.status(200).json(savedData)
  } catch (err) {
    console.error(err)
    res.status(500).send('Internal server error')
  }
})
projectsRouter.get('/detail', async function (req, res) {
  const { projectId } = req.query
  Project.findOne({
    _id: projectId,
  }).then((response) => {
    res.send(response)
  })
})

module.exports = projectsRouter
