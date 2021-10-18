var express = require('express');
var router = express.Router();
var statusController = require('../controllers/statusController.js');

/*
 * GET
 */
router.get('/', statusController.list);

/*
 * GET
 */
router.get('/:id', statusController.show);

/*
 * POST
 */
router.post('/', statusController.create);

/*
 * PUT
 */
router.put('/:id', statusController.update);

/*
 * DELETE
 */
router.delete('/:id', statusController.remove);

module.exports = router;
