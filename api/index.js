const express = require('express')
const router = require('./routers')

const app = express()

app.use(require('cors')())
app.use('/', express.static('public'))
app.use(router)

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
