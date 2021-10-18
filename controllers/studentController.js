var StudentModel = require('../models/studentModel.js');

/**
 * studentController.js
 *
 * @description :: Server-side logic for managing students.
 */
module.exports = {

    /**
     * studentController.list()
     */
    list: function (req, res) {
        StudentModel.find(function (err, students) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }

            return res.json(students);
        });
    },

    /**
     * studentController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        StudentModel.findOne({_id: id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student.',
                    error: err
                });
            }

            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }

            return res.json(student);
        });
    },

    /**
     * studentController.create()
     */
    create: function (req, res) {
        var student = new StudentModel({
			studentNumber : req.body.studentNumber,
			firstName : req.body.firstName,
			lastName : req.body.lastName,
			dateOfBirth : req.body.dateOfBirth,
			schoolEmail : req.body.schoolEmail,
			privateEmail : req.body.privateEmail,
			gender : req.body.gender,
			phoneNumber : req.body.phoneNumber,
			program : req.body.program,
			address : req.body.address,
			enrollmentStatus : req.body.enrollmentStatus
        });

        student.save(function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating student',
                    error: err
                });
            }

            return res.status(201).json(student);
        });
    },

    /**
     * studentController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        StudentModel.findOne({_id: id}, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting student',
                    error: err
                });
            }

            if (!student) {
                return res.status(404).json({
                    message: 'No such student'
                });
            }

            student.studentNumber = req.body.studentNumber ? req.body.studentNumber : student.studentNumber;
			student.firstName = req.body.firstName ? req.body.firstName : student.firstName;
			student.lastName = req.body.lastName ? req.body.lastName : student.lastName;
			student.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : student.dateOfBirth;
			student.schoolEmail = req.body.schoolEmail ? req.body.schoolEmail : student.schoolEmail;
			student.privateEmail = req.body.privateEmail ? req.body.privateEmail : student.privateEmail;
			student.gender = req.body.gender ? req.body.gender : student.gender;
			student.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : student.phoneNumber;
			student.program = req.body.program ? req.body.program : student.program;
			student.address = req.body.address ? req.body.address : student.address;
			student.enrollmentStatus = req.body.enrollmentStatus ? req.body.enrollmentStatus : student.enrollmentStatus;
			
            student.save(function (err, student) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating student.',
                        error: err
                    });
                }

                return res.json(student);
            });
        });
    },

    /**
     * studentController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        StudentModel.findByIdAndRemove(id, function (err, student) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the student.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
