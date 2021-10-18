require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')

var port_number = app.listen(process.env.PORT || 3000);

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

const usersRouter = require('./controllers/userController')
const reportIssueRouter = require('./controllers/reportIssueController')
const hardwareRouter = require('./controllers/hardwareController')
const articleRouter = require('./controllers/articleController')
const requestServiceRouter = require('./controllers/requestServiceController')
const student= require("./routes/studentRoutes")
const semester= require("./routes/semesterRoutes")
const address= require("./routes/addressRoutes")
const contact= require("./routes/contactRoutes")
const enrollmentStatus= require("./routes/EnrollmentStatusRoutes")
const contactPreference= require("./routes/contactPreferenceRoutes")
const priority= require("./routes/priorityRoutes")
const status= require("./routes/statusRoutes")
const quicksolution= require("./routes/quickSolutionRoutes")
const ticket= require("./routes/ticketRoutes")

app.use('/users', usersRouter)
app.use('/reportIssue', reportIssueRouter)
app.use('/hardware', hardwareRouter)
app.use('/articles', articleRouter)
app.use('/requestService', requestServiceRouter)
app.use('/student',student);
app.use('/semester',semester);
app.use('/address',address);
app.use('/contact',contact);
app.use('/enrollmentStatus',enrollmentStatus);
app.use('/contactPreference',contactPreference);
app.use('/priority',priority);
app.use('/status',status);
app.use('/quicksolution',quicksolution);
app.use('/ticket',ticket);

app.listen(port_number, () => console.log('Server running...'))
