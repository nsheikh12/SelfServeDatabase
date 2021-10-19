var StatusModel = require('../models/statusModel.js');

/**
 * statusController.js
 *
 * @description :: Server-side logic for managing statuss.
 */
module.exports = {

    /**
     * statusController.list()
     */
    list: function (req, res) {
        StatusModel.find(function (err, statuss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting status.',
                    error: err
                });
            }

            return res.json(statuss);
        });
    },

    /**
     * statusController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        StatusModel.findOne({_id: id}, function (err, status) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting status.',
                    error: err
                });
            }

            if (!status) {
                return res.status(404).json({
                    message: 'No such status'
                });
            }

            return res.json(status);
        });
    },

    /**
     * statusController.create()
     */
    create: function (req, res) {
        var status = new StatusModel({
			statusId : req.body.statusId,
			statusSrtDesc : req.body.statusSrtDesc
        });

        status.save(function (err, status) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating status',
                    error: err
                });
            }

            return res.status(201).json(status);
        });
    },

    /**
     * statusController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        StatusModel.findOne({_id: id}, function (err, status) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting status',
                    error: err
                });
            }

            if (!status) {
                return res.status(404).json({
                    message: 'No such status'
                });
            }

            status.statusId = req.body.statusId ? req.body.statusId : status.statusId;
			status.statusSrtDesc = req.body.statusSrtDesc ? req.body.statusSrtDesc : status.statusSrtDesc;
			
            status.save(function (err, status) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating status.',
                        error: err
                    });
                }

                return res.json(status);
            });
        });
    },

    /**
     * statusController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        StatusModel.findByIdAndRemove(id, function (err, status) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the status.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
