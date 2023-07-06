const { Schema } = require('mongoose')
const Mongoose = require('../database/createConnection')

const Project = Mongoose.model(
  'Project',
  new Mongoose.Schema({
    projectName: String,
    managerName: String,
    managerEmail: String,
    managerAvatar: String,
    projectType: String,
    keyword: String,
  })
)
module.exports = Project
