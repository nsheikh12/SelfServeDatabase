var QuicksolutionModel = require('../models/quickSolutionModel.js');

/**
 * quickSolutionController.js
 *
 * @description :: Server-side logic for managing quickSolutions.
 */
module.exports = {

    /**
     * quickSolutionController.list()
     */
    list: function (req, res) {
        QuicksolutionModel.find(function (err, quickSolutions) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting quickSolution.',
                    error: err
                });
            }

            return res.json(quickSolutions);
        });
    },

    /**
     * quickSolutionController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        QuicksolutionModel.findOne({_id: id}, function (err, quickSolution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting quickSolution.',
                    error: err
                });
            }

            if (!quickSolution) {
                return res.status(404).json({
                    message: 'No such quickSolution'
                });
            }

            return res.json(quickSolution);
        });
    },

    /**
     * quickSolutionController.create()
     */
    create: function (req, res) {
        var quickSolution = new QuicksolutionModel({
			quicksolutionId : req.body.quicksolutionId,
			topic : req.body.topic,
			solution : req.body.solution
        });

        quickSolution.save(function (err, quickSolution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating quickSolution',
                    error: err
                });
            }

            return res.status(201).json(quickSolution);
        });
    },

    /**
     * quickSolutionController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        QuicksolutionModel.findOne({_id: id}, function (err, quickSolution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting quickSolution',
                    error: err
                });
            }

            if (!quickSolution) {
                return res.status(404).json({
                    message: 'No such quickSolution'
                });
            }

            quickSolution.quicksolutionId = req.body.quicksolutionId ? req.body.quicksolutionId : quickSolution.quicksolutionId;
			quickSolution.topic = req.body.topic ? req.body.topic : quickSolution.topic;
			quickSolution.solution = req.body.solution ? req.body.solution : quickSolution.solution;
			
            quickSolution.save(function (err, quickSolution) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating quickSolution.',
                        error: err
                    });
                }

                return res.json(quickSolution);
            });
        });
    },

    /**
     * quickSolutionController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        QuicksolutionModel.findByIdAndRemove(id, function (err, quickSolution) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the quickSolution.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
