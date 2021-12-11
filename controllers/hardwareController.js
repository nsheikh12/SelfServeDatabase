const express = require('express')
const router = express.Router()
const Hardware = require('../models/hardwareModel')

// Get all
router.get('/', async (req, res) => {
    try {
        const hardware = await Hardware.find()
        res.json(hardware)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getHardware, (req, res) => {
    res.json(res.hardware)
})

// Create one
router.post('/', async (req, res) => {
    const hardware = new Hardware(req.body)
        // equipmentName: req.body.equipmentName,
        // quantity: req.body.quantity,
        // icon: req.body.icon
    //const hardware = new Hardware({
        //icon: req.body.icon,
      //  equipmentName: req.body.equipmentName,
       // quantity: req.body.quantity,
      //  category: req.body.category
    //})

    try{
        const newHardware = await hardware.save()
        res.status(201).json(newHardware)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

// Update one
router.patch('/:id', getHardware, async (req, res) => {
    if (req.body.quantity != null) {
        res.hardware.quantity = req.body.quantity
        


    }
    res.hardware.equipmentName=req.body.equipmentName
    res.hardware.comment=req.body.comment
    res.hardware.category=req.body.category

    try {
        const updatedHardware = await res.hardware.save()
        res.json(updatedHardware)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getHardware, async (req, res) => {
    try {
        await res.hardware.remove()
        res.json({ message: 'Deleted hardware'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getHardware(req, res, next) {
    let hardware
    try {
        hardware = await Hardware.findById(req.params.id)
        if (hardware == null){
            return res.status(404).json({ message: 'Cannot find hardware' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.hardware = hardware
    next()
}

module.exports = router