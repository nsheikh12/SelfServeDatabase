const express = require('express')
const router = express.Router()
const Service = require('../models/requestServiceModel')

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
    const service = new Service({
        requestingPerson: req.body.requestingPerson,
        id: req.body.id,
        equipment: req.body.equipment,
        duration: req.body.duration,
        program: req.body.program,
        isAdmin: req.body.isAdmin,
        campus: req.body.campus
    })

    try{
        const newService = await service.save()
        res.status(201).json(newService)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

// Update one
router.patch('/:id', getService, async (req, res) => {
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