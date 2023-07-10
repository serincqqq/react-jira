const express = require('express')
const bodyParser = require('body-parser')
const issuesRouter = require('./routers/issue')
const projectsRouter = require('./routers/project')
const suffixRouter = require('./routers/suffix')
const userRouter = require('./routers/user')

const app = express()
app.use(bodyParser.json()) // 解析JSON格式的请求体
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('cors')())

app.use('/', express.static('public'))
app.use('/jira/project', projectsRouter)
app.use('/jira/issue', issuesRouter)
app.use('/jira/option', suffixRouter)
app.use('/jira/user', userRouter)
app.listen(3001, () => {
  console.log('App listening on port 3001!')
})
