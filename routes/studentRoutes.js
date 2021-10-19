var express = require('express');
var router = express.Router();
var studentController = require('../controllers/studentController.js');

/*
 * GET
 */
router.get('/', studentController.list);

/*
 * GET
 */
router.get('/:id', studentController.show);

/*
 * POST
 */
router.post('/', studentController.create);

/*
 * PUT
 */
router.put('/:id', studentController.update);

/*
 * DELETE
 */
router.delete('/:id', studentController.remove);

module.exports = router;
