const problemRoutes= require('./server/routes/problem')
const projectRoutes = require('./server/routes/project')
const userRoutes = require('./server/routes/user')
var morgan = require('morgan')
const path = require('path')

const port = process.env.PORT || 8082;
require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(morgan('tiny'))
const history = require('connect-history-api-fallback')
app.use(history({
  verbose: false,
  disableDotRule:false
}));
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api/problem',problemRoutes)
app.use('/api/project',projectRoutes)
app.use('/api/user',userRoutes)
const uri = process.env.URI

mongoose.connect(uri, {
    useNewUrlParser: "true",
  })
  mongoose.connection.on("error", err => {
    console.log("err", err)
  })
  mongoose.connection.on("connected", (err, res) => {
    console.log("mongoose is connected")
  })


app.listen(port, function (err) {
    if (!err) {
      console.log("server is running at ", port)
    }
  })