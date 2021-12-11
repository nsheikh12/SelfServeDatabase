const express = require('express')
const router = express.Router()
const ReportIssue = require('../models/reportIssueModel')

/*MULTER SETUP*/
const FILESDIRECTORY = "./files";
const multer = require('multer')
var path = require("path");
var _ = require ("underscore");

// multer storage
const STORAGE = multer.diskStorage({
    destination: FILESDIRECTORY,
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// file type limitations
var fileFilter = function(req, file, cb) {
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
const upload = multer({storage: STORAGE, fileFilter: fileFilter, limits : { fileSize: 1024 * 1024 }}).single('file');

/* NODE MAILER SETUP */
var nodemailer = require("nodemailer");
//var {google} = require("googleapis")
require('dotenv').config({ path: './config/keys.env' })

// const CLIENT_ID = "959511541170-4a4nr4ican3unqom343qdeoh785trg97.apps.googleusercontent.com"
// const CLIENT_SECRET = "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"
// const REDIRECT_URI = "https://developers.google.com/oauthplayground"
// const REFRESH_TOKEN = "1//043ASmeSFoBjFCgYIARAAGAQSNwF-L9Iroumjob_BkD7D6WnyG3T_nwkkvkTeLPu1agwVlV7mcq-rP2py7h57Sa7t4V_wV2JvhUk"

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
// oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// const accessToken = oAuth2Client.getAccessToken()

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
    }
});

// Get all
router.get('/', async (req, res) => {
    try {
        const reportIssues = await ReportIssue.find()
        res.json(reportIssues)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getIssue, (req, res) => {
    res.json(res.issue)
})

// Create one
router.post('/', (req, res) => {
    console.log(req.file)
    upload(req, res, err => {
        if (err instanceof multer.MulterError){
            res.json({ message: { msgBody: "File is too large. Can only attach 1MB file.", msgError: true }});
            console.log("File is too large, error was caught.");
        }
        else if (err) {
            res.json({ message: { msgBody: "Unsupported file type, please try again.", msgError: true }});
            console.log("Unsupported file type.")
        }
        else {
            const reportIssue = new ReportIssue ({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                id: req.body.id,
                phone: req.body.phone,
                userType: req.body.userType,
                preferredContact: req.body.preferredContact,
                availability: req.body.availability,
                subject: req.body.subject,
                problemDescription: req.body.problemDescription,
               // file: req.file.filename
            })
            try{
                const newIssue = reportIssue.save()
                res.status(201).json(newIssue)
        
                   
                let message = '<p>Hello, ' +req.body.firstName+ "! </p><br><p>Your ticket was successfully submitted, here is the ticket information: </p><br>"+
                '<table border="1" class = "text">'+
                    '<thead>'+
                        '<tr>'+
                            '<td>preferred contact</td>'+
                            '<td>subject</td>'+
                            '<td>problem description</td>'+
                            '<td>availability</td>'+
                        '</tr>'+
                    '</thead>'+
                    '<tbody>'+
                        '<tr>'+
                            '<td>'+req.body.preferredContact+'</td>'+
                            '<td>'+req.body.subject+'</td>'+
                            '<td>'+req.body.problemDescription+'</td>'+
                            '<td>'+req.body.availability+'</td>'+
                        '</tr>'+
                    '</tbody>'+
                '</table>'
        
            var mailOptions = {
                from: process.env.EMAIL_USER,
                to: req.body.email,
                subject: 'ServiceTicket - Your issue ticket has been successfully submitted.',
                html: message
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error){
                    console.log("ERROR: " + error);
                }
                else{
                    console.log("SUCCESS: " +info.response);
                }
            });    
        
        
            } catch (err) {
                res.status(400).json({ message : err.message })
            }
        }

    })
})

// Update one
router.patch('/:id', getIssue, async (req, res) => {
    if (req.body.lastName != null) {
        res.user.lastName = req.body.lastName
    }
    try {
        const updatedIssue = await res.issue.save()
        res.json(updatedIssue)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getIssue, async (req, res) => {
    try {
        await res.issue.remove()
        res.json({ message: 'Deleted issue'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getIssue(req, res, next) {
    let issue
    try {
        issue = await ReportIssue.findById(req.params.id)
        if (issue == null){
            return res.status(404).json({ message: 'Cannot find issue' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.issue = issue
    next()
}

module.exports = router