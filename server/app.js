const express = require('express')
const { connect } = require('./config/mongodb')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = 4020

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/', routes)
app.use(errorHandler)

connect().then((db) => {
  console.log('mongo is running');
  app.listen(PORT, () => {
    console.log('app is listening on port :', PORT);
  })
})