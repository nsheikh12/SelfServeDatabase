var express = require('express');
var router = express.Router();
var contactPreferenceController = require('../controllers/contactPreferenceController.js');

/*
 * GET
 */
router.get('/', contactPreferenceController.list);

/*
 * GET
 */
router.get('/:id', contactPreferenceController.show);

/*
 * POST
 */
router.post('/', contactPreferenceController.create);

/*
 * PUT
 */
router.put('/:id', contactPreferenceController.update);

/*
 * DELETE
 */
router.delete('/:id', contactPreferenceController.remove);

module.exports = router;
