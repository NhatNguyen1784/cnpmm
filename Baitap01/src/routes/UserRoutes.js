const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { validateUser } = require('../middleware/validation');

// Web routes
router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/', validateUser, userController.store);
router.get('/:id', userController.show);
router.get('/:id/edit', userController.edit);
router.put('/:id', validateUser, userController.update);
router.delete('/:id', userController.destroy);

// API routes for AJAX requests
router.get('/api/users', userController.apiIndex);
router.get('/api/users/:id', userController.apiShow);

module.exports = router;