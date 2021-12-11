require('dotenv').config({ path: './config/keys.env' });

const express = require('express')
const app = express()
const cookieParser = require('cookie-parser'); //added by Isabella, for cookies
const passport = require('passport')

const mongoose = require('mongoose')
var cors = require('cors')
app.use(cors())
var port_number = app.listen(process.env.PORT || 5000);

mongoose.connect(process.env.DB_URL)
app.use(express.urlencoded({extended: true}))
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))
app.use(express.json())
app.use(cookieParser()); // newly added
app.use(passport.initialize());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials: true");
    next();
  });


const usersRouter = require('./controllers/userController')
const reportIssueRouter = require('./controllers/reportIssueController')
const hardwareRouter = require('./controllers/hardwareController')
const contactRouter = require('./controllers/contactController')
const requestServiceRouter = require('./controllers/requestServiceController')
const FaqRouter = require('./controllers/faqController')
const ticketRouter = require('./controllers/ticketController')

app.use('/users', usersRouter)
app.use('/reportIssue', reportIssueRouter)
app.use('/hardware', hardwareRouter)
app.use('/contacts', contactRouter)
app.use('/requestService', requestServiceRouter)
app.use('/faq', FaqRouter)
app.use('/ticket', ticketRouter)


app.listen(port_number, () => console.log('Server running...'))
