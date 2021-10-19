var express = require('express');
var router = express.Router();
var ticketController = require('../controllers/ticketController.js');

/*
 * GET
 */
router.get('/', ticketController.list);

/*
 * GET
 */
router.get('/:id', ticketController.show);

/*
 * POST
 */
router.post('/', ticketController.create);

/*
 * PUT
 */
router.put('/:id', ticketController.update);

/*
 * DELETE
 */
router.delete('/:id', ticketController.remove);

module.exports = router;
