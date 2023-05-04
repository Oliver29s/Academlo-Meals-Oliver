const validMiddlewares = require('../middlewares/validations.middlewares')
const authController = require('../controllers/auth.controller');
const express = require('express');

const router = express.Router();

router.post('/login', validMiddlewares.userValidation,authController.login)
router.post('/signup',validMiddlewares.createUserValidation ,authController.singup)

module.exports = router