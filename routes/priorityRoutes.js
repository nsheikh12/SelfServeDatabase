var express = require('express');
var router = express.Router();
var priorityController = require('../controllers/priorityController.js');

/*
 * GET
 */
router.get('/', priorityController.list);

/*
 * GET
 */
router.get('/:id', priorityController.show);

/*
 * POST
 */
router.post('/', priorityController.create);

/*
 * PUT
 */
router.put('/:id', priorityController.update);

/*
 * DELETE
 */
router.delete('/:id', priorityController.remove);

module.exports = router;
