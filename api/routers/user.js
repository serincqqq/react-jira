const express = require('express')
const User = require('../schema/userSchema')
const userRouter = express.Router()

userRouter.get('/userList', async function (req, res) {
  const { searchQuery, type } = req.query
  User.find({
    userName: { $regex: searchQuery, $options: 'i' },
  }).then((response) => {
    res.send(response)
  })
})
userRouter.get('/userAvatar', async function (req, res) {
  const { id } = req.query
  User.findOne({
    _id: id,
  }).then((response) => {
    res.send(response)
  })
})
userRouter.get('/allUser', async function (req, res) {
  res.send(await User.find())
})

module.exports = userRouter
