var express = require('express');
var router = express.Router();
var contactController = require('../controllers/contactController.js');

/*
 * GET
 */
router.get('/', contactController.list);

/*
 * GET
 */
router.get('/:id', contactController.show);

/*
 * POST
 */
router.post('/', contactController.create);

/*
 * PUT
 */
router.put('/:id', contactController.update);

/*
 * DELETE
 */
router.delete('/:id', contactController.remove);

module.exports = router;
