const express = require('express')
const Suffix = require('../schema/suffixSchema')
const suffixRouter = express.Router()

suffixRouter.get('/suffixOption', async function (req, res) {
  res.send(await Suffix.find())
})

module.exports = suffixRouter
