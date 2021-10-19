var ContactpreferenceModel = require('../models/contactPreferenceModel.js');

/**
 * contactPreferenceController.js
 *
 * @description :: Server-side logic for managing contactPreferences.
 */
module.exports = {

    /**
     * contactPreferenceController.list()
     */
    list: function (req, res) {
        ContactpreferenceModel.find(function (err, contactPreferences) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contactPreference.',
                    error: err
                });
            }

            return res.json(contactPreferences);
        });
    },

    /**
     * contactPreferenceController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        ContactpreferenceModel.findOne({_id: id}, function (err, contactPreference) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contactPreference.',
                    error: err
                });
            }

            if (!contactPreference) {
                return res.status(404).json({
                    message: 'No such contactPreference'
                });
            }

            return res.json(contactPreference);
        });
    },

    /**
     * contactPreferenceController.create()
     */
    create: function (req, res) {
        var contactPreference = new ContactpreferenceModel({
			contactMEthod : req.body.contactMEthod,
			preferDay : req.body.preferDay,
			preferTimeBegin : req.body.preferTimeBegin,
			preferTimeEnd : req.body.preferTimeEnd
        });

        contactPreference.save(function (err, contactPreference) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating contactPreference',
                    error: err
                });
            }

            return res.status(201).json(contactPreference);
        });
    },

    /**
     * contactPreferenceController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        ContactpreferenceModel.findOne({_id: id}, function (err, contactPreference) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting contactPreference',
                    error: err
                });
            }

            if (!contactPreference) {
                return res.status(404).json({
                    message: 'No such contactPreference'
                });
            }

            contactPreference.contactMEthod = req.body.contactMEthod ? req.body.contactMEthod : contactPreference.contactMEthod;
			contactPreference.preferDay = req.body.preferDay ? req.body.preferDay : contactPreference.preferDay;
			contactPreference.preferTimeBegin = req.body.preferTimeBegin ? req.body.preferTimeBegin : contactPreference.preferTimeBegin;
			contactPreference.preferTimeEnd = req.body.preferTimeEnd ? req.body.preferTimeEnd : contactPreference.preferTimeEnd;
			
            contactPreference.save(function (err, contactPreference) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating contactPreference.',
                        error: err
                    });
                }

                return res.json(contactPreference);
            });
        });
    },

    /**
     * contactPreferenceController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        ContactpreferenceModel.findByIdAndRemove(id, function (err, contactPreference) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the contactPreference.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
