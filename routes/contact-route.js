const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact-controller');

// GET Routes
router.get('/', contactController.getAll );
router.get('/:id', contactController.getSingle );

// POST Routes
router.post('/', contactController.createNewContact );

// PUT Routes
router.put('/:id', contactController.updateContact );

// DELETE Routes
router.delete('/:id', contactController.deleteContact );

module.exports = router;