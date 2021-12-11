const express = require('express')
const router = express.Router()
const Service = require('../models/requestServiceModel')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// Get all
router.get('/', async (req, res) => {
    try {
        const service = await Service.find()
        res.json(service)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getService, (req, res) => {
    res.json(res.service)
})

// Create one
router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
 
    const service = new Service(req.body)
    const msg = {
        to: `${req.body.email}`, // Change to your recipient
        from: 'dmao6@myseneca.ca', // Change to your verified sender
        subject: 'Device is Ready',
        text: `Dear ${req.body.requestingPerson}`,
        html: ` This email is to inform you that the device you requested ${req.body.equipment} is ready to pick up.`,
      }
     

    try{
        const newService = await service.save()
        res.status(201).json(newService) 
        sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

// Update one
router.patch('/:id', getService, async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  
    if (req.body.equipment != null) {
        res.user.equipment = req.body.equipment
    }
    try {
        const updatedService = await res.service.save()
        res.json(updatedService)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getService, async (req, res) => {
    try {
        await res.service.remove()
        res.json({ message: 'Deleted service request'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getService(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  next();
    let service
    try {
        service = await Service.findById(req.params.id)
        if (service == null){
            return res.status(404).json({ message: 'Cannot find service request'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.service = service
    next()
}

module.exports = router