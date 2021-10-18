var PriorityModel = require('../models/priorityModel.js');

/**
 * priorityController.js
 *
 * @description :: Server-side logic for managing prioritys.
 */
module.exports = {

    /**
     * priorityController.list()
     */
    list: function (req, res) {
        PriorityModel.find(function (err, prioritys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting priority.',
                    error: err
                });
            }

            return res.json(prioritys);
        });
    },

    /**
     * priorityController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        PriorityModel.findOne({_id: id}, function (err, priority) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting priority.',
                    error: err
                });
            }

            if (!priority) {
                return res.status(404).json({
                    message: 'No such priority'
                });
            }

            return res.json(priority);
        });
    },

    /**
     * priorityController.create()
     */
    create: function (req, res) {
        var priority = new PriorityModel({
			priorityId : req.body.priorityId,
			NumberOfPersonAffect : req.body.NumberOfPersonAffect,
			PriorityDescription : req.body.PriorityDescription
        });

        priority.save(function (err, priority) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating priority',
                    error: err
                });
            }

            return res.status(201).json(priority);
        });
    },

    /**
     * priorityController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        PriorityModel.findOne({_id: id}, function (err, priority) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting priority',
                    error: err
                });
            }

            if (!priority) {
                return res.status(404).json({
                    message: 'No such priority'
                });
            }

            priority.priorityId = req.body.priorityId ? req.body.priorityId : priority.priorityId;
			priority.NumberOfPersonAffect = req.body.NumberOfPersonAffect ? req.body.NumberOfPersonAffect : priority.NumberOfPersonAffect;
			priority.PriorityDescription = req.body.PriorityDescription ? req.body.PriorityDescription : priority.PriorityDescription;
			
            priority.save(function (err, priority) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating priority.',
                        error: err
                    });
                }

                return res.json(priority);
            });
        });
    },

    /**
     * priorityController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        PriorityModel.findByIdAndRemove(id, function (err, priority) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the priority.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
