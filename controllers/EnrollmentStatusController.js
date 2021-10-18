var EnrollmentstatusModel = require('../models/EnrollmentStatusModel.js');

/**
 * EnrollmentStatusController.js
 *
 * @description :: Server-side logic for managing EnrollmentStatuss.
 */
module.exports = {

    /**
     * EnrollmentStatusController.list()
     */
    list: function (req, res) {
        EnrollmentstatusModel.find(function (err, EnrollmentStatuss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting EnrollmentStatus.',
                    error: err
                });
            }

            return res.json(EnrollmentStatuss);
        });
    },

    /**
     * EnrollmentStatusController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        EnrollmentstatusModel.findOne({_id: id}, function (err, EnrollmentStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting EnrollmentStatus.',
                    error: err
                });
            }

            if (!EnrollmentStatus) {
                return res.status(404).json({
                    message: 'No such EnrollmentStatus'
                });
            }

            return res.json(EnrollmentStatus);
        });
    },

    /**
     * EnrollmentStatusController.create()
     */
    create: function (req, res) {
        var EnrollmentStatus = new EnrollmentstatusModel({
			currentStatus : req.body.currentStatus,
			currentProgram : req.body.currentProgram,
			fromSemester : req.body.fromSemester,
			toSemester : req.body.toSemester
        });

        EnrollmentStatus.save(function (err, EnrollmentStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating EnrollmentStatus',
                    error: err
                });
            }

            return res.status(201).json(EnrollmentStatus);
        });
    },

    /**
     * EnrollmentStatusController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        EnrollmentstatusModel.findOne({_id: id}, function (err, EnrollmentStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting EnrollmentStatus',
                    error: err
                });
            }

            if (!EnrollmentStatus) {
                return res.status(404).json({
                    message: 'No such EnrollmentStatus'
                });
            }

            EnrollmentStatus.currentStatus = req.body.currentStatus ? req.body.currentStatus : EnrollmentStatus.currentStatus;
			EnrollmentStatus.currentProgram = req.body.currentProgram ? req.body.currentProgram : EnrollmentStatus.currentProgram;
			EnrollmentStatus.fromSemester = req.body.fromSemester ? req.body.fromSemester : EnrollmentStatus.fromSemester;
			EnrollmentStatus.toSemester = req.body.toSemester ? req.body.toSemester : EnrollmentStatus.toSemester;
			
            EnrollmentStatus.save(function (err, EnrollmentStatus) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating EnrollmentStatus.',
                        error: err
                    });
                }

                return res.json(EnrollmentStatus);
            });
        });
    },

    /**
     * EnrollmentStatusController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        EnrollmentstatusModel.findByIdAndRemove(id, function (err, EnrollmentStatus) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the EnrollmentStatus.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
