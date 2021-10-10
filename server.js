require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const usersRouter = require('./controllers/userController')
const reportIssueRouter = require('./controllers/reportIssueController')
const hardwareRouter = require('./controllers/hardwareController')
const articleRouter = require('./controllers/articleController')
const requestServiceRouter = require('./controllers/requestServiceController')

app.use('/users', usersRouter)
app.use('/reportIssue', reportIssueRouter)
app.use('/hardware', hardwareRouter)
app.use('/articles', articleRouter)
app.use('/requestService', requestServiceRouter)

app.listen(3000, () => console.log('Server running...'))
