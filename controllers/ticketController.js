const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


/*MULTER SETUP*/
const FILESDIRECTORY = "./files";
const multer = require('multer')
var path = require("path");
var _ = require("underscore");

// multer storage
const STORAGE = multer.diskStorage({
    
    destination: FILESDIRECTORY,
    filename: function (req, file, cb) {
        //cb(null, Date.now() + path.extname(file.originalname));
        cb("", file.originalname);
    }||""
});

// file type limitations
var fileFilter = function (req, file, cb) {
    // supported image file mimetypes
    var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif', 'image/txt', 'image/docx'];

    if (_.includes(allowedMimes, file.mimetype)) {
        // allow supported image files
        cb(null, true);
    } else {
        // throw error for invalid files
        cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
    }
};

// setting multer storage location and limits
const upload = multer({ storage: STORAGE, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 } }).single('file');

/* NODE MAILER SETUP */
var nodemailer = require("nodemailer");
//const { default: ticketList } = require('../../its/src/pages/ticketList');
//var {google} = require("googleapis")
require('dotenv').config({ path: './config/keys.env' })

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        //type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        // clientId: CLIENT_ID,
        // clientSecret: CLIENT_SECRET,
        // refreshToken: REFRESH_TOKEN,
        // accessToken: accessToken
    },
    tls: { rejectUnauthorized: false }
});



// Get all
// router.get('/', async (req, res) => {
//     try {
//         const tickets = await Ticket.find()
//         res.json(tickets)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// Get one
router.get('/:id', getTicket, (req, res) => {
    res.json(res.ticket)
})

// Get all
router.get('/', getAllTickets, (req, res) => {
    res.json(res.tickets)
})

async function getTicket(req, res, next) {
    let ticket
    try {
        ticket = await Ticket.findById(req.params.id)
        if (ticket == null){
            return res.status(404).json({ message: 'Cannot find ticket' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.ticket = ticket
    next()
}

router.delete('/:id', getTicket, async (req, res) => {
    try {
        await res.ticket.remove()
        res.json({ message: 'Deleted ticket'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// router.delete('/:id', getTicket, async (req, res) => {
//     try {
//         await res.service.remove()
//         res.json({ message: 'Deleted service request'})
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

// Create one
router.post('/', (req, res) => {

    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            res.status(500).json({ message: { msgBody: "File is too large. Can only attach 1MB file.", msgError: true } });
            console.log("File is too large, error was caught.");
        }
        else if (err) {
            res.status(500).json({ message: { msgBody: "Unsupported file type, please try again.", msgError: true } });
            console.log("Unsupported file type.")
        } 
       else {
          
             console.log(req.body)
             const ticket = new Ticket({
                studentID: req.body.studentID?req.body.studentID:"Not Provided",
                firstName: req.body.firstName?req.body.firstName:"",
                lastName: req.body.lastName?req.body.lastName:"",
                email: req.body.email?req.body.email:"",
                phone: req.body.phone?req.body.phone:"not provided",
                deviceID: req.body.deviceID?req.body.deviceID:"not provided",
                // deviceType: req.body.deviceType,
                specialCase: req.body.specialCase?req.body.specialCase:"",
                subject: req.body.subject? req.body.subject:"Not provided",
                description: req.body.description?req.body.description:"Not provided",
                internalComment: req.body.internalComment?req.body.internalComment:"", 
                ticketNumber:req.body.ticketNumber?req.body.ticketNumber:new Date().valueOf(),
                file: req.file?req.file.filename:""
            })
            // const ticket = new Ticket(req.body)
            console.log(ticket)

            ticket.save(err => {
                if (err) {
                    res.status(400).json({ message: { msgBody: "There is something wrong with your information (400), please re-enter and try again. ", msgError: true } })
                } else {
                    const msg = {
                        to: `${req.body.email}`, // Change to your recipient
                        from: 'dmao6@myseneca.ca', // Change to your verified sender
                        subject: 'ServiceTicket - Your issue ticket has been submitted',
                        text: `Hi ${req.body.firstName}`,
                        html: `Thank you for submitted a ticket. You should be contacted by an service agent soon. Description: ${req.body.description}`,
                    }
                    sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Email sent-submit')
                    })
                    .catch((error) => {
                        console.error(error)
                    })

                    // let message = '<p>Hello, ' + req.body.firstName + "! </p><br><p>Your ticket was successfully submitted, here is the ticket information: </p><br>" +
                    //     '<table border="1" class = "text">' +
                    //     '<thead>' +
                    //     '<tr>' +
                    //     '<td>Email address</td>' +
                    //     '<td>subject</td>' +
                    //     '<td>problem description</td>' +
                    //     '</tr>' +
                    //     '</thead>' +
                    //     '<tbody>' +
                    //     '<tr>' +
                    //     '<td>' + req.body.email + '</td>' +
                    //     '<td>' + req.body.subject + '</td>' +
                    //     '<td>' + req.body.description + '</td>' +
                    //     '</tr>' +
                    //     '</tbody>' +
                    //     '</table>'

                    // var mailOptions = {
                    //     from: process.env.EMAIL_USER,
                    //     to: req.body.email,
                    //     subject: 'ServiceTicket - Your issue ticket has been successfully submitted.',
                    //     html: message
                    // }
                    // transporter.sendMail(mailOptions, (error, info) => {
                    //     if (error) {
                    //         console.log("ERROR: " + error);
                    //         res.status(500).json({ message: { msgBody: "There is something wrong with your information (500), please re-enter and try again. ", msgError: true } });
                    //     }
                    //     else {
                    //         console.log("SUCCESS: " + info.response);
                    //         res.status(201).json({ message: { msgBody: "The ticket is created successfully! You will be redirected to the dashboard in a second!", msgError: false } });
                    //     }
                    // });


                }
            })



       }

    })
})

// Update one
router.patch('/:id', getTicket, async (req, res) => {
    if (req.body.status != null) {
        res.ticket.status = req.body.status
    }
    if (req.body.solution != null) {
        res.ticket.solution = req.body.solution
    }
    if (req.body.internalComment != null) {
        res.ticket.internalComment = req.body.internalComment
    }
    try {
        const updatedTicket = await res.ticket.save()
        res.json(updatedTicket)
        // send email if ticket is successfully closed
        if (req.body.status === "Closed") {
            const msg = {
                to: `${req.body.email}`, // Change to your recipient
                from: 'dmao6@myseneca.ca', // Change to your verified sender
                subject: 'ServiceTicket - Your issue ticket has been closed',
                text: `Hi ${req.body.firstName}`,
                html: `Your open issue ticket has been closed with the following comment: ${req.body.solution}`,
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent-closed')
            })
            .catch((error) => {
                console.error(error)
            })
            // let message = '<p>Hello, ' + req.body.firstName + "! </p><br><p>Your ticket was successfully closed, here is the ticket information: </p><br>" +
            // '<table border="1" class = "text">' +
            // '<thead>' +
            // '<tr>' +
            // '<td>Email address</td>' +
            // '<td>Subject</td>' +
            // '<td>Problem description</td>' +
            // '<td>Closing notes</td>' +
            // '</tr>' +
            // '</thead>' +
            // '<tbody>' +
            // '<tr>' +
            // '<td>' + req.body.email + '</td>' +
            // '<td>' + req.body.subject + '</td>' +
            // '<td>' + req.body.description + '</td>' +
            // '<td>' + req.body.solution + '</td>' +
            // '</tr>' +
            // '</tbody>' +
            // '</table>'

            // var mailOptions = {
            //     from: process.env.EMAIL_USER,
            //     to: req.body.email,
            //     subject: 'ServiceTicket - Your issue ticket has been closed.',
            //     html: message
            // }
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.log("ERROR: " + error);
            //         res.status(500).json({ message: { msgBody: "There is something wrong with your information (500), please re-enter and try again. ", msgError: true } });
            //     }
            //     else {
            //         console.log("SUCCESS: " + info.response);
            //         res.status(201).json({ message: { msgBody: "The ticket is closed successfully! You will be redirected to the dashboard in a second!", msgError: false } });
            //     }
            // });
        }
        else if(req.body.status==="Pending Client Response"){
            const msg = {
                to: `${req.body.email}`, // Change to your recipient
                from: 'dmao6@myseneca.ca', // Change to your verified sender
                subject: 'ServiceTicket - Requesting more information',
                text: `Hi ${req.body.firstName}`,
                html: `Your open issue ticket needs more information`,
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent-more info')
            })
            .catch((error) => {
                console.error(error)
            })
            // let msg = {
            //     to: req.body.email, // Change to your recipient
            //     from: 'dmao6@myseneca.ca', // Change to your verified sender
            //     subject: 'Sending with SendGrid is Fun',
            //     text: 'and easy to do anywhere, even with Node.js',
            //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
            //   }
            //   sgMail
            //     .send(msg)
            //     .then(() => {
            //       console.log('Email sent')
            //     })
            //     .catch((error) => {
            //       console.error(error)
            //     })

            // let message = '<p>Hello, ' + req.body.firstName + "! </p><br><p>The IT Service agent is requesting more information regarding your ticket: </p><br>" +
            // '<table border="1" class = "text">' +
            // '<thead>' +
            // '<tr>' +
            // '<td>Email address</td>' +
            // '<td>Subject</td>' +
            // '<td>Problem description</td>' +
            // '<td>Closing notes</td>' +
            // '</tr>' +
            // '</thead>' +
            // '<tbody>' +
            // '<tr>' +
            // '<td>' + req.body.email + '</td>' +
            // '<td>' + req.body.subject + '</td>' +
            // '<td>' + req.body.description + '</td>' +
            // '<td>' + req.body.solution + '</td>' +
            // '</tr>' +
            // '</tbody>' +
            // '</table>'

            // var mailOptions = {
            //     from: process.env.EMAIL_USER,
            //     to: req.body.email,
            //     subject: 'ServiceTicket - Your issue ticket is needing more information.',
            //     html: message
            // }
            // transporter.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //         console.log("ERROR: " + error);
            //         res.status(500).json({ message: { msgBody: "There is something wrong with your information (500), please re-enter and try again. ", msgError: true } });
            //     }
            //     else {
            //         console.log("SUCCESS: " + info.response);
            //         res.status(201).json({ message: { msgBody: "The ticket is lacking enough information to be worked on", msgError: false } });
            //     }
            // });

        }else{
            if(req.body.status==="Transfered"){
            const msg = {
                to: `${req.body.transferTo}`, // Change to your recipient
                from: 'dmao6@myseneca.ca', // Change to your verified sender
                subject: 'ServiceTicket - Requesting Attention',
                text: `Hi ${req.body.transferTo}`,
                html: `Ticket ${req.body.ticketNumber} need your attention`,
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent-xFer')
            })
            .catch((error) => {
                console.error(error)
            })
        }
        if(req.body.additionalEmail){
            const msg = {
                to: `${req.body.additionalEmail}`, // Change to your recipient
                from: 'dmao6@myseneca.ca', // Change to your verified sender
                subject: 'ServiceTicket - Requesting Attention',
                text: `Hi ${req.body.transferTo}`,
                html: `Ticket ${req.body.ticketNumber} need your attention`,
            }
            sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent-xFr-addEmail')
            })
            .catch((error) => {
                console.error(error)
            })
        }
        } 
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete one
router.delete('/:id', getTicket, async (req, res) => {
    try {
        await res.ticket.remove()
        res.json({ message: 'Deleted ticket'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getTicket(req, res, next) {
    let ticket
    try {
        ticket = await Ticket.findById(req.params.id)
        if (ticket == null){
            return res.status(404).json({ message: 'Cannot find the ticket' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.ticket = ticket
    next()
}

async function getAllTickets(req, res, next){
    // if ticketNo is passed, findBy is set to ticketNo, empty otherwise
    let ticketNumber = req.query.ticketNumber
    let findBy = ticketNumber ? { ticketNumber } : {}
    let tickets
    try {
        tickets = await Ticket.find(findBy)
        if (tickets == null){
            return res.status(404).json({ message: 'Cannot find the ticket' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.tickets = tickets
    next()
}





module.exports = router