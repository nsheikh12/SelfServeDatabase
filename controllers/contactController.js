var ContactModel = require('../models/contactModel.js');

/**
 * contactController.js
 *
 * @description :: Server-side logic for managing contacts.
 */
module.exports = {

    /**
     * contactController.list()
     */
    list: function (req, res) {
        ContactModel.find(function (err, contacts) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact.',
                    error: err
                });
            }

            return res.json(contacts);
        });
    },

    /**
     * contactController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ContactModel.findOne({_id: id}, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact.',
                    error: err
                });
            }

            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }

            return res.json(contact);
        });
    },

    /**
     * contactController.create()
     */
    create: function (req, res) {
        var contact = new ContactModel({
			contactID : req.body.contactID,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			gender : req.body.gender,
			isApplicant : req.body.isApplicant,
			dateOfBirth : req.body.dateOfBirth,
			email : req.body.email,
			phoneNumber : req.body.phoneNumber,
			address : req.body.address
        });

        contact.save(function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating contact',
                    error: err
                });
            }

            return res.status(201).json(contact);
        });
    },

    /**
     * contactController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ContactModel.findOne({_id: id}, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contact',
                    error: err
                });
            }

            if (!contact) {
                return res.status(404).json({
                    message: 'No such contact'
                });
            }

            contact.contactID = req.body.contactID ? req.body.contactID : contact.contactID;
			contact.firstName = req.body.firstName ? req.body.firstName : contact.firstName;
			contact.lastName = req.body.lastName ? req.body.lastName : contact.lastName;
			contact.gender = req.body.gender ? req.body.gender : contact.gender;
			contact.isApplicant = req.body.isApplicant ? req.body.isApplicant : contact.isApplicant;
			contact.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : contact.dateOfBirth;
			contact.email = req.body.email ? req.body.email : contact.email;
			contact.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : contact.phoneNumber;
			contact.address = req.body.address ? req.body.address : contact.address;
			
            contact.save(function (err, contact) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contact.',
                        error: err
                    });
                }

                return res.json(contact);
            });
        });
    },

    /**
     * contactController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ContactModel.findByIdAndRemove(id, function (err, contact) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the contact.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
