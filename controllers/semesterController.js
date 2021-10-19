var SemesterModel = require('../models/semesterModel.js');

/**
 * semesterController.js
 *
 * @description :: Server-side logic for managing semesters.
 */
module.exports = {

    /**
     * semesterController.list()
     */
    list: function (req, res) {
        SemesterModel.find(function (err, semesters) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting semester.',
                    error: err
                });
            }

            return res.json(semesters);
        });
    },

    /**
     * semesterController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        SemesterModel.findOne({_id: id}, function (err, semester) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting semester.',
                    error: err
                });
            }

            if (!semester) {
                return res.status(404).json({
                    message: 'No such semester'
                });
            }

            return res.json(semester);
        });
    },

    /**
     * semesterController.create()
     */
    create: function (req, res) {
        var semester = new SemesterModel({
			semesterId : req.body.semesterId,
			semesterName : req.body.semesterName,
			startDate : req.body.startDate,
			EndDate : req.body.EndDate
        });

        semester.save(function (err, semester) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating semester',
                    error: err
                });
            }

            return res.status(201).json(semester);
        });
    },

    /**
     * semesterController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        SemesterModel.findOne({_id: id}, function (err, semester) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting semester',
                    error: err
                });
            }

            if (!semester) {
                return res.status(404).json({
                    message: 'No such semester'
                });
            }

            semester.semesterId = req.body.semesterId ? req.body.semesterId : semester.semesterId;
			semester.semesterName = req.body.semesterName ? req.body.semesterName : semester.semesterName;
			semester.startDate = req.body.startDate ? req.body.startDate : semester.startDate;
			semester.EndDate = req.body.EndDate ? req.body.EndDate : semester.EndDate;
			
            semester.save(function (err, semester) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating semester.',
                        error: err
                    });
                }

                return res.json(semester);
            });
        });
    },

    /**
     * semesterController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        SemesterModel.findByIdAndRemove(id, function (err, semester) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the semester.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
