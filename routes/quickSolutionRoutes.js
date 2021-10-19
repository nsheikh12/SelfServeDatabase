var express = require('express');
var router = express.Router();
var quickSolutionController = require('../controllers/quickSolutionController.js');

/*
 * GET
 */
router.get('/', quickSolutionController.list);

/*
 * GET
 */
router.get('/:id', quickSolutionController.show);

/*
 * POST
 */
router.post('/', quickSolutionController.create);

/*
 * PUT
 */
router.put('/:id', quickSolutionController.update);

/*
 * DELETE
 */
router.delete('/:id', quickSolutionController.remove);

module.exports = router;
