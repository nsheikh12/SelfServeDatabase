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
  var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
  
  if (_.includes(allowedMimes, file.mimetype)) {
  // allow supported image files
  cb(null, true);
  } else {
  // throw error for invalid files
  cb(new Error('Invalid file type. Only jpg, png and gif image files are allowed.'));
  }
};

// setting multer storage location and limits
const upload = multer({storage: STORAGE, fileFilter: fileFilter, limits : { fileSize: 1024 * 1024 }});

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
router.post('/', upload.single('file'), async (req, res) => {
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
        file: req.file.path
    })
    try{
        const newIssue = await reportIssue.save()
        res.status(201).json(newIssue)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
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