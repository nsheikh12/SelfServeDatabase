var express = require('express');
var router = express.Router();
var EnrollmentStatusController = require('../controllers/EnrollmentStatusController.js');

/*
 * GET
 */
router.get('/', EnrollmentStatusController.list);

/*
 * GET
 */
router.get('/:id', EnrollmentStatusController.show);

/*
 * POST
 */
router.post('/', EnrollmentStatusController.create);

/*
 * PUT
 */
router.put('/:id', EnrollmentStatusController.update);

/*
 * DELETE
 */
router.delete('/:id', EnrollmentStatusController.remove);

module.exports = router;
