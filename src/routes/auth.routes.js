const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { validateRegister, validateLogin } = require('../middlewares/validation.middleware');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

module.exports = router;
