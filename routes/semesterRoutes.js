var express = require('express');
var router = express.Router();
var semesterController = require('../controllers/semesterController.js');

/*
 * GET
 */
router.get('/', semesterController.list);

/*
 * GET
 */
router.get('/:id', semesterController.show);

/*
 * POST
 */
router.post('/', semesterController.create);

/*
 * PUT
 */
router.put('/:id', semesterController.update);

/*
 * DELETE
 */
router.delete('/:id', semesterController.remove);

module.exports = router;
