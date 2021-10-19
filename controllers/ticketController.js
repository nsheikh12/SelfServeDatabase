var TicketModel = require('../models/ticketModel.js');

/**
 * ticketController.js
 *
 * @description :: Server-side logic for managing tickets.
 */
module.exports = {

    /**
     * ticketController.list()
     */
    list: function (req, res) {
        TicketModel.find(function (err, tickets) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ticket.',
                    error: err
                });
            }

            return res.json(tickets);
        });
    },

    /**
     * ticketController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        TicketModel.findOne({_id: id}, function (err, ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ticket.',
                    error: err
                });
            }

            if (!ticket) {
                return res.status(404).json({
                    message: 'No such ticket'
                });
            }

            return res.json(ticket);
        });
    },

    /**
     * ticketController.create()
     */
    create: function (req, res) {
        var ticket = new TicketModel({
			ticketID : req.body.ticketID,
			ticketSubject : req.body.ticketSubject,
			ticketDescription : req.body.ticketDescription,
			numberOfPersonAffected : req.body.numberOfPersonAffected,
			status : req.body.status,
			isNonITIssue : req.body.isNonITIssue,
			currentWorkingOn : req.body.currentWorkingOn,
			submitDate : req.body.submitDate,
			closedDate : req.body.closedDate,
			submittedBy : req.body.submittedBy,
			comment : req.body.comment
        });

        ticket.save(function (err, ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating ticket',
                    error: err
                });
            }

            return res.status(201).json(ticket);
        });
    },

    /**
     * ticketController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        TicketModel.findOne({_id: id}, function (err, ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting ticket',
                    error: err
                });
            }

            if (!ticket) {
                return res.status(404).json({
                    message: 'No such ticket'
                });
            }

            ticket.ticketID = req.body.ticketID ? req.body.ticketID : ticket.ticketID;
			ticket.ticketSubject = req.body.ticketSubject ? req.body.ticketSubject : ticket.ticketSubject;
			ticket.ticketDescription = req.body.ticketDescription ? req.body.ticketDescription : ticket.ticketDescription;
			ticket.numberOfPersonAffected = req.body.numberOfPersonAffected ? req.body.numberOfPersonAffected : ticket.numberOfPersonAffected;
			ticket.status = req.body.status ? req.body.status : ticket.status;
			ticket.isNonITIssue = req.body.isNonITIssue ? req.body.isNonITIssue : ticket.isNonITIssue;
			ticket.currentWorkingOn = req.body.currentWorkingOn ? req.body.currentWorkingOn : ticket.currentWorkingOn;
			ticket.submitDate = req.body.submitDate ? req.body.submitDate : ticket.submitDate;
			ticket.closedDate = req.body.closedDate ? req.body.closedDate : ticket.closedDate;
			ticket.submittedBy = req.body.submittedBy ? req.body.submittedBy : ticket.submittedBy;
			ticket.comment = req.body.comment ? req.body.comment : ticket.comment;
			
            ticket.save(function (err, ticket) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating ticket.',
                        error: err
                    });
                }

                return res.json(ticket);
            });
        });
    },

    /**
     * ticketController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        TicketModel.findByIdAndRemove(id, function (err, ticket) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the ticket.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
