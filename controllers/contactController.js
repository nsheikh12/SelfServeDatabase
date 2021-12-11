const express = require('express')
const router = express.Router()
const Contact = require('../models/contactModel')

// Get all
router.get('/', async (req, res) => {
    try {
        const contact = await Contact.find()
        res.json(contact)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get one
router.get('/:id', getContact, (req, res) => {
    res.json(res.contact)
})

// Create one
router.post('/', async (req, res) => {
    const contact = new Contact(req.body)

    try{
        const newContact = await contact.save()
        res.status(201).json(newContact)
    } catch (err) {
        res.status(400).json({ message : err.message })
    }
})

// Update one
router.patch('/:id', getContact, async (req, res) => {
    if (req.body.Name != null) {
        res.contact.Name = req.body.Name
        res.contact.Email = req.body.Email
        res.contact.Phone = req.body.Phone
        res.contact.Address = req.body.Address
    }
    try {
        const updatedContact = await res.contact.save()
        res.json(updatedContact)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})
// Delete one
router.delete('/:id', getContact, async (req, res) => {
    try {
        await res.contact.remove()
        res.json({ message: 'Deleted Contact'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getContact(req, res, next) {
    let contact
    try {
        contact = await Contact.findById(req.params.id)
        if (contact == null){
            return res.status(404).json({ message: 'Cannot find contact' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.contact = contact
    next()
}

module.exports = router