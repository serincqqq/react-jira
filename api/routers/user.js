const express = require('express')
const User = require('../schema/userSchema')
const userRouter = express.Router()

userRouter.get('/userList', async function (req, res) {
  const { searchQuery, type } = req.query
  User.find({
    userName: { $regex: searchQuery, $options: 'i' },
    userType: type,
  }).then((response) => {
    res.send(response)
  })
})

module.exports = userRouter
